import React from 'react';
import { ArrowLeft, BookOpen, Calculator, Calendar, DollarSign, Info, AlertTriangle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionHeading = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center mt-12 mb-4">
    {icon && <span className="mr-2 text-emerald-600">{icon}</span>}
    <h2 className="text-2xl font-bold text-emerald-700 tracking-tight border-l-4 border-emerald-200 pl-3">{children}</h2>
  </div>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold text-emerald-800 mt-8 mb-2">{children}</h3>
);

const Divider = () => <hr className="my-10 border-t border-gray-200" />;

const Card = ({ children, color = 'emerald' }: { children: React.ReactNode; color?: 'emerald' | 'amber' | 'blue' }) => {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-800',
    blue: 'bg-blue-50 text-blue-800',
  };
  return <div className={`rounded-lg p-6 my-6 flex items-start ${colorMap[color]}`}>{children}</div>;
};

const UnderstandingTaxSystem = () => {
  return (
    <div className="bg-white backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link to="/tax-guides" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tax Guides
        </Link>

        <div className="space-y-10">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-emerald-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Understanding Pakistan's Tax System</h1>
            </div>
            <p className="text-gray-600 text-lg mb-6">
              Learn the basics of Pakistan's tax system, including income tax brackets, filing requirements, and important deadlines.
            </p>

            <div className="bg-emerald-50 border border-emerald-100 p-7 rounded-2xl flex items-start gap-5 shadow mb-10">
              <Info className="h-10 w-10 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-extrabold text-emerald-800 mb-2 flex items-center gap-2">Why Understanding the Tax System Matters</h2>
                <p className="text-emerald-900 mb-4 text-base">Knowing how the tax system works helps you stay compliant, avoid penalties, and make the most of your finances:</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-emerald-900"><Info className="h-5 w-5 text-emerald-500 mr-2" />Avoid unnecessary penalties and legal issues</li>
                  <li className="flex items-center text-emerald-900"><Info className="h-5 w-5 text-emerald-500 mr-2" />Maximize your eligible deductions and credits</li>
                  <li className="flex items-center text-emerald-900"><Info className="h-5 w-5 text-emerald-500 mr-2" />Contribute to national development through proper compliance</li>
                  <li className="flex items-center text-emerald-900"><Info className="h-5 w-5 text-emerald-500 mr-2" />Access financial services and benefits</li>
                </ul>
              </div>
            </div>
          </div>

          <SectionHeading icon={<Info className="h-6 w-6" />}>Introduction to Pakistan's Tax System</SectionHeading>
          <p className="text-gray-700 mb-4">
            Pakistan's tax system is administered by the Federal Board of Revenue (FBR) and consists of various direct and indirect taxes. 
            For individuals, income tax is the most significant direct tax, while sales tax (GST) is the primary indirect tax.
          </p>

          <Card color="emerald">
            <DollarSign className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold text-emerald-800">Why Taxes Matter</span>
              <p className="mt-1">
                Taxes are crucial for funding government services, infrastructure, healthcare, education, and national defense. 
                Proper compliance ensures you avoid penalties while contributing to national development.
              </p>
            </div>
          </Card>

          <Divider />

          <SectionHeading icon={<Calculator className="h-6 w-6" />}>Income Tax Structure</SectionHeading>
          <p className="text-gray-700 mb-4">
            In Pakistan, income tax is calculated on a progressive slab system, meaning higher income levels are taxed at higher rates. 
            The tax year in Pakistan runs from July 1st to June 30th.
          </p>

          <SubHeading>Tax Residency Status</SubHeading>
          <p className="text-gray-700 mb-2">Your tax liability depends on your residency status:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><span className="font-semibold">Resident:</span> An individual who stays in Pakistan for 183 days or more in a tax year. Residents are taxed on worldwide income.</li>
            <li><span className="font-semibold">Non-resident:</span> An individual who stays in Pakistan for less than 183 days in a tax year. Non-residents are taxed only on Pakistan-source income.</li>
          </ul>

          <Divider />

          <SectionHeading icon={<Calculator className="h-6 w-6" />}>Income Tax Slabs (FY 2024-2025)</SectionHeading>
          <p className="text-gray-700 mb-4">
            Below are the current income tax slabs for salaried individuals in Pakistan for the fiscal year 2024-2025:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Income Range (PKR)</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Tax Rate</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Additional Fixed Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">0 - 600,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">0%</td>
                  <td className="px-6 py-4 whitespace-nowrap">0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">600,001 - 1,200,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">5%</td>
                  <td className="px-6 py-4 whitespace-nowrap">0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">1,200,001 - 2,200,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">15%</td>
                  <td className="px-6 py-4 whitespace-nowrap">30,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">2,200,001 - 3,200,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">25%</td>
                  <td className="px-6 py-4 whitespace-nowrap">180,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">3,200,001 - 4,100,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">30%</td>
                  <td className="px-6 py-4 whitespace-nowrap">430,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">4,100,001 and above</td>
                  <td className="px-6 py-4 whitespace-nowrap">35%</td>
                  <td className="px-6 py-4 whitespace-nowrap">700,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Card color="blue">
            <Calculator className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
            <div>
              <span className="font-semibold text-blue-800">Tip:</span> Use our <Link to="/" className="text-blue-600 underline">Tax Calculator</Link> to quickly determine your tax liability based on your income.
            </div>
          </Card>

          <Divider />

          <SectionHeading icon={<FileText className="h-6 w-6" />}>Types of Taxable Income</SectionHeading>
          <p className="text-gray-700 mb-2">In Pakistan, income is categorized into the following heads:</p>
          <ol className="list-decimal pl-6 text-gray-700 mb-4">
            <li><span className="font-semibold">Salary:</span> Income from employment</li>
            <li><span className="font-semibold">Business:</span> Income from business activities</li>
            <li><span className="font-semibold">Property:</span> Rental income from property</li>
            <li><span className="font-semibold">Capital Gains:</span> Profits from the sale of assets</li>
            <li><span className="font-semibold">Other Sources:</span> Income from dividends, interest, etc.</li>
          </ol>

          <Divider />

          <SectionHeading icon={<Info className="h-6 w-6" />}>Filing Requirements</SectionHeading>
          <p className="text-gray-700 mb-2">You are required to file a tax return in Pakistan if:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Your annual income exceeds PKR 600,000</li>
            <li>You own a vehicle with an engine capacity of 1000cc or more</li>
            <li>You own immovable property with a land area of 500 sq. yards or more</li>
            <li>You are a professional, such as a doctor, lawyer, accountant, etc.</li>
            <li>You have foreign income or assets</li>
          </ul>

          <Divider />

          <SectionHeading icon={<Calendar className="h-6 w-6 text-amber-600" />}>Important Tax Deadlines</SectionHeading>
          <Card color="amber">
            <div>
              <span className="font-semibold text-amber-800">Key Dates to Remember</span>
              <ul className="space-y-2 text-amber-800 mt-2 list-none pl-0">
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
          </Card>

          <Divider />

          <SectionHeading icon={<AlertTriangle className="h-6 w-6 text-amber-600" />}>Penalties for Non-Compliance</SectionHeading>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Penalty for late filing: PKR a minimum of PKR 40,000 or up to 0.1% of the tax payable for each day of default</li>
            <li>Penalty for concealment: Up to 200% of the tax evaded</li>
            <li>Default surcharge: 12% per annum on unpaid taxes</li>
          </ul>

          <Divider />

          <SectionHeading>Next Steps</SectionHeading>
          <p className="text-gray-700 mb-2">
            Now that you understand the basics of Pakistan's tax system, you might be interested in learning about:
          </p>
          <ul className="list-disc pl-6 text-emerald-700 mb-4">
            <li><Link to="/tax-guides/deductions-credits" className="text-emerald-600 underline">Tax Deductions & Credits</Link> - Reduce your tax liability</li>
            <li><Link to="/tax-guides/filing-tax-return" className="text-emerald-600 underline">Filing Your Tax Return</Link> - Step-by-step guide</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingTaxSystem; 