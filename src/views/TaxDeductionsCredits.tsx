import Link from 'next/link';

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Briefcase,
  GraduationCap,
  Heart,
  HomeIcon,
  Info,
  PiggyBank,
  ShieldCheck,
} from 'lucide-react';

import Divider from '@/components/guide/Divider';
import GuideCard from '@/components/guide/GuideCard';
import SectionHeading from '@/components/guide/SectionHeading';
import SubHeading from '@/components/guide/SubHeading';

const TaxDeductionsCredits = () => {
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
              <h1 className="font-bold text-3xl text-gray-900">Tax Deductions & Credits</h1>
            </div>
            <p className="mb-6 text-gray-600 text-lg">
              Discover potential tax deductions and credits available for Pakistani taxpayers to
              reduce your overall tax liability.
            </p>

            <div className="mb-10 flex items-start gap-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-7 shadow">
              <PiggyBank className="mt-1 h-10 w-10 flex-shrink-0 text-emerald-600" />
              <div>
                <h2 className="mb-2 flex items-center gap-2 font-extrabold text-2xl text-emerald-800">
                  Why Deductions & Credits Matter
                </h2>
                <p className="mb-4 text-base text-emerald-900">
                  Claiming all eligible deductions and credits can significantly reduce your tax
                  bill and increase your savings:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-emerald-900">
                    <PiggyBank className="mr-2 h-5 w-5 text-emerald-500" />
                    Save thousands of rupees each year
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <PiggyBank className="mr-2 h-5 w-5 text-emerald-500" />
                    Lower your taxable income and tax liability
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <PiggyBank className="mr-2 h-5 w-5 text-emerald-500" />
                    Support your financial goals and investments
                  </li>
                  <li className="flex items-center text-emerald-900">
                    <PiggyBank className="mr-2 h-5 w-5 text-emerald-500" />
                    Stay compliant and avoid missing out on benefits
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <SectionHeading icon={<Info className="h-6 w-6" />}>
            Understanding Tax Deductions and Credits
          </SectionHeading>
          <p className="mb-4 text-gray-700">
            In Pakistan, various tax reliefs are available to reduce your taxable income and
            ultimately lower your tax liability. Taking advantage of these deductions and credits
            can result in significant tax savings.
          </p>

          <GuideCard color="emerald">
            <PiggyBank className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-emerald-600" />
            <div>
              <span className="font-semibold text-emerald-800">Why Deductions Matter</span>
              <p className="mt-1">
                Properly claiming all eligible deductions and credits can potentially save you
                thousands of rupees each year. Always keep proper documentation to support your
                claims in case of an audit.
              </p>
            </div>
          </GuideCard>

          <Divider />

          <SectionHeading icon={<Briefcase className="h-6 w-6" />}>
            Key Tax Deductions for Individuals
          </SectionHeading>
          <div className="my-8 space-y-8">
            <GuideCard color="blue">
              <Briefcase className="mt-1 mr-4 h-6 w-6 text-blue-600" />
              <div>
                <span className="font-semibold text-blue-800">Zakat Deduction</span>
                <p className="mb-2 text-gray-700">
                  Zakat paid under the Zakat and Ushr Ordinance is fully deductible from your total
                  income. This is one of the most significant deductions available to Muslim
                  taxpayers.
                </p>
                <div className="mb-1 rounded-md bg-gray-50 p-3 text-sm">
                  <strong>Documentation required:</strong> Receipt of Zakat payment, bank statement
                  showing Zakat deduction.
                </div>
              </div>
            </GuideCard>
            <GuideCard color="blue">
              <ShieldCheck className="mt-1 mr-4 h-6 w-6 text-blue-600" />
              <div>
                <span className="font-semibold text-blue-800">Insurance Premium Deduction</span>
                <p className="mb-2 text-gray-700">
                  Premiums paid for health and life insurance policies are deductible up to 5% of
                  your taxable income or PKR 150,000, whichever is lower.
                </p>
                <div className="mb-1 rounded-md bg-gray-50 p-3 text-sm">
                  <strong>Documentation required:</strong> Insurance policy documents, premium
                  payment receipts.
                </div>
              </div>
            </GuideCard>
            <GuideCard color="blue">
              <HomeIcon className="mt-1 mr-4 h-6 w-6 text-blue-600" />
              <div>
                <span className="font-semibold text-blue-800">Home Loan Interest</span>
                <p className="mb-2 text-gray-700">
                  Interest paid on a housing loan for the construction or purchase of a house can be
                  deducted up to 50% of taxable income or PKR 2 million, whichever is lower.
                </p>
                <div className="mb-1 rounded-md bg-gray-50 p-3 text-sm">
                  <strong>Documentation required:</strong> Loan agreement, interest payment
                  certificates, bank statements.
                </div>
              </div>
            </GuideCard>
            <GuideCard color="blue">
              <GraduationCap className="mt-1 mr-4 h-6 w-6 text-blue-600" />
              <div>
                <span className="font-semibold text-blue-800">Education Expenses</span>
                <p className="mb-2 text-gray-700">
                  Tuition fees paid for education (yours or your children's) to recognized
                  educational institutions can be deducted up to 5% of your taxable income or PKR
                  60,000 per child, whichever is lower.
                </p>
                <div className="mb-1 rounded-md bg-gray-50 p-3 text-sm">
                  <strong>Documentation required:</strong> Fee receipts, enrollment confirmation
                  from educational institutions.
                </div>
              </div>
            </GuideCard>
            <GuideCard color="blue">
              <Heart className="mt-1 mr-4 h-6 w-6 text-blue-600" />
              <div>
                <span className="font-semibold text-blue-800">Charitable Donations</span>
                <p className="mb-2 text-gray-700">
                  Donations to approved nonprofit organizations, charitable institutions, and
                  government relief funds are tax deductible. The deduction allowed is generally 30%
                  of taxable income for individuals.
                </p>
                <div className="mb-1 rounded-md bg-gray-50 p-3 text-sm">
                  <strong>Documentation required:</strong> Donation receipts from approved
                  organizations with NTN or tax exemption certificate.
                </div>
              </div>
            </GuideCard>
          </div>

          <Divider />

          <SectionHeading icon={<Info className="h-6 w-6" />}>Tax Credits</SectionHeading>
          <p className="mb-4 text-gray-700">
            In addition to deductions, Pakistan offers several tax credits that directly reduce the
            amount of tax you owe:
          </p>

          <SubHeading>Investment Tax Credit</SubHeading>
          <p className="mb-2 text-gray-700">
            A tax credit of up to 20% is available for investments in:
          </p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            <li>Shares of public companies listed on the Pakistan Stock Exchange</li>
            <li>Mutual funds</li>
            <li>Life insurance policies with a minimum 2-year term</li>
            <li>Approved pension funds</li>
          </ul>
          <p className="mb-4 text-gray-700">
            The maximum investment eligible for this credit is limited to PKR 2 million per year.
          </p>

          <SubHeading>Senior Citizen Tax Credit</SubHeading>
          <p className="mb-4 text-gray-700">
            Individuals aged 60 years or above with an annual income of up to PKR 1 million are
            entitled to a 50% tax reduction.
          </p>

          <SubHeading>Disabled Person Tax Credit</SubHeading>
          <p className="mb-4 text-gray-700">
            Persons with disabilities holding a National Special Person's Certificate are eligible
            for a tax reduction of 75% on their income up to PKR 1 million.
          </p>

          <Divider />

          <SectionHeading icon={<Info className="h-6 w-6" />}>Special Provisions</SectionHeading>
          <p className="mb-2 text-gray-700">
            Pakistan's tax law provides special provisions for certain categories of taxpayers:
          </p>
          <ul className="mb-4 list-disc pl-6 text-gray-700">
            <li>
              <span className="font-semibold">Women entrepreneurs:</span> Women operating small
              businesses with an annual turnover of less than PKR 100 million may be eligible for a
              reduced tax rate.
            </li>
            <li>
              <span className="font-semibold">Freelancers:</span> Individuals providing freelance
              services have special tax provisions and may be eligible for reduced rates on
              foreign-source income.
            </li>
            <li>
              <span className="font-semibold">Startup businesses:</span> Qualifying technology-based
              startups are exempt from income tax for the first three years of operation.
            </li>
          </ul>

          <GuideCard color="amber">
            <AlertTriangle className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-amber-600" />
            <div>
              <span className="font-semibold text-amber-800">Important Notes</span>
              <ul className="mt-2 space-y-2 text-amber-800">
                <li>
                  All deductions and credits require proper documentation and should be claimed on
                  your income tax return.
                </li>
                <li>
                  Tax laws change frequently, so consult with a tax professional or refer to the FBR
                  website for the most current information.
                </li>
                <li>False claims can result in penalties and interest charges.</li>
              </ul>
            </div>
          </GuideCard>

          <Divider />

          <SectionHeading>Maximizing Your Tax Benefits</SectionHeading>
          <p className="mb-2 text-gray-700">
            To make the most of available tax deductions and credits:
          </p>
          <ol className="mb-4 list-decimal pl-6 text-gray-700">
            <li>
              <span className="font-semibold">Plan ahead:</span> Make strategic financial decisions
              before the end of the tax year.
            </li>
            <li>
              <span className="font-semibold">Keep records:</span> Maintain detailed records of all
              expenses that may qualify for deductions.
            </li>
            <li>
              <span className="font-semibold">Consult a professional:</span> Consider hiring a tax
              advisor for personalized advice.
            </li>
            <li>
              <span className="font-semibold">File on time:</span> Late filing may limit your
              ability to claim certain deductions.
            </li>
          </ol>

          <Divider />

          <SectionHeading>Next Steps</SectionHeading>
          <p className="mb-2 text-gray-700">
            Now that you understand the available tax deductions and credits, learn more about:
          </p>
          <ul className="mb-4 list-disc pl-6 text-emerald-700">
            <li>
              <Link
                href="/tax-guides/understanding-tax-system"
                className="text-emerald-600 underline"
              >
                Understanding Pakistan's Tax System
              </Link>{' '}
              - Learn the basics
            </li>
            <li>
              <Link href="/tax-guides/filing-tax-return" className="text-emerald-600 underline">
                Filing Your Tax Return
              </Link>{' '}
              - Step-by-step guide to claiming your deductions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaxDeductionsCredits;
