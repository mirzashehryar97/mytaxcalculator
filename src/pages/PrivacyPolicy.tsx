import { Shield, Lock, Cookie, Mail } from 'lucide-react';

const LAST_UPDATED = 'June 12, 2026';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-2">
          <Shield className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
        <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            My Tax Calculator (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your
            privacy. This Privacy Policy explains how our website handles information when you use our
            Pakistan income tax calculator and related guides.
          </p>

          <section>
            <div className="flex items-center mb-3">
              <Lock className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Your Calculations Stay on Your Device</h2>
            </div>
            <p>
              All tax calculations are performed locally in your web browser. The salary figures and
              fiscal years you enter are <strong>never sent to, stored on, or processed by our servers</strong>.
              When you close or refresh the page, that data is gone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Information We Do Not Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not require you to create an account or log in.</li>
              <li>We do not ask for your name, CNIC, email, or any personal identifiers to use the calculator.</li>
              <li>We do not store the income or tax amounts you calculate.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <Cookie className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Analytics &amp; Cookies</h2>
            </div>
            <p>
              We use privacy-friendly, aggregated analytics to understand general usage trends (such as
              which pages are most visited) so we can improve the site. This data is anonymized and is not
              used to identify individual visitors. We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Links</h2>
            <p>
              Our guides link to external resources such as the Federal Board of Revenue (FBR) and the IRIS
              portal. We are not responsible for the content or privacy practices of those websites. Please
              review their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page
              with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
            <div className="flex items-center mb-2">
              <Mail className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-lg font-bold text-emerald-900">Contact Us</h2>
            </div>
            <p className="text-emerald-800">
              If you have any questions about this Privacy Policy, you can reach us at{' '}
              <a href="mailto:info@mytaxcalculator.pk" className="font-medium underline">
                info@mytaxcalculator.pk
              </a>
              .
            </p>
          </section>

          <p className="text-sm text-gray-500 border-t border-gray-100 pt-6">
            Disclaimer: My Tax Calculator is an independent tool and is not affiliated with, endorsed by, or
            operated by the Federal Board of Revenue (FBR) or the Government of Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
