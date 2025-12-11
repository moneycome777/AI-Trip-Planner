import React from 'react';
import { Shield, FileText } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy & Terms</h1>
        
        <div className="prose prose-slate text-slate-600 space-y-8">
            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> 1. Privacy Policy
                </h3>
                <p className="mb-2 font-semibold">Last Updated: October 2023</p>
                <p className="mb-4 leading-relaxed">
                    At AriaTrip AI ("we", "our", "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Information We Collect:</strong> We collect information you provide directly to us, such as your travel preferences (destination, dates, style). We do not store your personal contact information or require login.</li>
                    <li><strong>Cookies & Tracking:</strong> We use cookies and similar tracking technologies (like Google Analytics and Google AdSense) to analyze traffic and show personalized advertisements.</li>
                    <li><strong>Third-Party Links:</strong> Our service contains affiliate links to third-party websites (e.g., Skyscanner, Booking.com). We are not responsible for the privacy practices of these sites.</li>
                    <li><strong>Data Usage:</strong> We use your input solely to generate the AI itinerary. We do not sell your personal data to third parties.</li>
                </ul>
            </section>

            <div className="border-t border-slate-100"></div>

            <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" /> 2. Terms of Service
                </h3>
                <p className="mb-4 leading-relaxed">
                    By accessing AriaTrip AI, you agree to be bound by these Terms of Service.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Use of Service:</strong> AriaTrip AI is an AI-powered tool. While we strive for accuracy, we cannot guarantee that all travel information (prices, opening hours, transport schedules) is 100% correct. Always verify with official sources.</li>
                    <li><strong>Intellectual Property:</strong> The generated itineraries are for your personal use. You may not scrape, copy, or resell our technology.</li>
                    <li><strong>Limitation of Liability:</strong> AriaTrip AI is not liable for any damages, flight cancellations, or booking issues resulting from the use of our generated plans.</li>
                    <li><strong>Affiliate Disclosure:</strong> We participate in affiliate programs. We may earn a commission if you book through links on our site at no extra cost to you.</li>
                </ul>
            </section>

             <section className="bg-white/50 p-6 rounded-2xl mt-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Contact Us</h4>
                <p className="text-sm">If you have any questions about these terms, please contact us at: <br/><strong className="text-indigo-600">motivateeveryday46@gmail.com</strong></p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;