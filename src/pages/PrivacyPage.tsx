import React from 'react';

export const PrivacyPage = () => {
    return (
        <main className="flex-grow bg-white py-16 px-4 sm:px-6 lg:px-8 text-slate-800">
            <div className="max-w-3xl mx-auto prose prose-slate">
                <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
                <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <h3>1. Information We Collect</h3>
                <p>We collect information you provide directly to us, including:</p>
                <ul>
                    <li><strong>Account Information:</strong> Name, email address, and agency details provided during sign-up.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our "Stacks," "Playbooks," and "Profit Calculators."</li>
                    <li><strong>Transaction Data:</strong> Payment history (processed securely via Stripe; we do not store full credit card numbers).</li>
                </ul>

                <h3>2. How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our Services.</li>
                    <li>Process transactions and send related information, including confirmations and receipts.</li>
                    <li>Send you technical notices, updates, security alerts, and support messages.</li>
                    <li>Communicate with you about products, services, offers, promotions, and events.</li>
                </ul>

                <h3>3. Sharing of Information</h3>
                <p>
                    <strong>3.1 Vendors and Partners:</strong> We may share your information with third-party vendors (like Stripe for payments or database providers) who need access to such information to carry out work on our behalf.
                </p>
                <p>
                    <strong>3.2 Affiliate Tracking:</strong> When you click a link to a software partner (e.g., a "Start Trial" button), a tracking cookie is placed on your device to attribute the referral. We do not pass your personal data to these vendors unless you explicitly fill out a form on their site.
                </p>
                <p>
                    <strong>3.3 Legal Compliance:</strong> We may disclose your information if we believe disclosure is in accordance with any applicable law, regulation, or legal process.
                </p>

                <h3>4. Data Security</h3>
                <p>
                    We use industry-standard security measures (SSL encryption, secure databases) to protect your information. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h3>5. Your Rights</h3>
                <p>
                    You have the right to access, correct, or delete your personal information. You may update your account information by logging into your account. To request deletion of your data, please contact support.
                </p>

                <h3>6. Cookies</h3>
                <p>
                    We use cookies to help us analyze traffic and improve the effectiveness of our website. You can control cookies through your browser settings.
                </p>

                <h3>7. Changes to this Policy</h3>
                <p>
                    We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy.
                </p>

                <h3>8. Contact</h3>
                <p>
                    For privacy-related concerns, please contact: privacy@whitelabelwonder.com
                </p>
            </div>
        </main>
    );
};
