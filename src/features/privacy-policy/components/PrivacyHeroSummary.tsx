import { ShieldCheck } from 'lucide-react';

import { PRIVACY_HERO_COPY, PRIVACY_HERO_FACTS } from '@/features/privacy-policy/lib/content';

export default function PrivacyHeroSummary() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-5">
      <dl className="space-y-3">
        {PRIVACY_HERO_FACTS.map((fact) => (
          <div
            key={fact.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4"
          >
            <dt className="font-semibold text-slate-600 text-sm">{fact.label}</dt>
            <dd
              className={`text-right font-bold text-sm ${
                fact.tone === 'positive' ? 'text-emerald-700' : 'text-slate-900'
              }`}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 flex items-start gap-2 px-1 text-gray-500 text-xs sm:text-[13px]">
        <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
        {PRIVACY_HERO_COPY.summaryNote}
      </p>
    </div>
  );
}
