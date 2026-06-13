import { AlertTriangle, FileText, Mail, Scale } from 'lucide-react';

const LAST_UPDATED = 'June 12, 2026';

const TermsOfService = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center">
          <Scale className="mr-3 h-8 w-8 text-emerald-600" />
          <h1 className="font-bold text-3xl text-gray-900">Terms of Service</h1>
        </div>
        <p className="mb-8 text-gray-500 text-sm">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p>
            Welcome to My Tax Calculator. By accessing or using this website, you agree to be bound
            by these Terms of Service. If you do not agree with any part of these terms, please do
            not use the site.
          </p>

          <section>
            <div className="mb-3 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-emerald-600" />
              <h2 className="font-bold text-gray-900 text-xl">Use of the Service</h2>
            </div>
            <p>
              My Tax Calculator provides a free online tool to estimate income tax in Pakistan based
              on FBR tax slabs, along with informational guides. You may use the service for
              personal, non-commercial purposes. You agree not to misuse the site, attempt to
              disrupt its operation, or use it for any unlawful purpose.
            </p>
          </section>

          <section>
            <div className="mb-3 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
              <h2 className="font-bold text-gray-900 text-xl">No Professional Advice</h2>
            </div>
            <p>
              The calculations and information provided are for{' '}
              <strong>general guidance and estimation purposes only</strong> and do not constitute
              professional tax, legal, or financial advice. Tax laws change frequently and
              individual circumstances vary. Always verify figures with the Federal Board of Revenue
              (FBR) and consult a qualified tax professional before making decisions or filing your
              return.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-bold text-gray-900 text-xl">Accuracy &amp; Availability</h2>
            <p>
              We make reasonable efforts to keep tax slabs and content up to date, but we do not
              warrant that the information is complete, accurate, or current at all times. The
              service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, and we may modify or discontinue features without notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-bold text-gray-900 text-xl">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, My Tax Calculator and its operators shall not
              be liable for any loss or damage arising from your reliance on calculations or
              information provided by the site, including penalties, interest, or miscalculated tax
              liabilities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-bold text-gray-900 text-xl">Intellectual Property</h2>
            <p>
              The design, text, and original content of this website are the property of My Tax
              Calculator. You may not reproduce or redistribute substantial portions of the site
              without permission. Tax slab figures and statutory references are public information
              sourced from the FBR.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-bold text-gray-900 text-xl">Changes to These Terms</h2>
            <p>
              We may revise these Terms of Service at any time. Continued use of the site after
              changes are posted constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="mb-2 flex items-center">
              <Mail className="mr-2 h-5 w-5 text-emerald-600" />
              <h2 className="font-bold text-emerald-900 text-lg">Contact Us</h2>
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
