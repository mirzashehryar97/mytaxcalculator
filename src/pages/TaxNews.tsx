import { Newspaper, CalendarDays, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    to: '/',
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
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-2">
          <Newspaper className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Pakistan Tax News &amp; Updates</h1>
        </div>
        <p className="text-gray-600 text-lg mb-8">
          Stay informed about the latest income tax slabs, FBR announcements, filing deadlines and tax
          planning tips for Pakistan.
        </p>

        <div className="bg-blue-50 p-5 rounded-lg mb-10 flex items-start">
          <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Updates on this page summarise publicly available information. For official notifications,
            always refer to the{' '}
            <a href="https://www.fbr.gov.pk/" target="_blank" rel="noopener noreferrer" className="underline font-medium">
              Federal Board of Revenue (FBR)
            </a>
            .
          </p>
        </div>

        <div className="space-y-6">
          {NEWS.map((item) => (
            <article key={item.title} className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-sm mb-3">
                <span className="inline-flex items-center gap-1.5 text-gray-500">
                  <CalendarDays className="h-4 w-4" />
                  {item.date}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-0.5 text-xs font-semibold ring-1 ring-emerald-100">
                  {item.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed">{item.summary}</p>
              {item.to && (
                <Link to={item.to} className="mt-4 inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              )}
              {item.href && (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
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
