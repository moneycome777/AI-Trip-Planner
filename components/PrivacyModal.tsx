import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const PrivacyModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Privacy & Terms
            </h2>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-sm text-gray-600 leading-relaxed">
            
            <section>
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> 1. Privacy Policy
                </h3>
                <p className="mb-2"><strong>Last Updated: Dec 2025</strong></p>
                <p className="mb-4">
                    At AriaTrip ("we", "our", "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Information We Collect:</strong> We collect information you provide directly to us, such as your travel preferences (destination, dates, style). We do not store your personal contact information or require login.</li>
                    <li><strong>Cookies & Tracking:</strong> We use cookies and similar tracking technologies (like Google Analytics and Google AdSense) to analyze traffic and show personalized advertisements.</li>
                    <li><strong>Third-Party Links:</strong> Our service contains affiliate links to third-party websites (e.g., Skyscanner, Booking.com). We are not responsible for the privacy practices of these sites.</li>
                    <li><strong>Data Usage:</strong> We use your input solely to generate the AI itinerary. We do not sell your personal data to third parties.</li>
                </ul>
            </section>

            <div className="border-t border-gray-100 my-4"></div>

            <section>
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> 2. Terms of Service
                </h3>
                <p className="mb-4">
                    By accessing AriaTrip, you agree to be bound by these Terms of Service.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Use of Service:</strong> AriaTrip is an AI-powered tool. While we strive for accuracy, we cannot guarantee that all travel information (prices, opening hours, transport schedules) is 100% correct. Always verify with official sources.</li>
                    <li><strong>Intellectual Property:</strong> The generated itineraries are for your personal use. You may not scrape, copy, or resell our technology.</li>
                    <li><strong>Limitation of Liability:</strong> AriaTrip is not liable for any damages, flight cancellations, or booking issues resulting from the use of our generated plans.</li>
                    <li><strong>Affiliate Disclosure:</strong> We participate in affiliate programs. We may earn a commission if you book through links on our site at no extra cost to you.</li>
                </ul>
            </section>

             <section className="bg-indigo-50 p-4 rounded-lg mt-6">
                <h4 className="font-bold text-indigo-900 mb-2">Contact Us</h4>
                <p>If you have any questions about these terms, please contact us at: <br/><strong>motivateeveryday46@gmail.com</strong></p>
            </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button 
                onClick={onClose}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
                I Understand
            </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
