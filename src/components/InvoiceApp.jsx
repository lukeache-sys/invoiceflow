import React, { useState } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';

export default function InvoiceApp() {
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    email: '',
    phone: ''
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    email: ''
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    number: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, rate: 0 }
  ]);

  const [notes, setNotes] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Payment is due within 30 days of invoice date.');

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'description' ? value : parseFloat(value) || 0;
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const generateHTML = () => {
    const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${invoiceDetails.number}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 40px auto;
      padding: 40px;
      background: #f5f5f5;
    }
    .invoice-container {
      background: white;
      padding: 60px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      border-radius: 8px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 3px solid #6366f1;
    }
    .invoice-title {
      font-size: 48px;
      font-weight: 700;
      color: #6366f1;
      letter-spacing: -1px;
    }
    .invoice-number {
      font-size: 18px;
      color: #666;
      margin-top: 10px;
    }
    .dates {
      text-align: right;
      color: #666;
      font-size: 14px;
    }
    .dates div {
      margin-bottom: 8px;
    }
    .dates strong {
      color: #333;
      font-weight: 600;
    }
    .parties {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-bottom: 50px;
    }
    .party {
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .party-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6366f1;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .party-name {
      font-size: 20px;
      font-weight: 600;
      color: #111;
      margin-bottom: 10px;
    }
    .party-details {
      font-size: 14px;
      color: #666;
      line-height: 1.8;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 40px;
    }
    .items-table thead {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    }
    .items-table th {
      padding: 16px;
      text-align: left;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: white;
      font-weight: 600;
    }
    .items-table th:last-child {
      text-align: right;
    }
    .items-table tbody tr {
      border-bottom: 1px solid #e5e7eb;
    }
    .items-table tbody tr:last-child {
      border-bottom: 2px solid #6366f1;
    }
    .items-table td {
      padding: 20px 16px;
      font-size: 15px;
    }
    .items-table td:last-child {
      text-align: right;
      font-weight: 600;
    }
    .totals {
      margin-left: auto;
      width: 350px;
      margin-bottom: 40px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 20px;
      font-size: 15px;
    }
    .total-row.subtotal {
      color: #666;
    }
    .total-row.tax {
      color: #666;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 16px;
      margin-bottom: 8px;
    }
    .total-row.final {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
      font-size: 22px;
      font-weight: 700;
      border-radius: 8px;
      padding: 20px;
      margin-top: 12px;
    }
    .notes-section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #6366f1;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .section-content {
      font-size: 14px;
      color: #666;
      line-height: 1.8;
      padding: 16px;
      background: #f9fafb;
      border-radius: 6px;
      border-left: 4px solid #6366f1;
    }
    @media print {
      body { background: white; margin: 0; padding: 0; }
      .invoice-container { box-shadow: none; padding: 40px; }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <div>
        <div class="invoice-title">INVOICE</div>
        <div class="invoice-number">#${invoiceDetails.number}</div>
      </div>
      <div class="dates">
        <div><strong>Date:</strong> ${new Date(invoiceDetails.date).toLocaleDateString()}</div>
        <div><strong>Due Date:</strong> ${new Date(invoiceDetails.dueDate).toLocaleDateString()}</div>
      </div>
    </div>

    <div class="parties">
      <div class="party">
        <div class="party-label">From</div>
        <div class="party-name">${businessInfo.name || 'Your Business Name'}</div>
        <div class="party-details">
          ${businessInfo.address ? businessInfo.address + '<br>' : ''}
          ${businessInfo.city && businessInfo.zip ? businessInfo.city + ', ' + businessInfo.zip + '<br>' : ''}
          ${businessInfo.email ? businessInfo.email + '<br>' : ''}
          ${businessInfo.phone || ''}
        </div>
      </div>
      <div class="party">
        <div class="party-label">Bill To</div>
        <div class="party-name">${clientInfo.name || 'Client Name'}</div>
        <div class="party-details">
          ${clientInfo.address ? clientInfo.address + '<br>' : ''}
          ${clientInfo.city && clientInfo.zip ? clientInfo.city + ', ' + clientInfo.zip + '<br>' : ''}
          ${clientInfo.email || ''}
        </div>
      </div>
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align: center; width: 100px;">Quantity</th>
          <th style="text-align: center; width: 120px;">Rate</th>
          <th style="width: 120px;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => `
          <tr>
            <td>${item.description || 'Item description'}</td>
            <td style="text-align: center;">${item.quantity}</td>
            <td style="text-align: center;">${formatCurrency(item.rate)}</td>
            <td>${formatCurrency(item.quantity * item.rate)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="totals">
      <div class="total-row subtotal">
        <span>Subtotal</span>
        <span>${formatCurrency(calculateSubtotal())}</span>
      </div>
      <div class="total-row tax">
        <span>Tax (0%)</span>
        <span>${formatCurrency(calculateTax())}</span>
      </div>
      <div class="total-row final">
        <span>Total</span>
        <span>${formatCurrency(calculateTotal())}</span>
      </div>
    </div>

    ${notes ? `
      <div class="notes-section">
        <div class="section-title">Notes</div>
        <div class="section-content">${notes}</div>
      </div>
    ` : ''}

    ${paymentTerms ? `
      <div class="notes-section">
        <div class="section-title">Payment Terms</div>
        <div class="section-content">${paymentTerms}</div>
      </div>
    ` : ''}
  </div>
</body>
</html>`;

    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceDetails.number}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">InvoiceFlow</h1>
          <p className="text-gray-600">Create professional invoices in seconds</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Business Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Business Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Business Name"
                  value={businessInfo.name}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={businessInfo.city}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, city: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={businessInfo.zip}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, zip: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={businessInfo.email}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Client Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={clientInfo.address}
                  onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={clientInfo.city}
                    onChange={(e) => setClientInfo({ ...clientInfo, city: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={clientInfo.zip}
                    onChange={(e) => setClientInfo({ ...clientInfo, zip: e.target.value })}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice Details</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Invoice Number"
                  value={invoiceDetails.number}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, number: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                    <input
                      type="date"
                      value={invoiceDetails.date}
                      onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={invoiceDetails.dueDate}
                      onChange={(e) => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Items</h2>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <input
                      type="text"
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                        min="1"
                      />
                      <input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => updateItem(index, 'rate', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                        min="0"
                        step="0.01"
                      />
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-medium text-gray-700">
                          {formatCurrency(item.quantity * item.rate)}
                        </div>
                        {items.length > 1 && (
                          <button
                            onClick={() => removeItem(index)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes and Payment Terms */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    rows="3"
                    placeholder="Add any additional notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                  <textarea
                    rows="2"
                    placeholder="Payment terms..."
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 self-start">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-gray-700">Live Preview</h3>
                </div>
              </div>

              <div className="space-y-6">
                {/* Header */}
                <div className="border-b-4 border-indigo-600 pb-6">
                  <h1 className="text-4xl font-bold text-indigo-600 mb-2">INVOICE</h1>
                  <p className="text-gray-600">#{invoiceDetails.number}</p>
                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p><span className="font-semibold">Date:</span> {new Date(invoiceDetails.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Due:</span> {new Date(invoiceDetails.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Business & Client Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">From</p>
                    <p className="font-bold text-gray-900">{businessInfo.name || 'Your Business'}</p>
                    {businessInfo.address && <p className="text-sm text-gray-600">{businessInfo.address}</p>}
                    {(businessInfo.city || businessInfo.zip) && (
                      <p className="text-sm text-gray-600">{businessInfo.city} {businessInfo.zip}</p>
                    )}
                    {businessInfo.email && <p className="text-sm text-gray-600">{businessInfo.email}</p>}
                    {businessInfo.phone && <p className="text-sm text-gray-600">{businessInfo.phone}</p>}
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">Bill To</p>
                    <p className="font-bold text-gray-900">{clientInfo.name || 'Client Name'}</p>
                    {clientInfo.address && <p className="text-sm text-gray-600">{clientInfo.address}</p>}
                    {(clientInfo.city || clientInfo.zip) && (
                      <p className="text-sm text-gray-600">{clientInfo.city} {clientInfo.zip}</p>
                    )}
                    {clientInfo.email && <p className="text-sm text-gray-600">{clientInfo.email}</p>}
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm">
                        <th className="text-left py-3 px-4 rounded-tl-lg">Item</th>
                        <th className="text-center py-3 px-2">Qty</th>
                        <th className="text-center py-3 px-2">Rate</th>
                        <th className="text-right py-3 px-4 rounded-tr-lg">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-3 px-4 text-gray-900">{item.description || 'Item'}</td>
                          <td className="py-3 px-2 text-center text-gray-600">{item.quantity}</td>
                          <td className="py-3 px-2 text-center text-gray-600">{formatCurrency(item.rate)}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">
                            {formatCurrency(item.quantity * item.rate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Tax (0%)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(calculateTax())}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg">
                    <span>Total</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>

                {/* Notes */}
                {notes && (
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Notes</p>
                    <p className="text-sm text-gray-700">{notes}</p>
                  </div>
                )}

                {/* Payment Terms */}
                {paymentTerms && (
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Payment Terms</p>
                    <p className="text-sm text-gray-700">{paymentTerms}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={generateHTML}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-6 h-6" />
              Download Invoice (HTML)
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              Opens HTML file → Press Ctrl+P → Save as PDF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
