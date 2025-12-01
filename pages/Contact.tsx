import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
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

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="your@email.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">
                    Send Message
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;