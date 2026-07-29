import { ArrowDown, ArrowRight, BadgePercent, Calculator, Clock3 } from 'lucide-react';

import { PROGRESSIVE_TAX_STEPS } from '@/features/salary-tax/lib/insightsContent';

const STEP_ICONS = {
  rate: BadgePercent,
  split: Clock3,
  total: Calculator,
} as const;

export default function ProgressiveTaxExplainer() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
      <p className="mb-3 font-semibold text-gray-700 text-sm">Progressive tax, simplified</p>
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {PROGRESSIVE_TAX_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[step.id];

          return (
            <div key={step.id} className="contents">
              <div className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 px-3 py-2 text-center text-gray-700 text-xs">
                <Icon aria-hidden className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{step.label}</span>
              </div>
              {index < PROGRESSIVE_TAX_STEPS.length - 1 && (
                <>
                  <ArrowRight aria-hidden className="hidden h-5 w-5 text-emerald-600 sm:block" />
                  <ArrowDown aria-hidden className="mx-auto h-5 w-5 text-emerald-600 sm:hidden" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
