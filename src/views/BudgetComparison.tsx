import Link from 'next/link';

import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Info,
  Landmark,
  Scale,
  TrendingDown,
} from 'lucide-react';

import BudgetSectorSection from '@/components/budget-comparison/BudgetSectorSection';
import GuideCard from '@/components/guide/GuideCard';
import SectionHeading from '@/components/guide/SectionHeading';

import {
  BUDGET_SUMMARY,
  BUDGET_YEARS,
  FY_2025_26_SURCHARGE_RATE,
  FY_2025_26_SURCHARGE_THRESHOLD,
  formatPkr,
  getBudgetComparisonExamples,
  getSlabRows,
  SLAB_COMPARISON_ROWS,
} from '@/lib/budgetComparison';
import {
  BUDGET_OVERVIEW_ROWS,
  BUDGET_SECTOR_NAV,
  BUDGET_SECTORS,
  impactBadgeClass,
} from '@/lib/budgetSectors';
import { BUDGET_COMPARISON_FAQS } from '@/lib/seo';

function formatSavings(annual: number, monthly: number) {
  if (annual <= 0) return '—';
  return `${formatPkr(annual)} / yr (${formatPkr(monthly)} / mo)`;
}

function changeBadgeClass(change: 'unchanged' | 'reduced' | 'restructured') {
  if (change === 'unchanged') return 'bg-gray-100 text-gray-700';
  if (change === 'reduced') return 'bg-emerald-100 text-emerald-800';
  return 'bg-blue-100 text-blue-800';
}

export default function BudgetComparison() {
  const previousSlabs = getSlabRows(BUDGET_YEARS.previous);
  const currentSlabs = getSlabRows(BUDGET_YEARS.current);
  const examples = getBudgetComparisonExamples();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tax Calculator
        </Link>

        <div className="space-y-12">
          <header>
            <div className="mb-4 flex items-center">
              <Scale className="mr-3 h-8 w-8 text-emerald-600" />
              <h1 className="font-bold text-3xl text-gray-900">
                Pakistan Budget 2025-26 vs 2026-27: Complete Comparison
              </h1>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              A sector-by-sector comparison of Pakistan&rsquo;s federal budget changes — salaried
              tax, freelancers &amp; IT, business, property, cars, solar, defence, retail and more.
              FY 2025-26 reflects the {BUDGET_SUMMARY.previousAct}; FY 2026-27 figures are from the{' '}
              {BUDGET_SUMMARY.financeBill} (June 2026), effective {BUDGET_SUMMARY.effectiveFrom}{' '}
              pending parliamentary approval.
            </p>
          </header>

          <GuideCard color="blue">
            <Info className="mr-3 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div className="text-blue-900 text-sm leading-relaxed">
              <span className="font-semibold text-blue-800">Sources &amp; disclaimer:</span>{' '}
              Compiled from the Finance Bill 2026, budget speeches, and reporting by{' '}
              <a
                href="https://www.dawn.com/news/2007322/budget-fy26-27-how-much-tax-will-you-pay-use-the-dawn-income-tax-calculator-to-find-out"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Dawn
              </a>
              ,{' '}
              <a
                href="https://www.geo.tv/latest/668536-key-takeaways-from-federal-budget-2026-27"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Geo News
              </a>
              , and FBR briefings. Proposed rates may change before enactment. Not tax advice —
              verify with the{' '}
              <a
                href="https://www.fbr.gov.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline"
              >
                FBR
              </a>
              .
            </div>
          </GuideCard>

          <nav aria-label="Budget comparison sections" className="rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 font-bold text-gray-900 text-lg">Jump to section</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>
                <a href="#overview" className="text-emerald-700 text-sm hover:underline">
                  Budget overview
                </a>
              </li>
              {BUDGET_SECTOR_NAV.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-emerald-700 text-sm hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#salary-detail" className="text-emerald-700 text-sm hover:underline">
                  Detailed salary tax tables
                </a>
              </li>
              <li>
                <a href="#faq-heading" className="text-emerald-700 text-sm hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </nav>

          <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-24">
            <SectionHeading icon={<Landmark className="h-6 w-6" />}>
              <span id="overview-heading">Federal budget overview</span>
            </SectionHeading>
            <p className="mb-4 text-gray-600 text-sm">
              Macro fiscal targets and totals for the outgoing and proposed budgets.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-900">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Indicator
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      FY 2025-26
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      FY 2026-27
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {BUDGET_OVERVIEW_ROWS.map((row) => (
                    <tr key={row.measure} className="even:bg-gray-50/60">
                      <td className="px-4 py-3 font-medium text-gray-900">{row.measure}</td>
                      <td className="px-4 py-3 text-gray-700">{row.fy2025_26}</td>
                      <td className="px-4 py-3 text-gray-900">{row.fy2026_27}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 font-medium text-xs ${impactBadgeClass(row.impact)}`}
                        >
                          {row.impactLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {BUDGET_SECTORS.map((sector) => (
            <BudgetSectorSection key={sector.id} sector={sector} />
          ))}

          <section
            id="salary-detail"
            aria-labelledby="salary-detail-heading"
            className="scroll-mt-24"
          >
            <SectionHeading icon={<Calculator className="h-6 w-6" />}>
              <span id="salary-detail-heading">Detailed salaried tax comparison</span>
            </SectionHeading>
            <p className="mb-6 text-gray-600 leading-relaxed">
              In-depth slab-by-slab analysis and worked examples for salaried individuals. Select FY
              2025-2026 or FY 2026-2027 in our{' '}
              <Link href="/" className="font-medium text-emerald-700 underline">
                income tax calculator
              </Link>{' '}
              to model your own salary.
            </p>

            <h3 className="mb-3 font-semibold text-gray-900 text-lg">
              Marginal rate by income band
            </h3>
            <div className="mb-8 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-900">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Annual income
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      FY 2025-26
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      FY 2026-27
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {SLAB_COMPARISON_ROWS.map((row) => (
                    <tr key={row.incomeBand} className="even:bg-gray-50/60">
                      <td className="px-4 py-3 font-medium text-gray-900">{row.incomeBand}</td>
                      <td className="px-4 py-3 text-gray-700">{row.ratePrevious}</td>
                      <td className="px-4 py-3 font-medium text-emerald-800">{row.rateCurrent}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 font-medium text-xs ${changeBadgeClass(row.change)}`}
                        >
                          {row.changeLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 font-semibold text-gray-900 text-lg">Full slab tables</h3>
            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="border-gray-100 border-b bg-gray-50 px-4 py-3">
                  <h4 className="font-bold text-gray-900">FY 2025-2026</h4>
                </div>
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {previousSlabs.map((slab) => (
                      <tr key={slab.range}>
                        <td className="px-4 py-2.5 text-gray-700">{slab.range}</td>
                        <td className="px-4 py-2.5 text-gray-900">{slab.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-gray-100 border-t px-4 py-2 text-gray-500 text-xs">
                  +{FY_2025_26_SURCHARGE_RATE * 100}% surcharge on tax when income exceeds{' '}
                  {formatPkr(FY_2025_26_SURCHARGE_THRESHOLD)}.
                </p>
              </div>
              <div className="overflow-hidden rounded-xl border border-emerald-200 ring-1 ring-emerald-100">
                <div className="border-emerald-100 border-b bg-emerald-50 px-4 py-3">
                  <h4 className="font-bold text-emerald-900">FY 2026-2027 (proposed)</h4>
                </div>
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {currentSlabs.map((slab) => (
                      <tr key={slab.range}>
                        <td className="px-4 py-2.5 text-gray-700">{slab.range}</td>
                        <td className="px-4 py-2.5 font-medium text-emerald-900">{slab.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="mb-3 font-semibold text-gray-900 text-lg">
              Example savings by monthly salary
            </h3>
            <p className="mb-4 text-gray-600 text-sm">
              Gross salary over 12 months; FY 2025-26 includes 9% surcharge where applicable.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-900">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Monthly salary
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Tax FY 2025-26
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Tax FY 2026-27
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      You save
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {examples.map((row) => (
                    <tr key={row.monthlySalary} className="even:bg-gray-50/60">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {formatPkr(row.monthlySalary)}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {formatPkr(row.taxPrevious)}
                        {row.surchargePrevious > 0 && (
                          <span className="mt-0.5 block text-gray-500 text-xs">
                            incl. {formatPkr(row.surchargePrevious)} surcharge
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-emerald-800">
                        {formatPkr(row.taxCurrent)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-emerald-700">
                        {formatSavings(row.annualSavings, row.monthlySavings)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="summary-heading">
            <SectionHeading icon={<TrendingDown className="h-6 w-6" />}>
              <span id="summary-heading">Bottom line: who wins in Budget 2026-27?</span>
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <h3 className="font-semibold text-emerald-900">Biggest relief</h3>
                <ul className="mt-2 space-y-1 text-emerald-800 text-sm">
                  <li>• Salaried earners Rs. 200k–1M+/month</li>
                  <li>• Property buyers &amp; sellers (Section 7E gone)</li>
                  <li>• PSEB freelancers &amp; IT exporters</li>
                  <li>• Companies under Rs. 500M (super tax abolished)</li>
                  <li>• Small retailers (1% turnover tax)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900">Higher costs / new taxes</h3>
                <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                  <li>• Luxury imported EVs &amp; petrol cars (new/higher FED)</li>
                  <li>• ICT vehicle token tax reforms</li>
                  <li>• Social media influencers (5% WHT proposed)</li>
                  <li>• Distributors / wholesalers (min tax doubled)</li>
                  <li>• E-cigarette liquids (+65% FED)</li>
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="faq-heading">
            <SectionHeading icon={<Info className="h-6 w-6" />}>
              <span id="faq-heading">Frequently asked questions</span>
            </SectionHeading>
            <div className="space-y-4">
              {BUDGET_COMPARISON_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-gray-50/50 open:bg-white"
                >
                  <summary className="cursor-pointer select-none list-none px-5 py-4 font-semibold text-gray-900 marker:content-none group-open:text-emerald-700">
                    {faq.question}
                  </summary>
                  <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="flex justify-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              Open Tax Calculator
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
