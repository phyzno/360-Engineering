import { Metadata } from "next";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Privacy Policy | 360 Engineering and Consultancy",
  description: "Privacy policy and data protection guidelines for 360 Engineering and Consultancy.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageTransition>
    <div className="hero-padding min-h-screen">
      <div className="container-wide max-w-4xl mx-auto">
        <h1 className="font-heading text-h1 text-[var(--color-neutral-900)] mb-12">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-gray-500 text-lg leading-relaxed">
          <p>
            Last updated: September 13, 2025
          </p>
          
          <p>
            At 360 Engineering and Consultancy, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy will inform you as to how we look after your personal data when you visit our website 
            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[var(--color-brand-500)] mb-6">1. Information We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-[var(--color-neutral-900)]">Identity Data</strong> includes first name, maiden name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
              <li><strong className="text-[var(--color-neutral-900)]">Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong className="text-[var(--color-neutral-900)]">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[var(--color-brand-500)] mb-6">2. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[var(--color-brand-500)] mb-6">3. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-heading text-h3 text-[var(--color-brand-500)] mb-6">4. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:group360bd@gmail.com" className="text-[var(--color-brand-500)] hover:text-[#e2cb8a] transition-colors">group360bd@gmail.com</a><br />
              Phone: +8801335224360<br />
              Address: 102/1 west Agargaon, Dhaka 1207, Bangladesh
            </p>
          </section>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
