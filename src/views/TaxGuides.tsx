import Link from 'next/link';

import { AlertTriangle, ArrowRight, Download, ExternalLink, FileText, Info } from 'lucide-react';

const TaxGuides = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-extrabold text-3xl text-gray-900 sm:text-4xl">
            Pakistani Tax Guides & Resources
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-gray-600 text-lg">
            Learn more about Pakistan's tax system, filing requirements, and strategies to optimize
            your tax planning.
          </p>
        </div>

        <div className="mb-12 rounded-lg bg-blue-50 p-6">
          <div className="flex items-start">
            <Info className="mt-0.5 mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="font-medium text-blue-900 text-lg">Disclaimer</h3>
              <p className="mt-2 text-blue-700 text-sm">
                This information is provided for general guidance only and should not be considered
                as professional tax advice. Tax laws change frequently, and we recommend consulting
                with a qualified tax professional for advice specific to your situation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Tax Guide Card 1 */}
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900 text-lg">
                Understanding Pakistan's Tax System
              </h3>
              <p className="mb-4 text-gray-600">
                Learn the basics of Pakistan's tax system, including income tax brackets, filing
                requirements, and important deadlines.
              </p>
              <Link
                href="/tax-guides/understanding-tax-system"
                className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-700"
              >
                Read Guide
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Tax Guide Card 2 */}
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900 text-lg">Tax Deductions & Credits</h3>
              <p className="mb-4 text-gray-600">
                Discover potential tax deductions and credits available for Pakistani taxpayers to
                reduce your overall tax liability.
              </p>
              <Link
                href="/tax-guides/deductions-credits"
                className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-700"
              >
                Read Guide
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Tax Guide Card 3 */}
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900 text-lg">Filing Your Tax Return</h3>
              <p className="mb-4 text-gray-600">
                Step-by-step instructions on how to file your income tax return in Pakistan,
                including online filing options.
              </p>
              <Link
                href="/tax-guides/filing-tax-return"
                className="inline-flex items-center font-medium text-emerald-600 hover:text-emerald-700"
              >
                Read Guide
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 font-bold text-gray-900 text-xl">Official Resources</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4">
              <div className="flex items-center">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-base text-gray-900">
                    Federal Board of Revenue (FBR)
                  </h4>
                  <p className="text-gray-500 text-sm">Official tax authority of Pakistan</p>
                </div>
              </div>
              <a
                href="https://www.fbr.gov.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 hover:text-emerald-700"
              >
                Visit Website
              </a>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4">
              <div className="flex items-center">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-base text-gray-900">Income Tax Ordinance 2001</h4>
                  <p className="text-gray-500 text-sm">Complete tax laws of Pakistan</p>
                </div>
              </div>
              <a
                href="https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 hover:text-emerald-700"
              >
                View on FBR
              </a>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4">
              <div className="flex items-center">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-base text-gray-900">
                    FBR Tax Return Filing Portal
                  </h4>
                  <p className="text-gray-500 text-sm">E-filing system for tax returns</p>
                </div>
              </div>
              <a
                href="https://iris.fbr.gov.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 hover:text-emerald-700"
              >
                Visit Portal
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-amber-50 p-6">
          <div className="flex items-start">
            <AlertTriangle className="mt-0.5 mr-3 h-6 w-6 flex-shrink-0 text-amber-600" />
            <div>
              <h3 className="font-medium text-amber-900 text-lg">Important Dates</h3>
              <p className="mt-2 mb-4 text-amber-700 text-sm">
                Keep track of these important tax dates in Pakistan to avoid penalties:
              </p>
              <ul className="space-y-2 text-amber-800 text-sm">
                <li className="flex items-center">
                  <span className="w-32 font-medium">September 30</span>
                  <span>Deadline for filing income tax returns for salaried individuals</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">December 31</span>
                  <span>Deadline for filing income tax returns for businesses</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">15th of each month</span>
                  <span>Deadline for monthly withholding tax payments</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">July 15</span>
                  <span>Deadline for quarterly advance tax payments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxGuides;
