import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PrivacyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col bg-zinc-950 border-zinc-800 text-zinc-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-white mb-4">
            Privacy Policy
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Last Updated: December 16, 2025
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm leading-relaxed">
          <div>
            <h4 className="font-bold text-white text-base mb-2">1. Introduction</h4>
            <p>
              This Privacy Policy explains how 1SYX ("<strong>1SYX</strong>", "<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>") collects, uses, discloses, and protects personal data when you visit our website (https://www.1syxai.com) (the "<strong>Website</strong>"), join our waitlist, or otherwise interact with our pre-launch services (collectively, the "<strong>Services</strong>").
            </p>
            <p className="mt-2">This Privacy Policy is designed to comply with:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>India:</strong> Digital Personal Data Protection Act, 2023 and DPDP Rules 2025</li>
              <li><strong>European Union/EEA & UK:</strong> General Data Protection Regulation (GDPR) and UK GDPR</li>
              <li><strong>United States:</strong> California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), and other applicable US privacy laws</li>
            </ul>
            <p className="mt-2">
              By accessing or using the Website or Services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">2. Data Controller and Contact Details</h4>
            <p>
              For purposes of GDPR and DPDP, 1SYX is the <strong>data controller</strong> of your personal data in relation to the Website and waitlist.
            </p>
            <div className="mt-2 bg-zinc-900/50 p-3 rounded border border-zinc-800">
              <p><strong>Contact Details:</strong></p>
              <ul className="list-none space-y-1 mt-1">
                <li>Email: <a href="mailto:contact@1syxai.com" className="text-accent hover:underline">contact@1syxai.com</a></li>
                <li>Website: <a href="https://www.1syxai.com" className="text-accent hover:underline">https://www.1syxai.com</a></li>
              </ul>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Where required, a Data Protection Officer (DPO) or Grievance Officer will be appointed and their contact details will be updated in this Privacy Policy.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">3. Personal Data We Collect</h4>
            <p>When you interact with our Website and Services (especially the waitlist form), we may collect the following categories of personal data:</p>
            
            <h5 className="font-bold text-white text-sm mt-3 mb-1">3.1 Data You Provide Directly</h5>
            <p>When you fill out the "Join Waitlist" form or otherwise contact us, you may provide:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Full Name</li>
              <li>Work Email</li>
              <li>LinkedIn Profile (URL or handle)</li>
              <li>Hierarchy / Seniority (Intern, Jr Management, Sr. Management, Director, GM, VP, CXO)</li>
              <li>Function (Marketing, Sales, Product, Agency)</li>
              <li>Company Size</li>
              <li>Use Case (free text description of how you intend to use 1SYX)</li>
              <li>Pain Point (free text description)</li>
              <li>Current Solution (what you currently use)</li>
              <li>Suggestions (optional)</li>
            </ul>
            <p className="mt-2">
              If you contact us via email or other channels, we may also collect the content of your communications and any additional information you voluntarily provide.
            </p>

            <h5 className="font-bold text-white text-sm mt-3 mb-1">3.2 Data Collected Automatically</h5>
            <p>When you visit the Website, we may automatically collect certain information about your device and usage using cookies and similar technologies, such as:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Referring URLs</li>
              <li>Pages viewed, time spent, and clickstream data</li>
              <li>Approximate location (city/region) inferred from IP address</li>
            </ul>
            <p className="mt-2">
              Where required by law (for example, under GDPR or DPDP Rules), we will obtain your consent before setting non-essential cookies.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">4. Purposes and Legal Bases for Processing</h4>
            <p>We process your personal data only when we have a valid legal basis to do so, and only for specific purposes.</p>

            <h5 className="font-bold text-white text-sm mt-3 mb-1">4.1 Purposes of Processing</h5>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>
                <strong>Waitlist Management:</strong> To register you on the waitlist and manage your interest in 1SYX; to prioritize outreach and potential onboarding based on your role, company size, and use case.
              </li>
              <li>
                <strong>Communication:</strong> To contact you regarding updates, product announcements, onboarding opportunities, and relevant marketing communications; to respond to your inquiries and support requests.
              </li>
              <li>
                <strong>Product Research and Improvement:</strong> To understand target customer profiles, use cases, pain points, and current solutions; to refine our positioning, messaging, and product roadmap.
              </li>
              <li>
                <strong>Analytics and Website Performance:</strong> To understand how visitors use the Website; to improve content, user experience, and conversion flows.
              </li>
              <li>
                <strong>Legal Compliance and Security:</strong> To comply with applicable laws and regulatory obligations; to detect, prevent, and respond to security incidents or misuse of the Website.
              </li>
            </ol>

            <h5 className="font-bold text-white text-sm mt-3 mb-1">4.2 Legal Bases (GDPR and EU/UK Users)</h5>
            <p>For users located in the EU/EEA or UK, we rely on the following legal bases:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Consent (Article 6(1)(a)):</strong> For collecting personal data via the waitlist form; for sending marketing communications (where required); for using non-essential cookies/analytics tools.</li>
              <li><strong>Legitimate Interests (Article 6(1)(f)):</strong> For basic analytics, product improvement, and security, where these do not override your fundamental rights and freedoms.</li>
            </ul>
            <p className="mt-1 text-xs">You may withdraw your consent at any time (see Section 9).</p>

            <h5 className="font-bold text-white text-sm mt-3 mb-1">4.3 Legal Bases (India - DPDP Act)</h5>
            <p>
              Under the DPDP Act, processing is primarily based on <strong>your consent</strong> for specified purposes. When you submit your data via the waitlist form, you consent to the processing of your personal data for: Waitlist registration, Communication about 1SYX, Analytics and product improvement. You may withdraw your consent at any time using the mechanisms described in Section 9.
            </p>

            <h5 className="font-bold text-white text-sm mt-3 mb-1">4.4 Legal Bases (United States - CCPA/CPRA)</h5>
            <p>
              For California residents, your personal data may be processed as "personal information" under CCPA/CPRA for: Providing and improving the Services, Communicating with you, Detecting and preventing security incidents. We do <strong>not</strong> "sell" or "share" your personal information as those terms are defined under CCPA/CPRA.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">5. Cookies and Similar Technologies</h4>
            <p>We may use cookies and similar technologies (such as pixels and tags) to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Remember your preferences</li>
              <li>Analyze traffic and usage patterns</li>
              <li>Measure campaign performance</li>
            </ul>
            <p className="mt-2">
              Where required by law, we will display a cookie banner and obtain your consent before placing non-essential cookies. You can manage your preferences via your browser settings or through the cookie banner controls.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">6. How We Share Your Personal Data</h4>
            <p>We do not sell your personal data. We only share personal data in the following limited circumstances:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li><strong>Service Providers / Processors:</strong> Hosting providers, analytics platforms, email service providers, CRM tools, and similar vendors that process data on our behalf and under our instructions.</li>
              <li><strong>Legal and Compliance:</strong> Where required by law, regulation, legal process, or governmental request; To protect our rights, property, or safety, or that of our users or the public.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, financing, or sale of all or a portion of our business, in which case personal data may be transferred as a business asset subject to this Privacy Policy or an equivalent policy.</li>
            </ol>
            <p className="mt-2">
              We require all service providers and partners who process personal data on our behalf to implement appropriate security measures and to process personal data only as instructed by us and in compliance with applicable laws.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">7. International Data Transfers</h4>
            <p>1SYX may process and store personal data in multiple jurisdictions, including India, the European Union, the United States, or other countries where our service providers are located.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>EU/EEA and UK Transfers:</strong> We ensure safeguards like Adequacy decisions, Standard Contractual Clauses (SCCs), or other appropriate safeguards.</li>
              <li><strong>India (DPDP Act):</strong> Cross-border transfers will comply with the DPDP Act and DPDP Rules, including any restrictions or negative lists.</li>
              <li><strong>United States:</strong> Transfers to the US will have appropriate contractual, technical, and organizational safeguards consistent with GDPR/DPDP requirements.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">8. Data Retention</h4>
            <p>We retain personal data only for as long as necessary for the purposes described in this Privacy Policy, including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Waitlist data: retained while you remain on the waitlist and for a reasonable period thereafter.</li>
              <li>Analytics data: retained for as long as needed to analyze performance and trends.</li>
              <li>Legal and compliance data: retained as required by applicable law.</li>
            </ul>
            <p className="mt-2">
              When personal data is no longer needed, it will be securely deleted, anonymized, or aggregated in accordance with our internal policies and applicable law.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">9. Your Rights</h4>
            
            <h5 className="font-bold text-white text-sm mt-3 mb-1">9.1 Rights Under GDPR (EU/EEA & UK)</h5>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Right of Access, Rectification, Erasure, Restriction of Processing, Data Portability, Objection, and Withdrawal of Consent.</li>
              <li>To exercise these rights, contact us at contact@1syxai.com.</li>
              <li>You also have the right to lodge a complaint with your local supervisory authority.</li>
            </ul>

            <h5 className="font-bold text-white text-sm mt-3 mb-1">9.2 Rights Under DPDP (India)</h5>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Right to Access, Correction/Erasure, Grievance Redressal, and Withdrawal of Consent.</li>
              <li>To exercise these rights, contact us at contact@1syxai.com with the subject line "DPDP Rights Request".</li>
            </ul>

            <h5 className="font-bold text-white text-sm mt-3 mb-1">9.3 Rights Under CCPA/CPRA (California)</h5>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Right to Know, Delete, Correct, and Non-Discrimination.</li>
              <li>1SYX does not sell or share your personal information in the sense of CCPA/CPRA.</li>
              <li>To exercise your rights, contact us at contact@1syxai.com with the subject line "CCPA Request".</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">10. Children’s Privacy</h4>
            <p>
              The Website and Services are not intended for children under the age of 18, and we do not knowingly collect personal data from children. If you believe that a child has provided us with personal data, please contact us immediately.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">11. Data Security</h4>
            <p>
              We implement appropriate technical and organizational measures to protect personal data, including encryption (HTTPS), access controls, and regular monitoring. However, no method of transmission is completely secure, and you use the Website at your own risk.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">12. Third-Party Websites and Services</h4>
            <p>
              The Website may contain links to third-party websites or services (e.g., LinkedIn) that are not operated by us. This Privacy Policy does not cover the privacy practices of third parties.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <p className="text-center text-xs text-zinc-500">© 2025 1SYX. All rights reserved.</p>
          </div>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t border-zinc-800">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
