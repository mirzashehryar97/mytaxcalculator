import React from 'react';
import { ArrowLeft, BookOpen, PiggyBank, ShieldCheck, HomeIcon, Briefcase, GraduationCap, Heart, Info, AlertTriangle } from 'lucide-react';
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

const TaxDeductionsCredits = () => {
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
              <h1 className="text-3xl font-bold text-gray-900">Tax Deductions & Credits</h1>
            </div>
            <p className="text-gray-600 text-lg mb-6">
              Discover potential tax deductions and credits available for Pakistani taxpayers to reduce your overall tax liability.
            </p>
          </div>

          <SectionHeading icon={<Info className="h-6 w-6" />}>Understanding Tax Deductions and Credits</SectionHeading>
          <p className="text-gray-700 mb-4">
            In Pakistan, various tax reliefs are available to reduce your taxable income and ultimately lower your tax liability. 
            Taking advantage of these deductions and credits can result in significant tax savings.
          </p>

          <Card color="emerald">
            <PiggyBank className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold text-emerald-800">Why Deductions Matter</span>
              <p className="mt-1">
                Properly claiming all eligible deductions and credits can potentially save you thousands of rupees each year.
                Always keep proper documentation to support your claims in case of an audit.
              </p>
            </div>
          </Card>

          <Divider />

          <SectionHeading icon={<Briefcase className="h-6 w-6" />}>Key Tax Deductions for Individuals</SectionHeading>
          <div className="space-y-8 my-8">
            <Card color="blue">
              <Briefcase className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <span className="font-semibold text-blue-800">Zakat Deduction</span>
                <p className="text-gray-700 mb-2">Zakat paid under the Zakat and Ushr Ordinance is fully deductible from your total income. This is one of the most significant deductions available to Muslim taxpayers.</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm mb-1">
                  <strong>Documentation required:</strong> Receipt of Zakat payment, bank statement showing Zakat deduction.
                </div>
              </div>
            </Card>
            <Card color="blue">
              <ShieldCheck className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <span className="font-semibold text-blue-800">Insurance Premium Deduction</span>
                <p className="text-gray-700 mb-2">Premiums paid for health and life insurance policies are deductible up to 5% of your taxable income or PKR 150,000, whichever is lower.</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm mb-1">
                  <strong>Documentation required:</strong> Insurance policy documents, premium payment receipts.
                </div>
              </div>
            </Card>
            <Card color="blue">
              <HomeIcon className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <span className="font-semibold text-blue-800">Home Loan Interest</span>
                <p className="text-gray-700 mb-2">Interest paid on a housing loan for the construction or purchase of a house can be deducted up to 50% of taxable income or PKR 2 million, whichever is lower.</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm mb-1">
                  <strong>Documentation required:</strong> Loan agreement, interest payment certificates, bank statements.
                </div>
              </div>
            </Card>
            <Card color="blue">
              <GraduationCap className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <span className="font-semibold text-blue-800">Education Expenses</span>
                <p className="text-gray-700 mb-2">Tuition fees paid for education (yours or your children's) to recognized educational institutions can be deducted up to 5% of your taxable income or PKR 60,000 per child, whichever is lower.</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm mb-1">
                  <strong>Documentation required:</strong> Fee receipts, enrollment confirmation from educational institutions.
                </div>
              </div>
            </Card>
            <Card color="blue">
              <Heart className="h-6 w-6 text-blue-600 mr-4 mt-1" />
              <div>
                <span className="font-semibold text-blue-800">Charitable Donations</span>
                <p className="text-gray-700 mb-2">Donations to approved nonprofit organizations, charitable institutions, and government relief funds are tax deductible. The deduction allowed is generally 30% of taxable income for individuals.</p>
                <div className="bg-gray-50 p-3 rounded-md text-sm mb-1">
                  <strong>Documentation required:</strong> Donation receipts from approved organizations with NTN or tax exemption certificate.
                </div>
              </div>
            </Card>
          </div>

          <Divider />

          <SectionHeading icon={<Info className="h-6 w-6" />}>Tax Credits</SectionHeading>
          <p className="text-gray-700 mb-4">
            In addition to deductions, Pakistan offers several tax credits that directly reduce the amount of tax you owe:
          </p>

          <SubHeading>Investment Tax Credit</SubHeading>
          <p className="text-gray-700 mb-2">
            A tax credit of up to 20% is available for investments in:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Shares of public companies listed on the Pakistan Stock Exchange</li>
            <li>Mutual funds</li>
            <li>Life insurance policies with a minimum 2-year term</li>
            <li>Approved pension funds</li>
          </ul>
          <p className="text-gray-700 mb-4">
            The maximum investment eligible for this credit is limited to PKR 2 million per year.
          </p>

          <SubHeading>Senior Citizen Tax Credit</SubHeading>
          <p className="text-gray-700 mb-4">
            Individuals aged 60 years or above with an annual income of up to PKR 1 million are entitled to a 50% tax reduction.
          </p>

          <SubHeading>Disabled Person Tax Credit</SubHeading>
          <p className="text-gray-700 mb-4">
            Persons with disabilities holding a National Special Person's Certificate are eligible for a tax reduction of 75% on their income up to PKR 1 million.
          </p>

          <Divider />

          <SectionHeading icon={<Info className="h-6 w-6" />}>Special Provisions</SectionHeading>
          <p className="text-gray-700 mb-2">
            Pakistan's tax law provides special provisions for certain categories of taxpayers:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><span className="font-semibold">Women entrepreneurs:</span> Women operating small businesses with an annual turnover of less than PKR 100 million may be eligible for a reduced tax rate.</li>
            <li><span className="font-semibold">Freelancers:</span> Individuals providing freelance services have special tax provisions and may be eligible for reduced rates on foreign-source income.</li>
            <li><span className="font-semibold">Startup businesses:</span> Qualifying technology-based startups are exempt from income tax for the first three years of operation.</li>
          </ul>

          <Card color="amber">
            <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold text-amber-800">Important Notes</span>
              <ul className="space-y-2 text-amber-800 mt-2">
                <li>All deductions and credits require proper documentation and should be claimed on your income tax return.</li>
                <li>Tax laws change frequently, so consult with a tax professional or refer to the FBR website for the most current information.</li>
                <li>False claims can result in penalties and interest charges.</li>
              </ul>
            </div>
          </Card>

          <Divider />

          <SectionHeading>Maximizing Your Tax Benefits</SectionHeading>
          <p className="text-gray-700 mb-2">
            To make the most of available tax deductions and credits:
          </p>
          <ol className="list-decimal pl-6 text-gray-700 mb-4">
            <li><span className="font-semibold">Plan ahead:</span> Make strategic financial decisions before the end of the tax year.</li>
            <li><span className="font-semibold">Keep records:</span> Maintain detailed records of all expenses that may qualify for deductions.</li>
            <li><span className="font-semibold">Consult a professional:</span> Consider hiring a tax advisor for personalized advice.</li>
            <li><span className="font-semibold">File on time:</span> Late filing may limit your ability to claim certain deductions.</li>
          </ol>

          <Divider />

          <SectionHeading>Next Steps</SectionHeading>
          <p className="text-gray-700 mb-2">
            Now that you understand the available tax deductions and credits, learn more about:
          </p>
          <ul className="list-disc pl-6 text-emerald-700 mb-4">
            <li><Link to="/tax-guides/understanding-tax-system" className="text-emerald-600 underline">Understanding Pakistan's Tax System</Link> - Learn the basics</li>
            <li><Link to="/tax-guides/filing-tax-return" className="text-emerald-600 underline">Filing Your Tax Return</Link> - Step-by-step guide to claiming your deductions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaxDeductionsCredits; 