import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DF Interiors",
  description: "Terms and conditions for using DF Interiors services and website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="hero-padding min-h-screen">
      <div className="container-wide max-w-4xl mx-auto">
        <h1 className="font-heading text-h1 text-[#f5f0e8] mb-12">
          Terms of Service
        </h1>
        
        <div className="space-y-8 text-[#9ba89e] text-lg leading-relaxed">
          <p>
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <p>
            Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the 
            df-interiors.net website (the &quot;Service&quot;) operated by DF Interiors (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
          </p>
          
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. 
            These Terms apply to all visitors, users and others who access or use the Service.
          </p>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[#c9a84c] mb-6">1. Intellectual Property</h2>
            <p>
              The Service and its original content, features and functionality are and will remain the exclusive property of 
              DF Interiors and its licensors. The Service is protected by copyright, trademark, and other laws of both 
              the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any 
              product or service without the prior written consent of DF Interiors.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[#c9a84c] mb-6">2. Links To Other Web Sites</h2>
            <p className="mb-4">
              Our Service may contain links to third-party web sites or services that are not owned or controlled by DF Interiors.
            </p>
            <p>
              DF Interiors has no control over, and assumes no responsibility for, the content, privacy policies, or practices of 
              any third party web sites or services. You further acknowledge and agree that DF Interiors shall not be responsible 
              or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use 
              of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[#c9a84c] mb-6">3. Termination</h2>
            <p>
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[#c9a84c] mb-6">4. Limitation Of Liability</h2>
            <p>
              In no event shall DF Interiors, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or 
              inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any 
              content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, 
              whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have 
              been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its 
              essential purpose.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[#c9a84c] mb-6">5. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material 
              we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change 
              will be determined at our sole discretion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
