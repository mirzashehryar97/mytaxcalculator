import { LineChart, ShieldCheck, Sparkles, Zap } from 'lucide-react';

import CalculatorTabs from './CalculatorTabs';
import FaqSection from './FaqSection';
import FeatureCard from './FeatureCard';

export default function HomeContent() {
  return (
    <>
      <div className="mb-10 animate-fade-up text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-emerald-100 text-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-emerald-300" />
          Updated for FY 2026-2027 FBR slabs
        </span>
        <h1 className="mt-6 text-balance font-bold text-4xl text-white tracking-tight sm:text-5xl">
          Pakistan Salary &amp; Income Tax Calculator
        </h1>
        <p className="mx-auto mt-5 max-w-4xl text-emerald-50/80 text-lg leading-relaxed">
          Calculate your salary tax and take-home pay using the latest FBR tax slabs for FY
          2026-2027. Supports single-year and multi-year calculations from FY 2014-2015 to FY
          2026-2027.
        </p>
      </div>

      <CalculatorTabs />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<ShieldCheck className="h-6 w-6 text-emerald-600" />}
          title="Accurate Calculations"
          description="Precise tax results based on the latest FBR tax slabs for FY 2026-2027."
        />
        <FeatureCard
          icon={<LineChart className="h-6 w-6 text-emerald-600" />}
          title="Multi-Year Support"
          description="Calculate tax across multiple fiscal years with varying salary ranges."
        />
        <FeatureCard
          icon={<Zap className="h-6 w-6 text-emerald-600" />}
          title="Instant Results"
          description="See your tax breakdown instantly with our real-time calculator."
        />
      </div>

      <FaqSection />
    </>
  );
}
