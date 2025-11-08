import React from 'react';
import { Check } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Pro!</h1>
        <p className="text-gray-600 mb-6">
          Your payment was successful. You now have unlimited access to InvoiceFlow Pro features!
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
        >
          Start Creating Invoices
        </a>
        <p className="text-sm text-gray-500 mt-4">
          You can now generate unlimited invoices with premium features.
        </p>
      </div>
    </div>
  );
}
