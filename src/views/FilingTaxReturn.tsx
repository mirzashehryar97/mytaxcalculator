import Link from 'next/link';

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  HelpCircle,
  Monitor,
} from 'lucide-react';

const FilingTaxReturn = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/tax-guides"
          className="mb-6 inline-flex items-center text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tax Guides
        </Link>

        <div className="space-y-10">
          <div>
            <div className="mb-4 flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-emerald-600" />
              <h1 className="font-bold text-3xl text-gray-900">Filing Your Tax Return</h1>
            </div>
            <p className="mb-6 text-gray-600 text-lg">
              Step-by-step instructions on how to file your income tax return in Pakistan, including
              online filing options.
            </p>

            {/* --- Why File a Tax Return? (Improved Card) --- */}
            <div className="mb-10 flex items-start gap-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-7 shadow">
              <CheckCircle className="mt-1 h-10 w-10 flex-shrink-0 text-emerald-600" />
              <div>
                <h2 className="mb-2 flex items-center gap-2 font-extrabold text-2xl text-emerald-800">
                  Why File a Tax Return?
                </h2>
                <p className="mb-4 text-base text-emerald-900">
                  Filing your tax return is not just a legal obligation but also provides several
                  benefits:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-emerald-900">
                    <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                    Avoidance of penalties and legal complications
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                    Documentation of your income and assets
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                    Eligibility for loans, visas, and other financial services
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                    Contributing to the national economy
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
                    Claiming tax refunds if you've overpaid
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-6 flex rounded-lg bg-amber-50 p-6">
              <Calendar className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="mb-2 font-medium text-amber-800 text-lg">Important Deadlines</h3>
                <p className="mt-0 mb-2 text-amber-700">
                  For salaried individuals, the deadline to file income tax returns is generally
                  September 30 following the end of the tax year (which runs from July 1 to June
                  30).
                </p>
                <p className="mt-0 text-amber-700">
                  <strong>Note:</strong> The FBR occasionally extends this deadline, so check their
                  official website for the most current information.
                </p>
              </div>
            </div>

            <h2>Before You Start: What You'll Need</h2>
            <p>
              Gather the following documents and information before beginning your tax filing
              process:
            </p>
            <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 font-medium text-gray-900">For Salaried Individuals</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>Computerized National Identity Card (CNIC)</li>
                  <li>National Tax Number (NTN) or CNIC</li>
                  <li>Salary certificates from all employers</li>
                  <li>Bank statements for all accounts</li>
                  <li>Rent receipts (if claiming housing allowance)</li>
                  <li>Proof of tax deducted at source</li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 font-medium text-gray-900">For Business Income</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>Record of all business transactions</li>
                  <li>Profit and loss statement</li>
                  <li>Balance sheet</li>
                  <li>Details of expenses and deductions</li>
                  <li>Withholding tax statements</li>
                  <li>Documentation of fixed assets</li>
                </ul>
              </div>
            </div>

            <h2>Step-by-Step Guide to Filing Your Tax Return Online</h2>
            <p>
              The FBR's IRIS (Inland Revenue Information System) portal is the official platform for
              e-filing income tax returns in Pakistan.
            </p>

            <div className="my-8 space-y-6">
              <div
                id="step1"
                className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-gray-200 border-b bg-emerald-50 p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="font-bold text-emerald-600">1</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      Register on the IRIS Portal
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <ol className="space-y-4 text-gray-600">
                    <li>
                      Visit the FBR's IRIS portal at{' '}
                      <a
                        href="https://iris.fbr.gov.pk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600"
                      >
                        https://iris.fbr.gov.pk
                      </a>
                    </li>
                    <li>Click on "Register" to create a new account</li>
                    <li>Enter your CNIC and other required personal information</li>
                    <li>
                      Create a secure password (use a combination of letters, numbers, and special
                      characters)
                    </li>
                    <li>Complete the verification process via email or SMS</li>
                  </ol>
                </div>
              </div>

              <div
                id="step2"
                className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-gray-200 border-b bg-emerald-50 p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="font-bold text-emerald-600">2</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      Log in and Access the Return Form
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <ol className="space-y-4 text-gray-600">
                    <li>Log in to your IRIS account using your credentials</li>
                    <li>From the dashboard, click on "File Income Tax Return"</li>
                    <li>Select the appropriate tax year (e.g., 2023-2024)</li>
                    <li>
                      Choose the correct return form based on your status:
                      <ul className="mt-2 space-y-2 pl-5">
                        <li>Form 114(I) for salaried individuals</li>
                        <li>Form 114(II) for business individuals</li>
                        <li>Form 114(III) for Association of Persons (AOPs)</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>

              <div
                id="step3"
                className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-gray-200 border-b bg-emerald-50 p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="font-bold text-emerald-600">3</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      Fill in Personal Information
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-gray-600">
                    Complete all mandatory fields in the personal information section:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li>Name, CNIC, and contact details</li>
                    <li>Residential address</li>
                    <li>Employment details (for salaried individuals)</li>
                    <li>Business details (for business individuals)</li>
                  </ul>
                </div>
              </div>

              <div
                id="step4"
                className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-gray-200 border-b bg-emerald-50 p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="font-bold text-emerald-600">4</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-lg">Enter Income Details</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-gray-600">
                    Report all sources of income for the tax year:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li>
                      For salaried individuals:
                      <ul className="mt-2 space-y-2 pl-5">
                        <li>Enter basic salary, allowances, bonuses, and other benefits</li>
                        <li>
                          Input details of tax withheld by your employer (refer to your salary
                          certificate)
                        </li>
                      </ul>
                    </li>
                    <li>
                      For business income:
                      <ul className="mt-2 space-y-2 pl-5">
                        <li>Enter revenue, expenses, and profits</li>
                        <li>Report details of withholding taxes paid</li>
                      </ul>
                    </li>
                    <li>
                      Other income sources (if applicable):
                      <ul className="mt-2 space-y-2 pl-5">
                        <li>Property rental income</li>
                        <li>Capital gains from investments</li>
                        <li>Interest income from bank deposits</li>
                        <li>Dividend income</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                id="step5"
                className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-gray-200 border-b bg-emerald-50 p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="font-bold text-emerald-600">5</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      Claim Deductions and Tax Credits
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-gray-600">
                    Input all eligible deductions and tax credits:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li>Zakat deductions</li>
                    <li>Charitable donations to approved organizations</li>
                    <li>Health insurance premiums</li>
                    <li>Education expenses</li>
                    <li>Investment in approved pension funds</li>
                    <li>Home loan interest payments</li>
                  </ul>
                  <div className="mt-4 rounded-lg bg-blue-50 p-4">
                    <p className="text-blue-700 text-sm">
                      <strong>Tip:</strong> See our{' '}
                      <Link
                        href="/tax-guides/deductions-credits"
                        className="text-blue-600 underline"
                      >
                        Tax Deductions & Credits
                      </Link>{' '}
                      guide for a comprehensive list of available deductions.
                    </p>
                  </div>
                </div>
              </div>

              <div
                id="step6"
                className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-gray-200 border-b bg-emerald-50 p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="font-bold text-emerald-600">6</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      Declare Assets and Liabilities
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-gray-600">
                    Provide complete details of your assets and liabilities:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li>Real estate properties</li>
                    <li>Vehicles</li>
                    <li>Bank accounts and balances</li>
                    <li>Investments in stocks, bonds, and mutual funds</li>
                    <li>Loans and mortgages</li>
                    <li>Other significant assets (jewelry, art, etc.)</li>
                  </ul>
                  <div className="mt-4 rounded-lg bg-amber-50 p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-amber-600" />
                      <p className="text-amber-700 text-sm">
                        Accurate declaration of assets is crucial. Significant discrepancies between
                        your declared income and assets may trigger an audit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="step7"
                className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-gray-200 border-b bg-emerald-50 p-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <span className="font-bold text-emerald-600">7</span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      Review, Verify, and Submit
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <ol className="space-y-4 text-gray-600">
                    <li>Review all entered information carefully for accuracy</li>
                    <li>Use the "Calculate Tax" feature to see your calculated tax liability</li>
                    <li>
                      Verify that all income sources, deductions, and assets are correctly reported
                    </li>
                    <li>
                      Make sure all supporting documents are ready (you may need to upload them)
                    </li>
                    <li>Click "Submit" to file your return</li>
                    <li>If required, pay any remaining tax due via the provided payment methods</li>
                  </ol>
                  <div className="mt-4 flex items-center rounded-lg bg-green-50 p-4">
                    <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-600" />
                    <p className="text-green-700 text-sm">
                      After submission, save a copy of your acknowledgment slip and receipt for your
                      records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Section Divider --- */}
            <hr className="my-10 border-gray-200 border-t" />

            {/* --- Alternative Filing Methods --- */}
            <div className="mb-8 flex items-start rounded-lg bg-amber-50 p-6">
              <Monitor className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <h2 className="mb-2 font-bold text-amber-800 text-xl">
                  Alternative Filing Methods
                </h2>
                <p className="mb-2 text-amber-700">
                  If you're unable to file your return online, you have these alternatives:
                </p>
                <ul className="list-disc space-y-1 pl-6 text-amber-800">
                  <li>
                    <span className="font-semibold">Tax Facilitation Centers:</span> Visit an
                    FBR-designated tax facilitation center where staff can assist you with filing
                    your return.
                  </li>
                  <li>
                    <span className="font-semibold">Tax Practitioners:</span> Hire a certified tax
                    consultant or chartered accountant to prepare and file your return.
                  </li>
                  <li>
                    <span className="font-semibold">Paper Filing:</span> In rare cases, paper-based
                    filing might be accepted at designated FBR offices.
                  </li>
                </ul>
              </div>
            </div>

            {/* --- After Filing: What Next? --- */}
            <div className="mb-8 flex items-start rounded-lg bg-emerald-50 p-6">
              <FileText className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-emerald-600" />
              <div>
                <h2 className="mb-2 font-bold text-emerald-800 text-xl">
                  After Filing: What Next?
                </h2>
                <ol className="list-decimal space-y-1 pl-6 text-emerald-800">
                  <li>
                    <span className="font-semibold">Keep documentation:</span> Store your
                    acknowledgment slip, tax calculation, and all supporting documents for at least
                    six years.
                  </li>
                  <li>
                    <span className="font-semibold">Monitor for notices:</span> Check your email and
                    IRIS account regularly for any notices from FBR.
                  </li>
                  <li>
                    <span className="font-semibold">Track refunds:</span> If you're expecting a tax
                    refund, monitor its status through your IRIS account.
                  </li>
                  <li>
                    <span className="font-semibold">Prepare for next year:</span> Start organizing
                    your documentation for the next tax year.
                  </li>
                </ol>
              </div>
            </div>

            {/* --- Need Help? --- */}
            <div className="my-8 flex items-start rounded-lg border border-blue-100 bg-blue-50 p-6">
              <HelpCircle className="mt-1 mr-4 h-7 w-7 flex-shrink-0 text-blue-600" />
              <div>
                <h3 className="mb-2 flex items-center font-bold text-blue-800 text-lg">
                  Need Help?
                </h3>
                <p className="mb-2 text-blue-700">
                  If you encounter difficulties while filing your return, you can:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li>
                    <a href="tel:080000227" className="font-medium text-blue-600 underline">
                      Contact the FBR helpline at 0800-00227
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:helpline@fbr.gov.pk"
                      className="font-medium text-blue-600 underline"
                    >
                      Email your queries to helpline@fbr.gov.pk
                    </a>
                  </li>
                  <li>
                    <span className="font-medium">Visit your nearest Regional Tax Office</span>
                  </li>
                  <li>
                    <a
                      href="https://www.fbr.gov.pk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 underline"
                    >
                      Use the chatbot on the FBR website
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* --- Common Mistakes to Avoid --- */}
            <div className="mb-8 flex items-start rounded-lg bg-red-50 p-6">
              <AlertTriangle className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-red-600" />
              <div>
                <h2 className="mb-2 font-bold text-red-700 text-xl">Common Mistakes to Avoid</h2>
                <ul className="list-disc space-y-1 pl-6 text-red-700">
                  <li>
                    <span className="font-semibold">Missing the deadline:</span> Late filing can
                    result in penalties.
                  </li>
                  <li>
                    <span className="font-semibold">Incomplete information:</span> Ensure all
                    required fields are completed.
                  </li>
                  <li>
                    <span className="font-semibold">Inaccurate reporting:</span> Double-check all
                    figures before submission.
                  </li>
                  <li>
                    <span className="font-semibold">Forgetting deductions:</span> Claiming all
                    eligible deductions can significantly reduce your tax liability.
                  </li>
                  <li>
                    <span className="font-semibold">Incorrect bank details:</span> This can delay
                    your tax refund if applicable.
                  </li>
                </ul>
              </div>
            </div>

            {/* --- Recommended Resources --- */}
            <div className="mb-2 flex items-start rounded-lg bg-gray-50 p-6">
              <CheckCircle className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-emerald-600" />
              <div>
                <h2 className="mb-2 font-bold text-emerald-700 text-xl">Recommended Resources</h2>
                <ul className="list-disc space-y-2 pl-6 text-emerald-800">
                  <li>
                    <Link
                      href="/tax-guides/understanding-tax-system"
                      className="font-medium text-emerald-600 underline"
                    >
                      Understanding Pakistan's Tax System
                    </Link>{' '}
                    <span className="text-gray-600">
                      - Learn about tax brackets and filing requirements
                    </span>
                  </li>
                  <li>
                    <Link
                      href="/tax-guides/deductions-credits"
                      className="font-medium text-emerald-600 underline"
                    >
                      Tax Deductions & Credits
                    </Link>{' '}
                    <span className="text-gray-600">- Maximize your tax savings</span>
                  </li>
                  <li>
                    <a
                      href="https://www.fbr.gov.pk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-600 underline"
                    >
                      Federal Board of Revenue (FBR)
                    </a>{' '}
                    <span className="text-gray-600">- Official tax authority website</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilingTaxReturn;
