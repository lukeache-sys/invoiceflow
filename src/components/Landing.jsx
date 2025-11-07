import React, { useState } from 'react';
import { FileText, ArrowRight, Check, Sparkles, Zap, Shield, Download, Mail, Star } from 'lucide-react';

export default function Landing({ onStart }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">InvoiceFlow</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Features</a>
              <a href="#pricing" className="text-sm text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">Pricing</a>
              <button 
                onClick={onStart}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm text-indigo-700 font-medium">Free • No signup required</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-gray-900">
              Create Professional<br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Invoices Instantly
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Beautiful invoices in 30 seconds. No account, no credit card, no hassle. Just professional invoices that get you paid.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button 
                onClick={onStart}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Create Free Invoice
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all">
                View Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white" />
                  ))}
                </div>
                <span>10,000+ invoices created</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2">5.0 rating</span>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border-2 border-gray-200 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Invoice Generator</div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Business Name</div>
                      <div className="text-sm text-gray-900 font-medium">Acme Corporation</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Client Name</div>
                      <div className="text-sm text-gray-900 font-medium">Tech Startup Inc.</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Amount</div>
                      <div className="text-sm text-gray-900 font-medium">$2,500.00</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Live Preview</div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="font-bold text-gray-900 text-lg mb-1">INVOICE</div>
                      <div className="text-gray-600">#INV-001</div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consulting Services</span>
                        <span className="font-medium text-gray-900">$2,500.00</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Due: Dec 31, 2025</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-indigo-600">$2,500.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Invoices Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">$2.5M+</div>
              <div className="text-gray-600">Total Invoiced</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">30 sec</div>
              <div className="text-gray-600">Average Creation Time</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, powerful features that help you create professional invoices in seconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Create professional invoices in under 30 seconds. No complex forms or unnecessary steps.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data stays in your browser. We don't store anything on our servers. Ever.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">PDF Download</h3>
              <p className="text-gray-600 leading-relaxed">
                Download professional PDF invoices instantly. Print or email to your clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">forever</span>
                </div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              
              <button 
                onClick={onStart}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all mb-6"
              >
                Start Free
              </button>

              <div className="space-y-3">
                {['Unlimited invoices', 'PDF download', 'No watermark', 'Basic templates'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 border-2 border-indigo-700 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-white">$9</span>
                  <span className="text-indigo-100">/month</span>
                </div>
                <p className="text-indigo-100">For growing businesses</p>
              </div>
              
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all mb-6">
                Start 14-day trial
              </button>

              <div className="space-y-3">
                {[
                  'Everything in Free',
                  'Custom branding',
                  'Email sending',
                  'Client database',
                  'Payment tracking',
                  'Priority support'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-2xl text-gray-900 mb-8 leading-relaxed">
              "I've tried dozens of invoicing tools. InvoiceFlow is the only one that doesn't feel bloated. It does exactly what I need and nothing more. Love it!"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400" />
              <div>
                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                <div className="text-gray-600">Freelance Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to get paid faster?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of freelancers and small businesses creating beautiful invoices with InvoiceFlow.
          </p>
          <button 
            onClick={onStart}
            className="group bg-white text-indigo-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition-all shadow-xl inline-flex items-center gap-2"
          >
            Create Your First Invoice
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Stay updated</h3>
          <p className="text-gray-600 mb-6">
            Get tips on invoicing, billing, and growing your business.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={submitted}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:bg-green-500 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {submitted ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">InvoiceFlow</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Features</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#" className="hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            </div>

            <div className="text-sm text-gray-600">
              © 2025 InvoiceFlow
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
