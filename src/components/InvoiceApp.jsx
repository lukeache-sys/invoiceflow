import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Trash2, Download, AlertCircle, ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function InvoiceApp() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    
    businessName: '',
    businessAddress: '',
    businessEmail: '',
    businessPhone: '',
    
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    
    items: [
      { description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    
    notes: '',
    paymentTerms: 'Payment due within 30 days'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (subtotal * invoiceData.taxRate) / 100;
    const total = subtotal + taxAmount;
    
    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  }, [invoiceData.items, invoiceData.taxRate]);

  const updateField = (field, value) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const updateItem = (index, field, value) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items];
      newItems[index][field] = value;
      
      if (field === 'quantity' || field === 'rate') {
        newItems[index].amount = newItems[index].quantity * newItems[index].rate;
      }
      
      return { ...prev, items: newItems };
    });
  };

  const isValid = () => {
    if (!invoiceData.businessName || !invoiceData.clientName) {
      setError('Please fill in business and client names');
      return false;
    }
    
    const validItems = invoiceData.items.filter(item => 
      item.description.trim() !== '' && item.rate > 0
    );
    
    if (validItems.length === 0) {
      setError('Please add at least one item with a description and rate');
      return false;
    }
    
    setError('');
    return true;
  };

  const generatePDF = async () => {
    if (!isValid()) return;
    
    setIsGenerating(true);
    setError('');
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPos = 20;
      
      // Header - Invoice Title
      doc.setFontSize(28);
      doc.setTextColor(79, 70, 229);
      doc.text('INVOICE', pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;
      
      // Invoice Details
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, yPos);
      doc.text(`Date: ${invoiceData.invoiceDate}`, pageWidth / 2, yPos, { align: 'center' });
      doc.text(`Due: ${invoiceData.dueDate}`, pageWidth - 20, yPos, { align: 'right' });
      yPos += 15;
      
      // Line separator
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 10;
      
      // From (Business) Section
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('From:', 20, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(invoiceData.businessName, 20, yPos);
      yPos += 5;
      
      doc.setFont(undefined, 'normal');
      doc.setTextColor(60, 60, 60);
      if (invoiceData.businessAddress) {
        const addressLines = doc.splitTextToSize(invoiceData.businessAddress, 80);
        addressLines.forEach(line => {
          doc.text(line, 20, yPos);
          yPos += 5;
        });
      }
      if (invoiceData.businessEmail) {
        doc.text(invoiceData.businessEmail, 20, yPos);
        yPos += 5;
      }
      if (invoiceData.businessPhone) {
        doc.text(invoiceData.businessPhone, 20, yPos);
        yPos += 5;
      }
      
      // Bill To (Client) Section
      const billToYStart = 65;
      yPos = billToYStart;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Bill To:', pageWidth - 90, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(invoiceData.clientName, pageWidth - 90, yPos);
      yPos += 5;
      
      doc.setFont(undefined, 'normal');
      doc.setTextColor(60, 60, 60);
      if (invoiceData.clientAddress) {
        const clientAddressLines = doc.splitTextToSize(invoiceData.clientAddress, 80);
        clientAddressLines.forEach(line => {
          doc.text(line, pageWidth - 90, yPos);
          yPos += 5;
        });
      }
      if (invoiceData.clientEmail) {
        doc.text(invoiceData.clientEmail, pageWidth - 90, yPos);
        yPos += 5;
      }
      
      // Items Table
      yPos = Math.max(yPos, billToYStart + 40) + 10;
      
      const validItems = invoiceData.items.filter(item => 
        item.description.trim() !== '' && item.rate > 0
      );
      
      // Table Header
      doc.setFillColor(79, 70, 229);
      doc.rect(20, yPos, pageWidth - 40, 8, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.text('Description', 25, yPos + 5);
      doc.text('Qty', pageWidth - 85, yPos + 5, { align: 'right' });
      doc.text('Rate', pageWidth - 60, yPos + 5, { align: 'right' });
      doc.text('Amount', pageWidth - 25, yPos + 5, { align: 'right' });
      yPos += 12;
      
      // Table Items
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'normal');
      
      validItems.forEach((item, index) => {
        if (yPos > pageHeight - 60) {
          doc.addPage();
          yPos = 20;
        }
        
        const descLines = doc.splitTextToSize(item.description, 100);
        descLines.forEach((line, lineIndex) => {
          doc.text(line, 25, yPos);
          if (lineIndex === 0) {
            doc.text(item.quantity.toString(), pageWidth - 85, yPos, { align: 'right' });
            doc.text(`$${item.rate.toFixed(2)}`, pageWidth - 60, yPos, { align: 'right' });
            doc.text(`$${item.amount.toFixed(2)}`, pageWidth - 25, yPos, { align: 'right' });
          }
          yPos += 5;
        });
        
        yPos += 3;
        
        if (index < validItems.length - 1) {
          doc.setDrawColor(230, 230, 230);
          doc.line(20, yPos, pageWidth - 20, yPos);
          yPos += 5;
        }
      });
      
      // Totals Section
      yPos += 10;
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 10;
      
      const totalsX = pageWidth - 70;
      
      doc.setFont(undefined, 'normal');
      doc.text('Subtotal:', totalsX, yPos);
      doc.text(`$${invoiceData.subtotal.toFixed(2)}`, pageWidth - 25, yPos, { align: 'right' });
      yPos += 7;
      
      if (invoiceData.taxRate > 0) {
        doc.text(`Tax (${invoiceData.taxRate}%):`, totalsX, yPos);
        doc.text(`$${invoiceData.taxAmount.toFixed(2)}`, pageWidth - 25, yPos, { align: 'right' });
        yPos += 7;
      }
      
      doc.setFont(undefined, 'bold');
      doc.setFontSize(11);
      doc.text('Total:', totalsX, yPos);
      doc.text(`$${invoiceData.total.toFixed(2)}`, pageWidth - 25, yPos, { align: 'right' });
      yPos += 15;
      
      // Notes and Payment Terms
      if (invoiceData.notes || invoiceData.paymentTerms) {
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        
        if (invoiceData.notes) {
          doc.text('Notes:', 20, yPos);
          yPos += 5;
          const notesLines = doc.splitTextToSize(invoiceData.notes, pageWidth - 40);
          notesLines.forEach(line => {
            doc.text(line, 20, yPos);
            yPos += 4;
          });
          yPos += 5;
        }
        
        if (invoiceData.paymentTerms) {
          doc.text('Payment Terms:', 20, yPos);
          yPos += 5;
          const termsLines = doc.splitTextToSize(invoiceData.paymentTerms, pageWidth - 40);
          termsLines.forEach(line => {
            doc.text(line, 20, yPos);
            yPos += 4;
          });
        }
      }
      
      // Save the PDF
      const fileName = `Invoice-${invoiceData.invoiceNumber}.pdf`;
      doc.save(fileName);
      
      console.log('✅ PDF generated successfully:', fileName);
      
    } catch (err) {
      console.error('❌ PDF Generation Error:', err);
      setError(`Failed to generate PDF: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">InvoiceFlow</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Invoice</h1>
          <p className="text-gray-600">Fill in the details below to generate a professional PDF invoice</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-red-900 font-semibold">Error</div>
              <div className="text-red-700 text-sm">{error}</div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice Details</h2>
              
              {/* Invoice Info */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice #</label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => updateField('invoiceNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={invoiceData.invoiceDate}
                    onChange={(e) => updateField('invoiceDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => updateField('dueDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Business Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">From (Your Business)</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Business Name *"
                    value={invoiceData.businessName}
                    onChange={(e) => updateField('businessName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Business Address"
                    value={invoiceData.businessAddress}
                    onChange={(e) => updateField('businessAddress', e.target.value)}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={invoiceData.businessEmail}
                      onChange={(e) => updateField('businessEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={invoiceData.businessPhone}
                      onChange={(e) => updateField('businessPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To (Client)</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Client Name *"
                    value={invoiceData.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Client Address"
                    value={invoiceData.clientAddress}
                    onChange={(e) => updateField('clientAddress', e.target.value)}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Client Email"
                    value={invoiceData.clientEmail}
                    onChange={(e) => updateField('clientEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Line Items</h3>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
              <div className="space-y-3">
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      {invoiceData.items.length > 1 && (
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        value={item.amount.toFixed(2)}
                        readOnly
                        className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={invoiceData.taxRate}
                onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Notes and Terms */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                <textarea
                  value={invoiceData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows="2"
                  placeholder="Any additional notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Terms</label>
                <textarea
                  value={invoiceData.paymentTerms}
                  onChange={(e) => updateField('paymentTerms', e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Invoice PDF
                </>
              )}
            </button>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">Real-time</span>
              </div>
            </div>
            
            <div className="border-2 border-gray-200 rounded-lg p-8 bg-white max-h-[800px] overflow-y-auto">
              {/* Preview Header */}
              <div className="text-center mb-8 pb-4 border-b-2 border-indigo-600">
                <h1 className="text-4xl font-bold text-indigo-600">INVOICE</h1>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-500">Invoice #:</span>
                  <div className="font-semibold">{invoiceData.invoiceNumber || '---'}</div>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <div className="font-semibold">{invoiceData.invoiceDate || '---'}</div>
                </div>
                <div>
                  <span className="text-gray-500">Due:</span>
                  <div className="font-semibold">{invoiceData.dueDate || '---'}</div>
                </div>
              </div>

              {/* From/To */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="text-sm font-semibold text-indigo-900 mb-2">From:</div>
                  <div className="font-bold text-gray-900">{invoiceData.businessName || 'Your Business Name'}</div>
                  {invoiceData.businessAddress && <div className="text-sm text-gray-600 mt-1">{invoiceData.businessAddress}</div>}
                  {invoiceData.businessEmail && <div className="text-sm text-gray-600">{invoiceData.businessEmail}</div>}
                  {invoiceData.businessPhone && <div className="text-sm text-gray-600">{invoiceData.businessPhone}</div>}
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm font-semibold text-purple-900 mb-2">Bill To:</div>
                  <div className="font-bold text-gray-900">{invoiceData.clientName || 'Client Name'}</div>
                  {invoiceData.clientAddress && <div className="text-sm text-gray-600 mt-1">{invoiceData.clientAddress}</div>}
                  {invoiceData.clientEmail && <div className="text-sm text-gray-600">{invoiceData.clientEmail}</div>}
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-t-lg grid grid-cols-12 gap-2 text-sm font-semibold">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-right">Qty</div>
                  <div className="col-span-2 text-right">Rate</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>
                
                <div className="border-x border-b border-gray-200 rounded-b-lg">
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 p-3 border-b border-gray-100 last:border-b-0 text-sm">
                      <div className="col-span-6 text-gray-900">{item.description || 'Item description'}</div>
                      <div className="col-span-2 text-right text-gray-600">{item.quantity}</div>
                      <div className="col-span-2 text-right text-gray-600">${item.rate.toFixed(2)}</div>
                      <div className="col-span-2 text-right font-semibold text-gray-900">${item.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-6">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
                  </div>
                  {invoiceData.taxRate > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax ({invoiceData.taxRate}%):</span>
                      <span className="font-semibold">${invoiceData.taxAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-gray-300">
                    <span>Total:</span>
                    <span className="text-indigo-600">${invoiceData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Notes and Terms */}
              {(invoiceData.notes || invoiceData.paymentTerms) && (
                <div className="space-y-3 text-sm">
                  {invoiceData.notes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-700 mb-1">Notes:</div>
                      <div className="text-gray-600">{invoiceData.notes}</div>
                    </div>
                  )}
                  {invoiceData.paymentTerms && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-700 mb-1">Payment Terms:</div>
                      <div className="text-gray-600">{invoiceData.paymentTerms}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
