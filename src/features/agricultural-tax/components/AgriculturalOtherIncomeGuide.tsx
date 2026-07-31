import { Building2, FileText, Receipt, ShieldCheck } from 'lucide-react';

import { AGRICULTURAL_OTHER_INCOME_COPY } from '@/features/agricultural-tax/lib/content';

const POINT_ICONS = [ShieldCheck, Building2, FileText, Receipt];

export default function AgriculturalOtherIncomeGuide() {
  return (
    <section
      id="agricultural-other-income"
      className="mt-12 scroll-mt-24 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="agricultural-other-income-heading"
    >
      <h2
        id="agricultural-other-income-heading"
        className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
      >
        {AGRICULTURAL_OTHER_INCOME_COPY.title}
      </h2>
      <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">
        {AGRICULTURAL_OTHER_INCOME_COPY.description}
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {AGRICULTURAL_OTHER_INCOME_COPY.points.map((point, index) => {
          const Icon = POINT_ICONS[index] ?? ShieldCheck;

          return (
            <li
              key={point.id}
              className="flex min-w-0 gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 ring-1 ring-emerald-200/70">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <strong className="block font-bold text-gray-900">{point.title}</strong>
                <span className="mt-1 block text-gray-600 text-sm leading-relaxed">
                  {point.body}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
