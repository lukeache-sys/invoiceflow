import React, { useState } from 'react';
import { FileText, ArrowRight, Check, Sparkles, Zap, Shield, Download, Mail, Star, Clock, Users } from 'lucide-react';

export default function InvoiceFlowLanding() {
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
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">Features</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">Pricing</a>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-900">Free • No signup required</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-gray-900">
              Create Professional
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Invoices in Seconds
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Simple, fast, and beautiful invoicing for freelancers and small businesses. 
              No sign-up needed, start creating invoices right away.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <span>Loved by 10,000+ users</span>
            </div>
          </div>

          {/* Hero Image/Preview */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border-8 border-gray-200 shadow-2xl bg-white overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold">INVOICE</div>
                  <div className="text-right text-sm">
                    <div>Invoice #INV-001</div>
                    <div className="text-indigo-200">Nov 08, 2025</div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">From</div>
                    <div className="font-semibold text-gray-900">Your Company Inc.</div>
                    <div className="text-sm text-gray-600">123 Business St</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Bill To</div>
                    <div className="font-semibold text-gray-900">Client Company</div>
                    <div className="text-sm text-gray-600">456 Client Ave</div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 grid grid-cols-4 gap-4 text-sm font-semibold text-gray-700">
                    <div className="col-span-2">Description</div>
                    <div className="text-right">Qty</div>
                    <div className="text-right">Amount</div>
                  </div>
                  <div className="p-3 grid grid-cols-4 gap-4 text-sm">
                    <div className="col-span-2 text-gray-900">Website Design</div>
                    <div className="text-right text-gray-600">1</div>
                    <div className="text-right font-semibold text-gray-900">$2,500.00</div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Total</div>
                    <div className="text-3xl font-bold text-indigo-600">$2,500.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Invoices Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">5,000+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">30 sec</div>
              <div className="text-gray-600">Avg. Creation Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All the features you need to create professional invoices, without the complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Create professional invoices in under 30 seconds. No bloat, no waiting.'
              },
              {
                icon: FileText,
                title: 'Professional Templates',
                description: 'Beautiful, clean invoice designs that make you look professional.'
              },
              {
                icon: Download,
                title: 'Instant PDF Download',
                description: 'Download your invoices as high-quality PDFs instantly.'
              },
              {
                icon: Shield,
                title: 'No Sign-Up Required',
                description: 'Start creating invoices immediately. No account needed.'
              },
              {
                icon: Clock,
                title: 'Real-Time Preview',
                description: 'See exactly how your invoice looks as you type.'
              },
              {
                icon: Users,
                title: 'Client Management',
                description: 'Save client details for faster invoice creation.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start for free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-600">Forever free</div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  '3 invoices per month',
                  'Professional templates',
                  'PDF download',
                  'Real-time preview'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                Start Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-indigo-600 rounded-2xl p-8 relative shadow-xl bg-gradient-to-b from-indigo-50 to-white">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">$9</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited invoices',
                  'All templates',
                  'Priority support',
                  'Client management',
                  'Custom branding',
                  'Email invoices'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg">
                Start Pro Trial
              </button>
            </div>

            {/* Business Plan */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">$29</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Everything in Pro',
                  'Team collaboration',
                  'API access',
                  'Advanced analytics',
                  'White label',
                  'Dedicated support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of freelancers and small businesses creating professional invoices with InvoiceFlow.
          </p>
          
          {/* Email Signup */}
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-6">
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-xl border-2 border-transparent focus:border-white focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Get Started
                  </>
                )}
              </button>
            </div>
          </form>
          
          <p className="text-sm text-indigo-200">
            No credit card required • Free forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">InvoiceFlow</span>
              </div>
              <p className="text-gray-600 text-sm">
                Simple, fast, and beautiful invoicing for modern businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Templates</a></li>
                <li><a href="#" className="hover:text-gray-900">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2025 InvoiceFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
