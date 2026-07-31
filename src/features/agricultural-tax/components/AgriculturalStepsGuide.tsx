import { Calculator, LandPlot, Layers, Wallet } from 'lucide-react';

import { AGRICULTURAL_STEPS_COPY } from '@/features/agricultural-tax/lib/content';

const STEP_ICONS = [Wallet, Calculator, Layers, LandPlot];

export default function AgriculturalStepsGuide() {
  return (
    <section
      id="agricultural-steps"
      className="mt-12 scroll-mt-24 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="agricultural-steps-heading"
    >
      <h2
        id="agricultural-steps-heading"
        className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
      >
        {AGRICULTURAL_STEPS_COPY.title}
      </h2>
      <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">
        {AGRICULTURAL_STEPS_COPY.description}
      </p>

      <ol className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {AGRICULTURAL_STEPS_COPY.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Wallet;

          return (
            <li
              key={step.id}
              className="min-w-0 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 sm:p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 ring-1 ring-emerald-200/70">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-bold text-emerald-950">
                <span className="text-emerald-600">{index + 1}.</span> {step.title}
              </h3>
              <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
