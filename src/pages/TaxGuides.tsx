import { FileText, Download, ExternalLink, ArrowRight, Info, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaxGuides = () => {
  return (
    <div className="bg-white backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pakistani Tax Guides & Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Learn more about Pakistan's tax system, filing requirements, and strategies to optimize your tax planning.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-12">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-blue-900">Disclaimer</h3>
              <p className="mt-2 text-sm text-blue-700">
                This information is provided for general guidance only and should not be considered as professional tax advice. 
                Tax laws change frequently, and we recommend consulting with a qualified tax professional for advice specific to your situation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Tax Guide Card 1 */}
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Understanding Pakistan's Tax System</h3>
              <p className="text-gray-600 mb-4">
                Learn the basics of Pakistan's tax system, including income tax brackets, filing requirements, and important deadlines.
              </p>
              <Link to="/tax-guides/understanding-tax-system" className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center">
                Read Guide
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Tax Guide Card 2 */}
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tax Deductions & Credits</h3>
              <p className="text-gray-600 mb-4">
                Discover potential tax deductions and credits available for Pakistani taxpayers to reduce your overall tax liability.
              </p>
              <Link to="/tax-guides/deductions-credits" className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center">
                Read Guide
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Tax Guide Card 3 */}
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Filing Your Tax Return</h3>
              <p className="text-gray-600 mb-4">
                Step-by-step instructions on how to file your income tax return in Pakistan, including online filing options.
              </p>
              <Link to="/tax-guides/filing-tax-return" className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center">
                Read Guide
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Official Resources</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 h-12 w-12 rounded-md flex items-center justify-center">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Federal Board of Revenue (FBR)</h4>
                  <p className="text-sm text-gray-500">Official tax authority of Pakistan</p>
                </div>
              </div>
              <a 
                href="https://www.fbr.gov.pk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Visit Website
              </a>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 h-12 w-12 rounded-md flex items-center justify-center">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Income Tax Ordinance 2001</h4>
                  <p className="text-sm text-gray-500">Complete tax laws of Pakistan</p>
                </div>
              </div>
              <a 
                href="#" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Download PDF
              </a>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 h-12 w-12 rounded-md flex items-center justify-center">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">FBR Tax Return Filing Portal</h4>
                  <p className="text-sm text-gray-500">E-filing system for tax returns</p>
                </div>
              </div>
              <a 
                href="https://iris.fbr.gov.pk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Visit Portal
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-amber-50 p-6 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-amber-900">Important Dates</h3>
              <p className="mt-2 text-sm text-amber-700 mb-4">
                Keep track of these important tax dates in Pakistan to avoid penalties:
              </p>
              <ul className="space-y-2 text-sm text-amber-800">
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