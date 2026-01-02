import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col bg-zinc-950 border-zinc-800 text-zinc-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-white mb-4">
            Terms and Conditions
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Last Updated: December 16, 2025
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm leading-relaxed">
          <div>
            <h4 className="font-bold text-white text-base mb-2">1. Acceptance of Terms</h4>
            <p>
              By accessing, browsing, or using the 1SYX website (https://www.1syxai.com) (the "<strong>Website</strong>"), including the waitlist signup functionality, and any services offered therein (collectively, the "<strong>Services</strong>"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("<strong>Terms</strong>"). If you do not agree to these Terms, please do not access or use the Website or Services.
            </p>
            <p className="mt-2">
              These Terms apply to all visitors, users, and others who access the Website or use the Services. By using this Website, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into binding agreements.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">2. Modification of Terms</h4>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website and Services following the posting of revised Terms means that you accept and agree to the changes. It is your responsibility to review these Terms periodically for updates.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">3. Website Access and Use License</h4>
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive, revocable, non-transferable license to access and use the Website and Services solely for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access or use the Website in any manner that violates any applicable law or regulation</li>
              <li>Attempt to gain unauthorized access to the Website or its systems</li>
              <li>Use automated tools, bots, spiders, or scrapers to collect data from the Website without permission</li>
              <li>Upload, post, or transmit any illegal, defamatory, obscene, threatening, or infringing content</li>
              <li>Interfere with or disrupt the functionality of the Website or its servers</li>
              <li>Attempt to reverse engineer, decompile, or discover any source code or proprietary algorithms</li>
              <li>Remove, obscure, or alter any proprietary notices or labels on the Website</li>
              <li>Rent, lease, sell, trade, or otherwise exploit the Website for commercial purposes without authorization</li>
              <li>Use the Website to transmit malware, viruses, or any code of destructive nature</li>
              <li>Engage in any form of harassment, bullying, or illegal activity</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">4. Waitlist and Service Registration</h4>
            <p>
              The Website currently operates on a waitlist basis. By submitting the waitlist registration form, you authorize us to collect your information as detailed in our Privacy Policy. Registration does not guarantee access to any paid or unpaid services.
            </p>
            <div className="mt-2 space-y-2">
              <p><strong>Waitlist Information:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Submission of your information to the waitlist does not create a binding contract</li>
                <li>We reserve the right to approve or reject your application at our sole discretion</li>
                <li>Your position on the waitlist is not guaranteed and may change without notice</li>
                <li>We may contact you regarding your interest in 1SYX and send you promotional communications (you may opt out at any time)</li>
              </ul>
              <p><strong>Accurate Information:</strong> You agree to provide accurate, current, and complete information in all registration forms. You are responsible for maintaining the confidentiality of any credentials and for all activities that occur under your account.</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">5. Intellectual Property Rights</h4>
            <p>
              All content on the Website, including but not limited to text, graphics, logos, images, videos, audio, software, and code (collectively, the "<strong>Content</strong>"), is the property of 1SYX or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws. You are prohibited from:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Reproducing, modifying, or distributing any Content without prior written permission</li>
              <li>Using the Content for commercial purposes without a valid license</li>
              <li>Creating derivative works based on the Content</li>
              <li>Framing or mirroring the Website or its Content on another website without permission</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">6. User-Generated Content and Feedback</h4>
            <p>
              If you submit feedback, suggestions, testimonials, case studies, or any other content to us ("<strong>User Content</strong>"), you grant us a worldwide, non-exclusive, royalty-free, perpetual license to use, reproduce, modify, and distribute such User Content. You represent and warrant that:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>You own or have the right to submit the User Content</li>
              <li>The User Content does not violate any third-party rights</li>
              <li>You have obtained all necessary consents from any individuals mentioned in the User Content</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">7. Disclaimers and Limitation of Liability</h4>
            <p><strong>Disclaimer of Warranties:</strong> The Website and Services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. To the fullest extent permissible under applicable law, we disclaim all warranties.</p>
            <p className="mt-2"><strong>Limitation of Liability:</strong> To the maximum extent permitted by law, in no event shall 1SYX be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Website, Services, or these Terms.</p>
            <p className="mt-2 text-xs text-zinc-500">Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so the above limitations may not apply to you.</p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">8. Indemnification</h4>
            <p>
              You agree to indemnify, defend, and hold harmless 1SYX and its officers, directors, employees, agents, and successors from and against any claims, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Website, violation of these Terms, or violation of any applicable law.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">9. Third-Party Links and Content</h4>
            <p>
              The Website may contain links to third-party websites that are not controlled by us. We are not responsible for the content, accuracy, legality, or practices of third-party websites. Your use of third-party websites is at your own risk.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">10. Data Collection and Privacy</h4>
            <p>
              Your use of the Website involves the collection and processing of personal data as described in our separate Privacy Policy. By using the Website, you consent to the collection and processing of your personal data as outlined in the Privacy Policy.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">11. Compliance with Laws</h4>
            <p>
              These Terms are governed by and construed in accordance with the laws of India (including DPDP Act 2023), United States (including CCPA/CPRA), and European Union (including GDPR). You agree to comply with all applicable laws and regulations in your jurisdiction.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">12. Dispute Resolution</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>India:</strong> Governed by laws of India; non-exclusive jurisdiction of courts in India.</li>
              <li><strong>United States:</strong> Governed by laws of California and US federal laws; exclusive jurisdiction of courts in California.</li>
              <li><strong>European Union:</strong> Governed by laws of Ireland (or relevant EU member state); right to lodge complaints with local data protection authority.</li>
            </ul>
            <p className="mt-2">
              Before initiating formal proceedings, both parties agree to attempt to resolve disputes informally through good faith negotiation.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">13. Termination</h4>
            <p>
              We reserve the right to terminate or suspend your access to the Website and Services at any time, with or without cause, and with or without notice.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">14. Survival</h4>
            <p>
              Sections that by their nature should survive termination shall survive any termination of these Terms.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">15. Severability</h4>
            <p>
              If any provision of these Terms is found to be invalid, unlawful, or unenforceable, such provision shall be modified to the minimum extent necessary or severed, and the remaining provisions shall continue in full force and effect.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">16. Entire Agreement</h4>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding the Website and Services.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">17. Waiver</h4>
            <p>
              Our failure to enforce any right or provision of these Terms does not constitute a waiver of such right or provision.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-base mb-2">18. Contact Us</h4>
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
            <ul className="list-none space-y-1 mt-1">
              <li>Email: <a href="mailto:contact@1syxai.com" className="text-accent hover:underline">contact@1syxai.com</a></li>
              <li>Website: <a href="https://www.1syxai.com" className="text-accent hover:underline">https://www.1syxai.com</a></li>
            </ul>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <h4 className="font-bold text-white text-sm mb-2">Regulatory Compliance Addendum</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-400">
              <div>
                <strong className="text-zinc-300 block mb-1">India (DPDP Act)</strong>
                Consent-based processing, right to access/correct/delete, secure storage.
              </div>
              <div>
                <strong className="text-zinc-300 block mb-1">USA (CCPA/CPRA)</strong>
                Right to know/delete, opt-out of sale/sharing, non-discrimination.
              </div>
              <div>
                <strong className="text-zinc-300 block mb-1">EU (GDPR)</strong>
                Explicit consent, comprehensive data rights, standard contractual clauses.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 text-center">
             <p className="text-xs text-zinc-500">© 2025 1SYX. All rights reserved.</p>
          </div>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t border-zinc-800">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
