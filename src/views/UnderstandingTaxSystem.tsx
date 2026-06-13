import Link from 'next/link';

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calculator,
  Calendar,
  DollarSign,
  FileText,
  Info,
} from 'lucide-react';

import Divider from '@/components/guide/Divider';
import GuideCard from '@/components/guide/GuideCard';
import SectionHeading from '@/components/guide/SectionHeading';
import SubHeading from '@/components/guide/SubHeading';

const UnderstandingTaxSystem = () => {
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
              <h1 className="font-bold text-3xl text-gray-900">
                Understanding Pakistan's Tax System
              </h1>
            </div>
            <p className="mb-6 text-gray-600 text-lg">
              Learn the basics of Pakistan's tax system, including income tax brackets, filing
              requirements, and important deadlines.
            </p>

            <div className="mb-10 flex items-start gap-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-7 shadow">
              <Info className="mt-1 h-10 w-10 flex-shrink-0 text-emerald-600" />
              <div>
                <h2 className="mb-2 flex items-center gap-2 font-extrabold text-2xl text-emerald-800">
                  Why Understanding the Tax System Matters
                </h2>
                <p className="mb-4 text-base text-emerald-900">
                  Knowing how the tax system works helps you stay compliant, avoid penalties, and
                  make the most of your finances:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-emerald-900">
                    <Info className="mr-2 h-5 w-5 text-emerald-500" />
                    Avoid unnecessary penalties and legal issues
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <Info className="mr-2 h-5 w-5 text-emerald-500" />
                    Maximize your eligible deductions and credits
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <Info className="mr-2 h-5 w-5 text-emerald-500" />
                    Contribute to national development through proper compliance
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <Info className="mr-2 h-5 w-5 text-emerald-500" />
                    Access financial services and benefits
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <SectionHeading icon={<Info className="h-6 w-6" />}>
            Introduction to Pakistan's Tax System
          </SectionHeading>
          <p className="mb-4 text-gray-700">
            Pakistan's tax system is administered by the Federal Board of Revenue (FBR) and consists
            of various direct and indirect taxes. For individuals, income tax is the most
            significant direct tax, while sales tax (GST) is the primary indirect tax.
          </p>

          <GuideCard color="emerald">
            <DollarSign className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <span className="font-semibold text-emerald-800">Why Taxes Matter</span>
              <p className="mt-1">
                Taxes are crucial for funding government services, infrastructure, healthcare,
                education, and national defense. Proper compliance ensures you avoid penalties while
                contributing to national development.
              </p>
            </div>
          </GuideCard>

          <Divider />

          <SectionHeading icon={<Calculator className="h-6 w-6" />}>
            Income Tax Structure
          </SectionHeading>
          <p className="mb-4 text-gray-700">
            In Pakistan, income tax is calculated on a progressive slab system, meaning higher
            income levels are taxed at higher rates. The tax year in Pakistan runs from July 1st to
            June 30th.
          </p>

          <SubHeading>Tax Residency Status</SubHeading>
          <p className="mb-2 text-gray-700">Your tax liability depends on your residency status:</p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            <li>
              <span className="font-semibold">Resident:</span> An individual who stays in Pakistan
              for 183 days or more in a tax year. Residents are taxed on worldwide income.
            </li>
            <li>
              <span className="font-semibold">Non-resident:</span> An individual who stays in
              Pakistan for less than 183 days in a tax year. Non-residents are taxed only on
              Pakistan-source income.
            </li>
          </ul>

          <Divider />

          <SectionHeading icon={<Calculator className="h-6 w-6" />}>
            Income Tax Slabs (FY 2026-2027)
          </SectionHeading>
          <p className="mb-4 text-gray-700">
            Below are the current income tax slabs for salaried individuals in Pakistan for the
            fiscal year 2026-2027:
          </p>
          <div className="mb-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Income Range (PKR)
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Tax Rate
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                    Additional Fixed Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">0 - 600,000</td>
                  <td className="whitespace-nowrap px-6 py-4">0%</td>
                  <td className="whitespace-nowrap px-6 py-4">0</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">600,001 - 1,200,000</td>
                  <td className="whitespace-nowrap px-6 py-4">1%</td>
                  <td className="whitespace-nowrap px-6 py-4">0</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">1,200,001 - 2,200,000</td>
                  <td className="whitespace-nowrap px-6 py-4">11%</td>
                  <td className="whitespace-nowrap px-6 py-4">6,000</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">2,200,001 - 3,200,000</td>
                  <td className="whitespace-nowrap px-6 py-4">20%</td>
                  <td className="whitespace-nowrap px-6 py-4">116,000</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">3,200,001 - 4,100,000</td>
                  <td className="whitespace-nowrap px-6 py-4">25%</td>
                  <td className="whitespace-nowrap px-6 py-4">316,000</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">4,100,001 - 5,600,000</td>
                  <td className="whitespace-nowrap px-6 py-4">29%</td>
                  <td className="whitespace-nowrap px-6 py-4">541,000</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">5,600,001 - 7,000,000</td>
                  <td className="whitespace-nowrap px-6 py-4">32%</td>
                  <td className="whitespace-nowrap px-6 py-4">976,000</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">7,000,001 and above</td>
                  <td className="whitespace-nowrap px-6 py-4">35%</td>
                  <td className="whitespace-nowrap px-6 py-4">1,424,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <GuideCard color="emerald">
            <Info className="mr-3 h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <span className="font-semibold text-emerald-800">Budget 2025-26 vs 2026-27:</span> See
              our{' '}
              <Link
                href="/budget-2025-26-vs-2026-27"
                className="font-medium text-emerald-700 underline"
              >
                complete salaried tax comparison
              </Link>{' '}
              with slab tables, surcharge changes, and example savings.
            </div>
          </GuideCard>

          <GuideCard color="blue">
            <Calculator className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div>
              <span className="font-semibold text-blue-800">Tip:</span> Use our{' '}
              <Link href="/" className="text-blue-600 underline">
                Tax Calculator
              </Link>{' '}
              to quickly determine your tax liability based on your income.
            </div>
          </GuideCard>

          <Divider />

          <SectionHeading icon={<FileText className="h-6 w-6" />}>
            Types of Taxable Income
          </SectionHeading>
          <p className="mb-2 text-gray-700">
            In Pakistan, income is categorized into the following heads:
          </p>
          <ol className="mb-4 list-decimal pl-6 text-gray-700">
            <li>
              <span className="font-semibold">Salary:</span> Income from employment
            </li>
            <li>
              <span className="font-semibold">Business:</span> Income from business activities
            </li>
            <li>
              <span className="font-semibold">Property:</span> Rental income from property
            </li>
            <li>
              <span className="font-semibold">Capital Gains:</span> Profits from the sale of assets
            </li>
            <li>
              <span className="font-semibold">Other Sources:</span> Income from dividends, interest,
              etc.
            </li>
          </ol>

          <Divider />

          <SectionHeading icon={<Info className="h-6 w-6" />}>Filing Requirements</SectionHeading>
          <p className="mb-2 text-gray-700">
            You are required to file a tax return in Pakistan if:
          </p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            <li>Your annual income exceeds PKR 600,000</li>
            <li>You own a vehicle with an engine capacity of 1000cc or more</li>
            <li>You own immovable property with a land area of 500 sq. yards or more</li>
            <li>You are a professional, such as a doctor, lawyer, accountant, etc.</li>
            <li>You have foreign income or assets</li>
          </ul>

          <Divider />

          <SectionHeading icon={<Calendar className="h-6 w-6 text-amber-600" />}>
            Important Tax Deadlines
          </SectionHeading>
          <GuideCard color="amber">
            <div>
              <span className="font-semibold text-amber-800">Key Dates to Remember</span>
              <ul className="mt-2 list-none space-y-2 pl-0 text-amber-800">
                <li className="flex items-center">
                  <span className="w-40 font-medium">September 30</span>
                  <span>Deadline for filing income tax returns for salaried individuals</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">December 31</span>
                  <span>Deadline for filing income tax returns for businesses</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">15th of each month</span>
                  <span>Deadline for monthly withholding tax payments</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">July 15</span>
                  <span>Deadline for quarterly advance tax payments</span>
                </li>
              </ul>
            </div>
          </GuideCard>

          <Divider />

          <SectionHeading icon={<AlertTriangle className="h-6 w-6 text-amber-600" />}>
            Penalties for Non-Compliance
          </SectionHeading>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            <li>
              Penalty for late filing: PKR a minimum of PKR 40,000 or up to 0.1% of the tax payable
              for each day of default
            </li>
            <li>Penalty for concealment: Up to 200% of the tax evaded</li>
            <li>Default surcharge: 12% per annum on unpaid taxes</li>
          </ul>

          <Divider />

          <SectionHeading>Next Steps</SectionHeading>
          <p className="mb-2 text-gray-700">
            Now that you understand the basics of Pakistan's tax system, you might be interested in
            learning about:
          </p>
          <ul className="mb-4 list-disc pl-6 text-emerald-700">
            <li>
              <Link href="/tax-guides/deductions-credits" className="text-emerald-600 underline">
                Tax Deductions & Credits
              </Link>{' '}
              - Reduce your tax liability
            </li>
            <li>
              <Link href="/tax-guides/filing-tax-return" className="text-emerald-600 underline">
                Filing Your Tax Return
              </Link>{' '}
              - Step-by-step guide
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingTaxSystem;
