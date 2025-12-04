import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // EmailJS Configuration
    // NOTE: Make sure your EmailJS Template is configured to send email to "motivateeveryday46@gmail.com"
    const SERVICE_ID = 'service_q2f5gav'; // Using the ID from your ErrorBoundary
    const TEMPLATE_ID = 'template_bm7vaqo'; // Replace this if you created a specific Contact Template
    const PUBLIC_KEY = 'k9Wtzi7pVLF6sI3cV'; // Using the Key from your ErrorBoundary

    const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'motivateeveryday46@gmail.com' // Pass this to template if your template uses {{to_email}}
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        setStatus('error');
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-indigo-100">We'd love to hear from you. Send us a message!</p>
        </div>
        
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-start gap-3">
                    <Mail className="w-6 h-6 text-indigo-600 mt-1" />
                    <div>
                        <h3 className="font-bold text-gray-900">Email</h3>
                        <p className="text-gray-600">motivateeveryday46@gmail.com</p>
                        <p className="text-xs text-gray-400 mt-1">Response time: 24-48 hours</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                    <div>
                        <h3 className="font-bold text-gray-900">Location</h3>
                        <p className="text-gray-600">Digital Nomad HQ</p>
                        <p className="text-gray-600">Global Remote Team</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                        rows={4} 
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>

                {status === 'success' && (
                    <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Message sent successfully! We will get back to you soon.
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> Failed to send message. Please try again later.
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={status === 'sending' || status === 'success'}
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'sending' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" /> Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;