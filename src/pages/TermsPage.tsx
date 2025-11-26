import React from 'react';

export const TermsPage = () => {
    return (
        <main className="flex-grow bg-white py-16 px-4 sm:px-6 lg:px-8 text-slate-800">
            <div className="max-w-3xl mx-auto prose prose-slate">
                <h1 className="text-4xl font-extrabold mb-8">Terms of Service</h1>
                <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <h3>1. Introduction</h3>
                <p>
                    Welcome to White-Label Wonder ("Company", "we", "our", "us"). By accessing or using our website, services, digital products, and community (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Services.
                </p>

                <h3>2. No Professional Advice (Financial & Legal)</h3>
                <p>
                    <strong>2.1 Financial Disclaimer:</strong> The "Profit Calculators," "ROI Protocols," and case studies presented on this platform are for educational and illustrative purposes only. They are not guarantees of future earnings. Your results will vary and depend on your capacity, business experience, expertise, and level of desire. There are no guarantees concerning the level of success you may experience.
                </p>
                <p>
                    <strong>2.2 Legal Templates:</strong> The "Resell Kits" may contain contract templates or legal documents. We are not a law firm. These documents are provided "as-is" and should be reviewed by a qualified attorney in your jurisdiction before use. We are not responsible for any legal disputes arising from your use of these templates.
                </p>

                <h3>3. Third-Party Services & Affiliates</h3>
                <p>
                    <strong>3.1 Affiliate Disclosure:</strong> Our platform contains links to third-party websites and software services ("Vendors"). We may receive a commission for purchases made through these links. This does not affect the price you pay.
                </p>
                <p>
                    <strong>3.2 No Liability for Vendors:</strong> We act as an aggregator and educator. We do not own, operate, or control the Vendors listed (e.g., HighLevel, Stripe, Cal.com). We are not responsible for their uptime, service quality, data handling, or pricing changes. Your relationship with any Vendor is governed strictly by their own Terms of Service.
                </p>

                <h3>4. Intellectual Property</h3>
                <p>
                    <strong>4.1 Our IP:</strong> The "Launch Playbooks," "Resell Kits," website design, and code are the proprietary property of White-Label Wonder. You are granted a limited, non-exclusive, non-transferable license to use these assets for your own agency business. You may <strong>not</strong> resell, redistribute, or share our kits or playbooks publicly.
                </p>

                <h3>5. Payments and Refunds</h3>
                <p>
                    <strong>5.1 Digital Products:</strong> Due to the immediate nature of digital downloads (Resell Kits), all sales of one-time digital products are final and non-refundable.
                </p>
                <p>
                    <strong>5.2 Memberships:</strong> Subscription memberships can be cancelled at any time via your dashboard. Cancellations take effect at the end of the current billing cycle. We do not offer prorated refunds for partial months.
                </p>

                <h3>6. Limitation of Liability</h3>
                <p className="uppercase font-bold">
                    To the maximum extent permitted by law, in no event shall White-Label Wonder be liable for any indirect, punitive, incidental, special, or consequential damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, this service.
                </p>

                <h3>7. Indemnification</h3>
                <p>
                    You agree to defend, indemnify and hold harmless White-Label Wonder and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from your use and access of the Service, or your violation of these Terms.
                </p>

                <h3>8. Governing Law</h3>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
                </p>

                <h3>9. Contact Us</h3>
                <p>
                    If you have any questions about these Terms, please contact us at: legal@whitelabelwonder.com
                </p>
            </div>
        </main>
    );
};
