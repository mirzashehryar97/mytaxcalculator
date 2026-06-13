import { Calculator, Shield, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="font-extrabold text-3xl text-gray-900 sm:text-4xl">
              About My Tax Calculator
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              My Tax Calculator is a comprehensive tax calculator specifically designed for
              Pakistani taxpayers. Our mission is to simplify tax calculations and help individuals
              understand their tax liabilities using the latest FBR tax slabs through FY 2026-2027.
            </p>
          </div>

          <div className="mt-12 lg:mt-0 lg:ml-8">
            <div className="rounded-lg bg-emerald-50 p-6">
              <h3 className="flex items-center font-medium text-emerald-900 text-lg">
                <Calculator className="mr-2 h-5 w-5 text-emerald-600" />
                Why Use Our Calculator?
              </h3>
              <div className="mt-4 text-base text-emerald-700">
                <ul className="list-disc space-y-2 pl-5">
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
          <h2 className="mb-8 font-bold text-2xl text-gray-900">Our Features</h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100">
                <Calculator className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900 text-lg">Single Year Calculations</h3>
              <p className="text-gray-600">
                Calculate your tax liability for a specific fiscal year with our easy-to-use
                calculator.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900 text-lg">Multi-Year Support</h3>
              <p className="text-gray-600">
                Calculate tax across different years with varying salary periods and detailed
                breakdowns.
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 font-medium text-gray-900 text-lg">Privacy Focused</h3>
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
