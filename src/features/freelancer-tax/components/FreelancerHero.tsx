import { Megaphone, ShieldCheck } from 'lucide-react';

import { FREELANCER_PAGE_COPY } from '@/features/freelancer-tax/lib/content';

export default function FreelancerHero() {
  return (
    <header className="mx-auto mb-8 max-w-4xl animate-fade-up text-center sm:mb-10">
      <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-emerald-50 text-xs backdrop-blur-sm sm:text-sm">
        <Megaphone className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
        {FREELANCER_PAGE_COPY.eyebrow}
      </span>
      <h1 className="mt-5 text-balance font-bold text-4xl text-white tracking-tight sm:text-5xl">
        {FREELANCER_PAGE_COPY.title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-emerald-50/80 text-lg leading-relaxed">
        {FREELANCER_PAGE_COPY.subtitle}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {FREELANCER_PAGE_COPY.badges.map((badge, index) => (
          <span
            key={badge}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-semibold text-sm ${
              index === 0
                ? 'border-white bg-white text-emerald-700 shadow-sm'
                : 'border-white/20 bg-white/5 text-emerald-50'
            }`}
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {badge}
          </span>
        ))}
      </div>
    </header>
  );
}
