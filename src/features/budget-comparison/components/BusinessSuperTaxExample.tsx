import { Info } from 'lucide-react';

import { BUSINESS_SUPER_TAX_EXAMPLE } from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BusinessSuperTaxExample() {
  return (
    <section
      id="example"
      aria-labelledby="business-super-tax-example-heading"
      className="scroll-mt-24"
    >
      <h2
        id="business-super-tax-example-heading"
        className="mb-4 font-bold text-[#0b1736] text-xl sm:text-2xl"
      >
        {BUSINESS_SUPER_TAX_EXAMPLE.title}
      </h2>
      <div className="overflow-hidden rounded-xl border-[1.5px] border-slate-300 bg-white shadow-sm">
        <div className="grid items-stretch sm:grid-cols-[1fr_auto_1fr_auto_1.15fr]">
          <div className="p-5 text-center sm:p-6">
            <p className="font-semibold text-slate-600 text-sm sm:text-base">
              {BUSINESS_SUPER_TAX_EXAMPLE.previous.label}
            </p>
            <p className="mt-2 font-bold text-2xl text-red-600 sm:text-3xl">
              {BUSINESS_SUPER_TAX_EXAMPLE.previous.value}
            </p>
            <p className="mt-1 text-slate-600 text-sm">
              {BUSINESS_SUPER_TAX_EXAMPLE.previous.detail}
            </p>
          </div>
          <span className="hidden self-center font-bold text-2xl text-emerald-800 sm:block">−</span>
          <div className="border-slate-200 border-t p-5 text-center sm:border-0 sm:p-6">
            <p className="font-semibold text-slate-600 text-sm sm:text-base">
              {BUSINESS_SUPER_TAX_EXAMPLE.current.label}
            </p>
            <p className="mt-2 font-bold text-2xl text-[#0b1736] sm:text-3xl">
              {BUSINESS_SUPER_TAX_EXAMPLE.current.value}
            </p>
            <p className="mt-1 text-slate-600 text-sm">
              {BUSINESS_SUPER_TAX_EXAMPLE.current.detail}
            </p>
          </div>
          <span className="hidden self-center font-bold text-2xl text-emerald-800 sm:block">=</span>
          <div className="m-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-5 text-center sm:m-4 sm:p-6">
            <p className="font-semibold text-emerald-900 text-sm sm:text-base">
              {BUSINESS_SUPER_TAX_EXAMPLE.difference.label}
            </p>
            <p className="mt-2 font-bold text-2xl text-emerald-700 sm:text-3xl">
              {BUSINESS_SUPER_TAX_EXAMPLE.difference.value}
            </p>
          </div>
        </div>
        <p className="flex items-center gap-2 border-slate-200 border-t bg-slate-50 px-5 py-3 text-slate-700 text-sm">
          <Info className="h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
          {BUSINESS_SUPER_TAX_EXAMPLE.note}
        </p>
      </div>
    </section>
  );
}
