import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { PROPERTY_CALCULATOR_LINKS } from '@/features/budget-comparison/lib/propertyContent';

/** Sends readers from the property budget changes to the calculators that price them. */
export default function PropertyCalculatorLinks() {
  return (
    <section
      id="calculators"
      aria-labelledby="property-calculators-heading"
      className="scroll-mt-24"
    >
      <h2
        id="property-calculators-heading"
        className="mb-2 font-bold text-[#0b1736] text-xl sm:text-2xl"
      >
        {PROPERTY_CALCULATOR_LINKS.title}
      </h2>
      <p className="mb-4 text-slate-600 text-sm leading-6">
        {PROPERTY_CALCULATOR_LINKS.description}
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {PROPERTY_CALCULATOR_LINKS.items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col rounded-xl border-[1.5px] border-slate-300 bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-3 font-bold text-[#0b1736] text-base group-hover:text-emerald-800">
                {item.label}
              </span>
              <span className="mt-1 flex-1 text-slate-600 text-sm leading-6">{item.detail}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 font-semibold text-emerald-800 text-sm">
                Open calculator
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
