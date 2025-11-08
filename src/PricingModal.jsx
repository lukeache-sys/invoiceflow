import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { X, Check } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PricingModal({ isOpen, onClose }) {
  const handleUpgrade = async () => {
    // Replace this URL with your Stripe Payment Link
    window.location.href = 'YOUR_STRIPE_PAYMENT_LINK_HERE';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">Upgrade to Pro</h2>
        <p className="text-center text-gray-600 mb-8">
          Unlock unlimited invoices and premium features
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <div className="text-3xl font-bold mb-4">$0<span className="text-lg text-gray-500">/month</span></div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>3 invoices per month</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>PDF generation</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Basic templates</span>
              </li>
            </ul>
            <button
              disabled
              className="w-full py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-indigo-600 rounded-lg p-6 relative bg-indigo-50">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              POPULAR
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <div className="text-3xl font-bold mb-4">
              $9.99<span className="text-lg text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Unlimited invoices</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>PDF generation</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Premium templates</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Custom branding</span>
              </li>
            </ul>
            <button
              onClick={handleUpgrade}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Cancel anytime. No questions asked.
        </p>
      </div>
    </div>
  );
}
