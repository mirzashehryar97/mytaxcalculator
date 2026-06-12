import { useState } from 'react';
import { Calculator, History, Zap, ShieldCheck, LineChart, Sparkles, HelpCircle, ChevronDown } from 'lucide-react';
import { Outlet, Navigate } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { Analytics } from '@vercel/analytics/react';
import SingleYearCalculator from './components/SingleYearCalculator';
import MultiYearCalculator from './components/MultiYearCalculator';
import { CalculatorProvider } from './context/CalculatorContext';
import { taxSlabs } from './utils/taxCalculator';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import TaxGuides from './pages/TaxGuides';
import UnderstandingTaxSystem from './pages/UnderstandingTaxSystem';
import TaxDeductionsCredits from './pages/TaxDeductionsCredits';
import FilingTaxReturn from './pages/FilingTaxReturn';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TaxNews from './pages/TaxNews';
import PageMeta from './components/PageMeta';

function GridPattern() {
  return (
    <>
      <div className="grid-pattern" />
      <div className="grid-squares" />
    </>
  );
}

function HomePage() {
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');

  return (
    <>
      <div className="text-center mb-10 animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-medium text-emerald-100 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-emerald-300" />
          Updated for FY 2026-2027 FBR slabs
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-white text-balance">
          Pakistan Salary &amp; Income Tax Calculator
        </h1>
        <p className="mt-5 text-lg text-emerald-50/80 max-w-3xl mx-auto text-balance">
          Calculate your salary tax and take-home pay using the latest FBR tax slabs for FY 2026-2027.
          Supports single-year and multi-year calculations from FY 2014-2015 to FY 2026-2027.
        </p>
      </div>

      <div className="surface-card overflow-hidden animate-fade-up" style={{ animationDelay: '80ms' }}>
        <div className="p-2 sm:p-3 bg-gray-50/80 border-b border-gray-100">
          <div className="flex gap-2 max-w-md mx-auto rounded-2xl bg-gray-100 p-1.5">
            <button
              onClick={() => setActiveTab('single')}
              className={`calculator-tab ${activeTab === 'single' ? 'calculator-tab-active' : 'calculator-tab-inactive'}`}
            >
              <Calculator className="h-5 w-5" />
              <span className="hidden sm:inline">Single Year</span>
              <span className="sm:hidden">Single</span>
            </button>
            <button
              onClick={() => setActiveTab('multi')}
              className={`calculator-tab ${activeTab === 'multi' ? 'calculator-tab-active' : 'calculator-tab-inactive'}`}
            >
              <History className="h-5 w-5" />
              <span className="hidden sm:inline">Multi-Year</span>
              <span className="sm:hidden">Multi</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          {activeTab === 'single' ? <SingleYearCalculator /> : <MultiYearCalculator />}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
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

interface FaqItem {
  question: string;
  answer?: string;
  slabs?: boolean;
}

const FAQS: FaqItem[] = [
  {
    question: 'What are the income tax slabs in Pakistan for FY 2026-2027?',
    slabs: true,
  },
  {
    question: 'How do I calculate income tax on my salary in Pakistan?',
    answer:
      'Enter your monthly or annual salary, select the fiscal year (e.g. FY 2026-2027), and the calculator applies the progressive FBR tax slabs to compute your total tax liability, monthly tax, and take-home salary.',
  },
  {
    question: 'How much tax will I pay on my salary in Pakistan?',
    answer:
      'Your salary tax depends on your annual income and the FBR slab it falls into. For FY 2026-2027, income up to PKR 600,000 is tax-free, then progressive rates from 1% up to 35% apply. Enter your monthly salary above to see exactly how much income tax you will pay each month and per year.',
  },
  {
    question: 'What will my take-home salary be after tax?',
    answer:
      'Your take-home (net) salary is your gross salary minus income tax. The calculator instantly shows your monthly and yearly take-home pay after applying the latest FBR tax slabs, so you know exactly what lands in your account.',
  },
  {
    question: 'Can I compare tax across multiple years in Pakistan?',
    answer:
      'Yes. My Tax Calculator supports multi-year calculations from FY 2014-2015 through FY 2026-2027, with automatic fiscal year detection for job changes and partial employment periods.',
  },
];

const FISCAL_YEARS = Object.keys(taxSlabs);

const formatPkr = (value: number) => value.toLocaleString('en-US');

function formatSlabRange(min: number, max: number | null): string {
  if (min === 0 && max !== null) return `Up to ${formatPkr(max)}`;
  if (max === null) return `Above ${formatPkr(min - 1)}`;
  return `${formatPkr(min)} \u2013 ${formatPkr(max)}`;
}

function SlabsAnswer() {
  const [year, setYear] = useState<string>(FISCAL_YEARS[0]);
  const slabs = taxSlabs[year] ?? [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-gray-600">
          Pakistan&rsquo;s salaried income tax slabs for the selected fiscal year:
        </p>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span className="whitespace-nowrap">Fiscal Year</span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            aria-label="Select fiscal year for tax slabs"
          >
            {FISCAL_YEARS.map((fy) => (
              <option key={fy} value={fy}>
                FY {fy}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-emerald-50 text-emerald-800">
              <th scope="col" className="px-4 py-2.5 font-semibold">Annual Taxable Income (PKR)</th>
              <th scope="col" className="px-4 py-2.5 font-semibold text-right">Tax Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slabs.map((slab) => (
              <tr key={`${slab.min}-${slab.max}`} className="even:bg-gray-50/60">
                <td className="px-4 py-2.5 text-gray-700">{formatSlabRange(slab.min, slab.max)}</td>
                <td className="px-4 py-2.5 text-right font-semibold text-gray-900 tabular-nums">{slab.rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FaqSection() {
  return (
    <section className="mt-20" aria-labelledby="faq-heading">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-medium text-emerald-100 backdrop-blur-sm">
          <HelpCircle className="h-4 w-4 text-emerald-300" />
          Got questions?
        </span>
        <h2 id="faq-heading" className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-emerald-50/80 max-w-xl mx-auto">
          Everything you need to know about calculating income tax in Pakistan.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-white/60 bg-white/95 shadow-lg shadow-emerald-950/10 backdrop-blur-sm transition-all duration-200 open:shadow-xl open:ring-1 open:ring-emerald-100 hover:border-emerald-200"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none select-none p-5 sm:p-6 text-base sm:text-lg font-semibold text-gray-900 transition-colors group-hover:text-emerald-700 group-open:text-emerald-700">
              <span>{faq.question}</span>
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform duration-300 group-open:rotate-180">
                <ChevronDown className="h-5 w-5" />
              </span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="border-t border-gray-100 pt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                {faq.slabs ? <SlabsAnswer /> : faq.answer}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function Layout() {
  return (
    <CalculatorProvider>
      <PageMeta />
      <div className="min-h-screen relative overflow-hidden flex flex-col font-open-sans" style={{ fontFamily: '"Open Sans", serif' }}>
        <GridPattern />
        <Header />

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
          <Outlet />
        </main>

        <Footer />
      </div>
      <Analytics />
    </CalculatorProvider>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group bg-white rounded-2xl border border-white/60 shadow-lg shadow-emerald-950/10 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-xl mb-4 ring-1 ring-emerald-100 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'tax-guides', element: <TaxGuides /> },
      { path: 'tax-guides/understanding-tax-system', element: <UnderstandingTaxSystem /> },
      { path: 'tax-guides/deductions-credits', element: <TaxDeductionsCredits /> },
      { path: 'tax-guides/filing-tax-return', element: <FilingTaxReturn /> },
      { path: 'tax-news', element: <TaxNews /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-of-service', element: <TermsOfService /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];
