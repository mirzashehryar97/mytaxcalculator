import React, { useState, useEffect } from 'react';
import { Calculator, History, ArrowRight } from 'lucide-react';
import SingleYearCalculator from './components/SingleYearCalculator';
import MultiYearCalculator from './components/MultiYearCalculator';
import { CalculatorProvider } from './context/CalculatorContext';

function GridPattern() {
  const [squares, setSquares] = useState<number[]>([]);

  useEffect(() => {
    const squareCount = Math.ceil((window.innerWidth * window.innerHeight) / (80 * 80));
    setSquares(Array.from({ length: squareCount }, (_, i) => i));
  }, []);

  return (
    <>
      <div className="grid-pattern" />
      <div className="grid-squares">
        {squares.map((i) => (
          <div key={i} className="grid-square" />
        ))}
      </div>
    </>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  return (
    <CalculatorProvider>
      <div className="min-h-screen relative overflow-hidden">
        <GridPattern />
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Calculator className="h-8 w-8 text-emerald-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">TaxCalc Pro</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Pakistan Tax Calculator
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Calculate your tax liability accurately with our advanced tax calculator.
              Support for both single-year and multi-year calculations.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('single')}
                className={`flex-1 py-4 px-6 text-center ${
                  activeTab === 'single'
                    ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Single Year Calculator</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('multi')}
                className={`flex-1 py-4 px-6 text-center ${
                  activeTab === 'multi'
                    ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Multi-Year Calculator</span>
                </div>
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'single' ? <SingleYearCalculator /> : <MultiYearCalculator />}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calculator className="h-8 w-8 text-emerald-600" />}
              title="Accurate Calculations"
              description="Get precise tax calculations based on the latest tax slabs and rates."
            />
            <FeatureCard
              icon={<History className="h-8 w-8 text-emerald-600" />}
              title="Multi-Year Support"
              description="Calculate tax across multiple fiscal years with varying salary ranges."
            />
            <FeatureCard
              icon={<ArrowRight className="h-8 w-8 text-emerald-600" />}
              title="Instant Results"
              description="Get your tax calculations instantly with our real-time calculator."
            />
          </div>
        </main>
      </div>
    </CalculatorProvider>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;