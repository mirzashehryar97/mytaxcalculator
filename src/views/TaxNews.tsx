import Link from 'next/link';

import { ArrowRight, CalendarDays, Info, Newspaper } from 'lucide-react';

interface NewsItem {
  date: string;
  category: string;
  title: string;
  summary: string;
  to?: string;
  href?: string;
}

const NEWS: NewsItem[] = [
  {
    date: 'June 12, 2026',
    category: 'Budget 2026-27',
    title: 'Budget 2026-27: salary tax relief and restructured slabs',
    summary:
      'The Federal Budget 2026-27 (Finance Bill 2026) restructures the salaried income tax slabs and reduces rates for incomes between PKR 2.2 million and 7 million. New 25%, 29% and 32% bands have been introduced, and the surcharge on annual income above PKR 10 million has been abolished. Use the calculator to see how the changes affect your take-home salary.',
    to: '/budget-2025-26-vs-2026-27',
  },
  {
    date: 'June 12, 2026',
    category: 'Tax Slabs',
    title: 'Updated income tax slabs for FY 2026-2027 now live',
    summary:
      'My Tax Calculator has been updated with the latest FBR salaried income tax slabs for the fiscal year 2026-2027. The top marginal rate remains 35%, while the slab applicable to income between PKR 1,200,001 and 2,200,000 is taxed at 11%.',
    to: '/',
  },
  {
    date: 'June 12, 2026',
    category: 'Filing',
    title: 'How to file your income tax return through FBR IRIS',
    summary:
      'A step-by-step walkthrough of registering on the IRIS portal, selecting the correct return form, declaring income and assets, and submitting your return before the September 30 deadline for salaried individuals.',
    to: '/tax-guides/filing-tax-return',
  },
  {
    date: 'June 12, 2026',
    category: 'Deductions',
    title: 'Maximise your savings with eligible tax credits',
    summary:
      'Review the deductions and tax credits available to Pakistani taxpayers — including donations, pension contributions and investments — that can reduce your overall income tax liability.',
    to: '/tax-guides/deductions-credits',
  },
  {
    date: 'June 12, 2026',
    category: 'Compliance',
    title: 'Key tax deadlines for the 2026-2027 tax year',
    summary:
      'Salaried individuals must file by September 30, businesses by December 31, with monthly withholding payments due by the 15th of each month. Mark these dates to avoid penalties.',
    to: '/tax-guides',
  },
];

const TaxNews = () => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center">
          <Newspaper className="mr-3 h-8 w-8 text-emerald-600" />
          <h1 className="font-bold text-3xl text-gray-900">Pakistan Tax News &amp; Updates</h1>
        </div>
        <p className="mb-8 text-gray-600 text-lg">
          Stay informed about the latest income tax slabs, FBR announcements, filing deadlines and
          tax planning tips for Pakistan.
        </p>

        <div className="mb-10 flex items-start rounded-lg bg-blue-50 p-5">
          <Info className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
          <p className="text-blue-700 text-sm">
            Updates on this page summarise publicly available information. For official
            notifications, always refer to the{' '}
            <a
              href="https://www.fbr.gov.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Federal Board of Revenue (FBR)
            </a>
            .
          </p>
        </div>

        <div className="space-y-6">
          {NEWS.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-gray-100 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <CalendarDays className="h-4 w-4" />
                  {item.date}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 font-semibold text-emerald-700 text-xs ring-1 ring-emerald-100">
                  {item.category}
                </span>
              </div>
              <h2 className="mb-2 font-bold text-gray-900 text-xl">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed">{item.summary}</p>
              {item.to && (
                <Link
                  href={item.to}
                  className="mt-4 inline-flex items-center font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              )}
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxNews;
