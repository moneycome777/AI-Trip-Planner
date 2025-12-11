import React, { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
    const SERVICE_ID = 'service_q2f5gav';
    const TEMPLATE_ID = 'template_s9guskd';
    const PUBLIC_KEY = 'k9Wtzi7pVLF6sI3cV';

    const templateParams = {
        name: `${formData.name} (${formData.email})`, 
        error_message: `USER FEEDBACK MESSAGE:\n\n${formData.message}`,
        time: new Date().toLocaleString(),
        reply_to: formData.email,
        message: formData.message 
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
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-slate-300">We'd love to hear from you. Send us a message!</p>
        </div>
        
        <div className="p-8">
            <div className="flex items-center justify-center gap-3 mb-8">
                <Mail className="w-6 h-6 text-indigo-600" />
                <div className="text-center">
                    <h3 className="font-bold text-slate-900">Email Support</h3>
                    <p className="text-slate-600">motivateeveryday46@gmail.com</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full border border-slate-200 bg-white/50 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full border border-slate-200 bg-white/50 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">Message</label>
                    <textarea 
                        rows={4} 
                        required
                        className="w-full border border-slate-200 bg-white/50 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none" 
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>

                {status === 'success' && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 border border-green-100 font-medium">
                        <CheckCircle className="w-5 h-5" /> Message sent successfully!
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-2 border border-red-100 font-medium">
                        <AlertCircle className="w-5 h-5" /> Failed to send. Please try again later.
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={status === 'sending' || status === 'success'}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
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