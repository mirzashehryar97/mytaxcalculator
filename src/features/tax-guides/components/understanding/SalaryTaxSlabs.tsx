import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  SALARIED_TAX_SLABS_2026_27,
  UNDERSTANDING_SECTION_COPY,
} from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function SalaryTaxSlabs() {
  return (
    <section
      aria-labelledby="salary-tax-slabs"
      className="rounded-lg border-[#b8c8c1] border-[1.5px] bg-white p-3 shadow-sm"
    >
      <TaxGuideArticleSectionHeading id="salary-tax-slabs" number={4}>
        {UNDERSTANDING_SECTION_COPY.slabsTitle}
      </TaxGuideArticleSectionHeading>
      <div className="mt-3 overflow-x-auto rounded-md border border-slate-200">
        <table className="w-full min-w-[350px] table-fixed border-collapse text-left text-xs sm:text-[13px]">
          <thead className="bg-[#f2f6f4] text-[#0b1736]">
            <tr>
              <th scope="col" className="w-[46%] border-slate-200 border-r px-2.5 py-2 font-bold">
                Taxable income (annual)
              </th>
              <th scope="col" className="px-2.5 py-2 font-bold">
                Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {SALARIED_TAX_SLABS_2026_27.map((slab) => (
              <tr key={slab.id} className="border-slate-200 border-t">
                <td className="border-slate-200 border-r px-2.5 py-1.5 text-slate-700">
                  {slab.income}
                </td>
                <td className="px-2.5 py-1.5 text-slate-700">{slab.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[13px] text-slate-600 leading-5">
        {UNDERSTANDING_SECTION_COPY.slabsDescription}
      </p>
      <Link
        href="/"
        className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md bg-emerald-800 px-4 font-semibold text-sm text-white transition hover:bg-emerald-900"
      >
        {UNDERSTANDING_SECTION_COPY.calculateLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
