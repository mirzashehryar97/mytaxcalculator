import { Cookie, Lock, Mail, Shield } from 'lucide-react';

const LAST_UPDATED = 'June 12, 2026';

const PrivacyPolicy = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center">
          <Shield className="mr-3 h-8 w-8 text-emerald-600" />
          <h1 className="font-bold text-3xl text-gray-900">Privacy Policy</h1>
        </div>
        <p className="mb-8 text-gray-500 text-sm">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            My Tax Calculator (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is
            committed to protecting your privacy. This Privacy Policy explains how our website
            handles information when you use our Pakistan income tax calculator and related guides.
          </p>

          <section>
            <div className="mb-3 flex items-center">
              <Lock className="mr-2 h-5 w-5 text-emerald-600" />
              <h2 className="font-bold text-gray-900 text-xl">
                Your Calculations Stay on Your Device
              </h2>
            </div>
            <p>
              All tax calculations are performed locally in your web browser. The salary figures and
              fiscal years you enter are{' '}
              <strong>never sent to, stored on, or processed by our servers</strong>. When you close
              or refresh the page, that data is gone.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-bold text-gray-900 text-xl">Information We Do Not Collect</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>We do not require you to create an account or log in.</li>
              <li>
                We do not ask for your name, CNIC, email, or any personal identifiers to use the
                calculator.
              </li>
              <li>We do not store the income or tax amounts you calculate.</li>
            </ul>
          </section>

          <section>
            <div className="mb-3 flex items-center">
              <Cookie className="mr-2 h-5 w-5 text-emerald-600" />
              <h2 className="font-bold text-gray-900 text-xl">Analytics &amp; Cookies</h2>
            </div>
            <p>
              We use privacy-friendly, aggregated analytics to understand general usage trends (such
              as which pages are most visited) so we can improve the site. This data is anonymized
              and is not used to identify individual visitors. We do not sell your data to third
              parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-bold text-gray-900 text-xl">Third-Party Links</h2>
            <p>
              Our guides link to external resources such as the Federal Board of Revenue (FBR) and
              the IRIS portal. We are not responsible for the content or privacy practices of those
              websites. Please review their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-bold text-gray-900 text-xl">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-2 flex items-center">
              <Mail className="mr-2 h-5 w-5 text-emerald-600" />
              <h2 className="font-bold text-emerald-900 text-lg">Contact Us</h2>
            </div>
            <p className="text-emerald-800">
              If you have any questions about this Privacy Policy, you can reach us at{' '}
              <a href="mailto:info@mytaxcalculator.pk" className="font-medium underline">
                info@mytaxcalculator.pk
              </a>
              .
            </p>
          </section>

          <p className="border-gray-100 border-t pt-6 text-gray-500 text-sm">
            Disclaimer: My Tax Calculator is an independent tool and is not affiliated with,
            endorsed by, or operated by the Federal Board of Revenue (FBR) or the Government of
            Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
