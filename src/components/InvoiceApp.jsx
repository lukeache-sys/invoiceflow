import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import PricingModal from './PricingModal';

export default function InvoiceApp() {
  const [showPricing, setShowPricing] = useState(false);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const MAX_FREE_INVOICES = 3;

  // Load invoice count from localStorage on mount
  useEffect(() => {
    const count = localStorage.getItem('invoiceCount');
    if (count) {
      setInvoiceCount(parseInt(count));
    }
  }, []);

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    
    // Business details
    businessName: '',
    businessAddress: '',
    businessEmail: '',
    businessPhone: '',
    
    // Client details
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    
    // Items
    items: [
      { description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    
    // Calculations
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    
    // Additional
    notes: '',
    paymentTerms: 'Payment due within 30 days'
  });

  // Calculate totals
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
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      // Calculate amount
      if (field === 'quantity' || field === 'rate') {
        newItems[index].amount = newItems[index].quantity * newItems[index].rate;
      }
      
      return { ...prev, items: newItems };
    });
  };

  const isValid = () => {
    return invoiceData.businessName && 
           invoiceData.clientName && 
           invoiceData.items.some(item => item.description && item.rate > 0);
  };

  const canGenerate = invoiceCount < MAX_FREE_INVOICES;

  const generatePDF = () => {
    // Check if user has reached limit
    if (!canGenerate) {
      setShowPricing(true);
      return;
    }

    if (!isValid()) {
      alert('Please fill in business name, client name, and at least one item with description and rate.');
      return;
    }

    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', 105, yPos, { align: 'center' });
    yPos += 15;

    // Invoice details
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, yPos);
    doc.text(`Date: ${invoiceData.invoiceDate}`, 20, yPos + 5);
    doc.text(`Due Date: ${invoiceData.dueDate}`, 20, yPos + 10);
    yPos += 25;

    // Business details (From)
    doc.setFont(undefined, 'bold');
    doc.text('From:', 20, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 5;
    doc.text(invoiceData.businessName, 20, yPos);
    if (invoiceData.businessAddress) {
      yPos += 5;
      const addressLines = doc.splitTextToSize(invoiceData.businessAddress, 80);
      doc.text(addressLines, 20, yPos);
      yPos += addressLines.length * 5;
    }
    if (invoiceData.businessEmail) {
      yPos += 5;
      doc.text(invoiceData.businessEmail, 20, yPos);
    }
    if (invoiceData.businessPhone) {
      yPos += 5;
      doc.text(invoiceData.businessPhone, 20, yPos);
    }

    // Client details (To)
    let clientYPos = 65;
    doc.setFont(undefined, 'bold');
    doc.text('To:', 120, clientYPos);
    doc.setFont(undefined, 'normal');
    clientYPos += 5;
    doc.text(invoiceData.clientName, 120, clientYPos);
    if (invoiceData.clientAddress) {
      clientYPos += 5;
      const addressLines = doc.splitTextToSize(invoiceData.clientAddress, 70);
      doc.text(addressLines, 120, clientYPos);
      clientYPos += addressLines.length * 5;
    }
    if (invoiceData.clientEmail) {
      clientYPos += 5;
      doc.text(invoiceData.clientEmail, 120, clientYPos);
    }

    yPos = Math.max(yPos, clientYPos) + 15;

    // Items table
    doc.setFont(undefined, 'bold');
    doc.text('Description', 20, yPos);
    doc.text('Qty', 120, yPos);
    doc.text('Rate', 140, yPos);
    doc.text('Amount', 170, yPos);
    yPos += 5;
    doc.line(20, yPos, 190, yPos);
    yPos += 7;

    // Items
    doc.setFont(undefined, 'normal');
    invoiceData.items.forEach(item => {
      if (item.description) {
        const descLines = doc.splitTextToSize(item.description, 95);
        doc.text(descLines, 20, yPos);
        doc.text(item.quantity.toString(), 120, yPos);
        doc.text(`$${item.rate.toFixed(2)}`, 140, yPos);
        doc.text(`$${item.amount.toFixed(2)}`, 170, yPos);
        yPos += Math.max(descLines.length * 5, 7);
      }
    });

    yPos += 5;
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    // Totals
    doc.text('Subtotal:', 140, yPos);
    doc.text(`$${invoiceData.subtotal.toFixed(2)}`, 170, yPos);
    
    if (invoiceData.taxRate > 0) {
      yPos += 7;
      doc.text(`Tax (${invoiceData.taxRate}%):`, 140, yPos);
      doc.text(`$${invoiceData.taxAmount.toFixed(2)}`, 170, yPos);
    }

    yPos += 7;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Total:', 140, yPos);
    doc.text(`$${invoiceData.total.toFixed(2)}`, 170, yPos);

    // Notes
    if (invoiceData.notes) {
      yPos += 15;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Notes:', 20, yPos);
      yPos += 5;
      doc.setFont(undefined, 'normal');
      const notesLines = doc.splitTextToSize(invoiceData.notes, 170);
      doc.text(notesLines, 20, yPos);
      yPos += notesLines.length * 5;
    }

    // Payment terms
    if (invoiceData.paymentTerms) {
      yPos += 7;
      doc.setFont(undefined, 'bold');
      doc.text('Payment Terms:', 20, yPos);
      yPos += 5;
      doc.setFont(undefined, 'normal');
      doc.text(invoiceData.paymentTerms, 20, yPos);
    }

    // Save PDF
    doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);

    // Increment counter and save to localStorage
    const newCount = invoiceCount + 1;
    setInvoiceCount(newCount);
    localStorage.setItem('invoiceCount', newCount.toString());

    // Show pricing modal if they just used their last free invoice
    if (newCount >= MAX_FREE_INVOICES) {
      setTimeout(() => {
        setShowPricing(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Invoice</h1>
          <p className="text-gray-600">
            Professional invoices in seconds • {MAX_FREE_INVOICES - invoiceCount} free {MAX_FREE_INVOICES - invoiceCount === 1 ? 'invoice' : 'invoices'} remaining
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {/* Invoice Details */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Number</label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => updateField('invoiceNumber', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Date</label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => updateField('invoiceDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Business and Client Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* From */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">From (Your Business)</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Business Name *"
                  value={invoiceData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Business Address"
                  value={invoiceData.businessAddress}
                  onChange={(e) => updateField('businessAddress', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={invoiceData.businessEmail}
                  onChange={(e) => updateField('businessEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={invoiceData.businessPhone}
                  onChange={(e) => updateField('businessPhone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* To */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">To (Client)</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Client Name *"
                  value={invoiceData.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Client Address"
                  value={invoiceData.clientAddress}
                  onChange={(e) => updateField('clientAddress', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={invoiceData.clientEmail}
                  onChange={(e) => updateField('clientEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Items</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={20} />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-start">
                  <input
                    type="text"
                    placeholder="Description *"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="col-span-5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    min="0"
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="col-span-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-700 font-semibold">
                    ${item.amount.toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="col-span-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-80 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Tax Rate (%):</span>
                <input
                  type="number"
                  value={invoiceData.taxRate}
                  onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              {invoiceData.taxRate > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Tax Amount:</span>
                  <span className="font-semibold">${invoiceData.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-indigo-600 pt-3 border-t-2 border-gray-300">
                <span>Total:</span>
                <span>${invoiceData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows="3"
                placeholder="Additional notes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Terms</label>
              <textarea
                value={invoiceData.paymentTerms}
                onChange={(e) => updateField('paymentTerms', e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePDF}
            disabled={!isValid() && canGenerate}
            className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all flex items-center justify-center gap-2 ${
              !canGenerate
                ? 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
                : !isValid()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <Download size={24} />
            {!canGenerate
              ? '⚡ Upgrade to Generate More'
              : !isValid()
              ? 'Fill Required Fields'
              : `Generate PDF Invoice (${MAX_FREE_INVOICES - invoiceCount} left)`}
          </button>

          {!canGenerate && (
            <p className="text-center text-orange-600 font-semibold mt-3">
              You've used all {MAX_FREE_INVOICES} free invoices! Upgrade to Pro for unlimited invoices.
            </p>
          )}
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
}
