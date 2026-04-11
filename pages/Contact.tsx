import React, { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle, AlertCircle, HelpCircle, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

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
      <SEO 
        title="Contact AriaTrip AI - Get Support & Share Feedback" 
        description="Contact the AriaTrip AI team for support, feedback, partnership inquiries, or to report bugs. We are here to help you plan your perfect trip." 
      />
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

      {/* SEO Content Section: Why Contact Us & FAQs */}
      <div className="max-w-4xl mx-auto mt-16 space-y-12 text-slate-800">
        
        {/* Why Contact Us */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                Why Reach Out to AriaTrip AI?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900">Technical Support</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Encountering an issue with your itinerary generation? Our technical team is ready to assist you. Whether it's a glitch in the map view, a problem with saving your preferences, or questions about how our AI algorithm processes your travel constraints, we are here to ensure your planning experience is seamless.
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                        <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900">Fast Response Times</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        We understand that travel planning is time-sensitive. Our dedicated support staff aims to respond to all inquiries within 24-48 hours. We prioritize urgent issues related to upcoming trips to ensure you have the information you need before you depart.
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900">Feedback & Suggestions</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        AriaTrip AI is constantly evolving, and user feedback is our most valuable resource. If you have ideas for new features, suggestions for improving our destination coverage, or thoughts on how we can make our AI travel planner even better, please don't hesitate to share them with us.
                    </p>
                </div>
            </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
                <div className="border-b border-slate-200 pb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">How long does it take to get a response?</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Our standard response time is between 24 to 48 business hours. However, during peak travel seasons, it might take slightly longer. We assure you that every single message is read and addressed by our support team. If your inquiry is urgent (e.g., related to a trip happening in the next 48 hours), please indicate "URGENT" in your message.
                    </p>
                </div>

                <div className="border-b border-slate-200 pb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Can I request a custom feature for my trip?</h3>
                    <p className="text-slate-600 leading-relaxed">
                        While AriaTrip AI is designed to handle a vast array of travel preferences through our advanced settings (budget, pacing, transport mode, and specific constraints), we are always open to hearing about unique needs. If you feel a crucial feature is missing that would significantly enhance your travel planning, please send us a detailed message. We log all feature requests for future development cycles.
                    </p>
                </div>

                <div className="border-b border-slate-200 pb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Is my contact information kept private?</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Absolutely. We take your privacy very seriously. The information you provide in this contact form (your name and email address) is used solely for the purpose of responding to your inquiry. We do not sell, rent, or share your contact details with third-party marketing agencies. For more detailed information, please review our comprehensive Privacy Policy.
                    </p>
                </div>

                <div className="border-b border-slate-200 pb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Do you offer phone support?</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Currently, AriaTrip AI provides support exclusively via email. This allows us to maintain a written record of your issues, easily share links or screenshots, and efficiently route your inquiry to the most qualified team member (whether it's a technical bug or a general question). We find that email support allows us to provide the most accurate and helpful resolutions.
                    </p>
                </div>

                <div className="pt-2">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">I found a bug in the itinerary generation. How do I report it?</h3>
                    <p className="text-slate-600 leading-relaxed">
                        We appreciate your help in making AriaTrip AI better! When reporting a bug via the contact form, please provide as much detail as possible. Include the destination you were searching for, the dates, your specific preferences, and a description of what went wrong (e.g., "The map didn't load," or "The AI suggested a restaurant that is permanently closed"). The more context you provide, the faster our engineering team can identify and fix the issue.
                    </p>
                </div>
            </div>
        </div>

        {/* MORE SEO CONTENT: Partnership & Press */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Partnerships, Press & Media Inquiries</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Collaborate with AriaTrip AI</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Are you a travel blogger, influencer, or a brand looking to revolutionize the travel industry? We are always open to exciting partnerships. Whether it's co-creating content, integrating our AI planning tools into your platform, or exploring affiliate opportunities, we'd love to hear your ideas. AriaTrip AI is committed to building a robust ecosystem that benefits travelers worldwide.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        To discuss partnership opportunities, please use the contact form above and start your message with <strong>[Partnership]</strong>. Include details about your platform, audience demographics, and how you envision our collaboration. Our business development team will review your proposal and get back to you promptly.
                    </p>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Press & Media</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        For journalists, editors, and media professionals seeking information about AriaTrip AI, our mission, or the technology behind our platform, we are happy to provide resources, interviews, and press kits. We are passionate about sharing our vision for the future of AI-driven travel planning.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Please direct all media inquiries through the contact form, starting your message with <strong>[Press]</strong>. If you are working on a tight deadline, please note that in your message, and we will do our best to accommodate your schedule. We can provide high-resolution logos, product screenshots, and quotes from our founding team upon request.
                    </p>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Feedback on Destination Coverage</h3>
                    <p className="text-slate-600 leading-relaxed">
                        While our AI is trained on a massive global dataset, the world is vast and constantly changing. If you notice that a specific region, city, or niche attraction is underrepresented or inaccurately described in our itineraries, please let us know! We rely on the collective knowledge of our user community to continuously refine and expand our database. Your local insights are invaluable in helping us provide the most authentic and comprehensive travel plans possible.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;