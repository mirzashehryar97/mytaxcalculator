import { FileText, AlertTriangle, Scale, Mail } from 'lucide-react';

const LAST_UPDATED = 'June 12, 2026';

const TermsOfService = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-2">
          <Scale className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        </div>
        <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            Welcome to My Tax Calculator. By accessing or using this website, you agree to be bound by these
            Terms of Service. If you do not agree with any part of these terms, please do not use the site.
          </p>

          <section>
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Use of the Service</h2>
            </div>
            <p>
              My Tax Calculator provides a free online tool to estimate income tax in Pakistan based on
              FBR tax slabs, along with informational guides. You may use the service for personal,
              non-commercial purposes. You agree not to misuse the site, attempt to disrupt its operation,
              or use it for any unlawful purpose.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">No Professional Advice</h2>
            </div>
            <p>
              The calculations and information provided are for <strong>general guidance and estimation
              purposes only</strong> and do not constitute professional tax, legal, or financial advice. Tax
              laws change frequently and individual circumstances vary. Always verify figures with the
              Federal Board of Revenue (FBR) and consult a qualified tax professional before making decisions
              or filing your return.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Accuracy &amp; Availability</h2>
            <p>
              We make reasonable efforts to keep tax slabs and content up to date, but we do not warrant
              that the information is complete, accurate, or current at all times. The service is provided
              &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, and we may modify or discontinue
              features without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, My Tax Calculator and its operators shall not be liable
              for any loss or damage arising from your reliance on calculations or information provided by the
              site, including penalties, interest, or miscalculated tax liabilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Intellectual Property</h2>
            <p>
              The design, text, and original content of this website are the property of My Tax Calculator.
              You may not reproduce or redistribute substantial portions of the site without permission.
              Tax slab figures and statutory references are public information sourced from the FBR.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to These Terms</h2>
            <p>
              We may revise these Terms of Service at any time. Continued use of the site after changes are
              posted constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
            <div className="flex items-center mb-2">
              <Mail className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-lg font-bold text-emerald-900">Contact Us</h2>
            </div>
            <p className="text-emerald-800">
              Questions about these terms? Email us at{' '}
              <a href="mailto:info@mytaxcalculator.pk" className="font-medium underline">
                info@mytaxcalculator.pk
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
