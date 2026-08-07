import { Table2 } from 'lucide-react';

import { SALARY_SLABS_SECTION_COPY } from '@/features/salary-tax/lib/content';

import SlabsAnswer from './SlabsAnswer';

/**
 * The slab table as a section of its own, above the FAQ. The same table also stays
 * inside FAQ question 1, so its select id is namespaced to keep the two apart.
 */
export default function SalaryTaxSlabsSection() {
  return (
    <section className="mt-16 sm:mt-20" aria-labelledby="salary-tax-slabs-heading">
      <div className="mb-8 text-center sm:mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-emerald-100 text-sm backdrop-blur-sm">
          <Table2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          {SALARY_SLABS_SECTION_COPY.eyebrow}
        </span>
        <h2
          id="salary-tax-slabs-heading"
          className="mt-5 text-balance font-bold text-3xl text-white tracking-tight sm:text-4xl"
        >
          {SALARY_SLABS_SECTION_COPY.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/80 leading-relaxed">
          {SALARY_SLABS_SECTION_COPY.description}
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border border-white/60 bg-white/95 p-5 shadow-emerald-950/10 shadow-lg sm:p-6">
        <SlabsAnswer selectId="salary-tax-slabs-fiscal-year" />
      </div>
    </section>
  );
}
