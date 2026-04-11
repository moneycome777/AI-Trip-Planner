import React from 'react';
import { Shield, FileText } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Privacy Policy & Terms of Service - AriaTrip AI" 
        description="Read our Privacy Policy and Terms of Service to understand how AriaTrip AI protects your data and the rules for using our AI travel planning service." 
      />
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 p-8 md:p-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy & Terms of Service</h1>
            <p className="text-lg text-slate-600">Your privacy and security are our top priorities. Please read our policies carefully.</p>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-12">
            
            {/* Privacy Policy Section */}
            <section>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                    <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 m-0">Privacy Policy</h2>
                </div>
                <p className="font-semibold text-slate-500 mb-6">Effective Date: October 1, 2023 | Last Updated: March 19, 2026</p>
                
                <p className="text-lg leading-relaxed mb-6">
                    At AriaTrip AI ("we", "our", "us"), we are deeply committed to protecting your privacy and ensuring the security of your personal information. This comprehensive Privacy Policy explains in detail how we collect, use, disclose, and safeguard your information when you visit our website (ariatrip.vercel.app) and use our AI-powered travel planning services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Information We Collect</h3>
                <p className="leading-relaxed mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>Personal Data:</strong> We intentionally minimize the collection of personally identifiable information (PII). We do not require you to create an account, log in, or provide your name, email address, or phone number to generate a travel itinerary. If you choose to contact us via our contact form, we will collect your name, email address, and the contents of your message solely for the purpose of responding to your inquiry. We do not sell, rent, or trade your personal data to third parties for marketing purposes.</li>
                    <li><strong>Travel Preferences (Derivative Data):</strong> When you use our itinerary generator, we collect the inputs you provide, such as your desired destination, travel dates, budget level, travel style (e.g., family, solo, romantic), and specific interests. This data is processed in real-time by our AI models to generate your customized plan. We may aggregate and anonymize this data to understand broad travel trends, but it is never linked back to your individual identity.</li>
                    <li><strong>Automatically Collected Data:</strong> Our servers automatically collect certain information when you access the Site. This includes your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site. This information is used for analytics, security monitoring, and to ensure the Site functions correctly across different devices and browsers.</li>
                    <li><strong>Device Information:</strong> We may collect information about the device you use to access the Site, including the hardware model, operating system and version, unique device identifiers, and mobile network information. This helps us optimize our Site for the devices our users prefer.</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. How We Use Your Information</h3>
                <p className="leading-relaxed mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                    <li>Generate highly personalized, AI-driven travel itineraries based on your specific inputs and preferences.</li>
                    <li>Improve our algorithms and the overall quality of the travel recommendations provided by AriaTrip AI, ensuring our suggestions remain relevant and accurate.</li>
                    <li>Monitor and analyze usage and trends to improve your experience with the Site, identifying which features are most popular and which need refinement.</li>
                    <li>Respond to your customer service requests and support needs in a timely and effective manner.</li>
                    <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you (via Google AdSense and similar networks), helping us keep the core service free for all users.</li>
                    <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity, ensuring a safe environment for all users.</li>
                    <li>Comply with legal obligations and resolve any disputes that may arise.</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Cookies and Tracking Technologies</h3>
                <p className="leading-relaxed mb-4">
                    We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
                </p>
                <p className="leading-relaxed mb-4">
                    We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website. We also use Google AdSense to display ads. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                </p>
                <p className="leading-relaxed mb-6">
                    You may opt out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.aboutads.info</a>.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Disclosure of Your Information</h3>
                <p className="leading-relaxed mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                    <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                    <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance. Specifically, your travel inputs are processed by Google's Gemini AI models to generate the itineraries. These third parties are bound by strict confidentiality agreements and are prohibited from using your data for any other purpose.</li>
                    <li><strong>Third-Party Advertisers:</strong> We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to the Site and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</li>
                    <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Security of Your Information</h3>
                <p className="leading-relaxed mb-6">
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">6. Policy for Children</h3>
                <p className="leading-relaxed mb-6">
                    We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below. We will take immediate steps to delete such information from our records.
                </p>
            </section>

            <div className="border-t-2 border-slate-100 my-12"></div>

            {/* Terms of Service Section */}
            <section>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                    <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 m-0">Terms of Service</h2>
                </div>
                
                <p className="text-lg leading-relaxed mb-6">
                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and AriaTrip AI (“we,” “us” or “our”), concerning your access to and use of the ariatrip.vercel.app website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Acceptance of Terms</h3>
                <p className="leading-relaxed mb-6">
                    By accessing the Site, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Use of the Service</h3>
                <p className="leading-relaxed mb-4">
                    AriaTrip AI provides an automated, AI-driven travel itinerary generation service. You agree to use this service only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                    <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                    <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
                    <li>Use the Site to advertise or offer to sell goods and services.</li>
                    <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
                    <li>Engage in unauthorized framing of or linking to the Site.</li>
                    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information.</li>
                    <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                    <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                </ul>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Disclaimer of Warranties and Accuracy of Information</h3>
                <p className="leading-relaxed mb-6">
                    The Site and the itineraries generated by AriaTrip AI are provided on an "as-is" and "as-available" basis. You agree that your use of the Site and our services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the Site and your use thereof. We make no warranties or representations about the accuracy, reliability, completeness, or timeliness of the content generated by the AI. Travel information, including prices, opening hours, transit routes, and safety conditions, changes frequently. You are solely responsible for verifying all information with official sources before making travel arrangements or bookings.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Limitation of Liability</h3>
                <p className="leading-relaxed mb-6">
                    In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, missed flights, ruined vacations, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages. Your reliance on any information provided by AriaTrip AI is solely at your own risk.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Affiliate Disclosure</h3>
                <p className="leading-relaxed mb-6">
                    AriaTrip AI participates in various affiliate marketing programs. This means we may earn a commission if you click on or make purchases via affiliate links on our Site (such as links to hotels, flights, or tours). This comes at no additional cost to you and helps support the free operation of our AI planning tools. We only recommend services that we believe provide value to our users.
                </p>
            </section>

             <section className="bg-slate-50 p-8 rounded-3xl mt-12 border border-slate-200 text-center">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Questions or Concerns?</h4>
                <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                    If you have any questions about this Privacy Policy or our Terms of Service, or if you wish to exercise any of your data protection rights, please do not hesitate to contact us.
                </p>
                <a href="mailto:motivateeveryday46@gmail.com" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                    Contact Support
                </a>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
