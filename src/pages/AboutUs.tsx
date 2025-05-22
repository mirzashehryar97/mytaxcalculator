import { Users, Calculator, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About My Tax Calculator
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              My Tax Calculator is a comprehensive tax calculator specifically designed for Pakistani taxpayers. Our mission is to simplify tax calculations and help individuals understand their tax liabilities.
            </p>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:ml-8">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-emerald-900 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-emerald-600" />
                Why Use Our Calculator?
              </h3>
              <div className="mt-4 text-base text-emerald-700">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Up-to-date with latest Pakistani tax laws</li>
                  <li>Accurate calculations based on official tax slabs</li>
                  <li>Support for multiple fiscal years</li>
                  <li>Free to use with no hidden costs</li>
                  <li>Privacy-focused - all calculations done in your browser</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Features</h2>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-md mb-4">
                <Calculator className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Single Year Calculations</h3>
              <p className="text-gray-600">
                Calculate your tax liability for a specific fiscal year with our easy-to-use calculator.
              </p>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-md mb-4">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Multi-Year Support</h3>
              <p className="text-gray-600">
                Calculate tax across different years with varying salary periods and detailed breakdowns.
              </p>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-md mb-4">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Privacy Focused</h3>
              <p className="text-gray-600">
                Your data never leaves your browser. All calculations happen locally on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 