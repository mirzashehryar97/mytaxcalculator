import { ExternalLink, ShieldCheck } from 'lucide-react';

import {
  FREELANCER_GUIDE_COPY,
  FREELANCER_SOURCE_LINKS,
} from '@/features/freelancer-tax/lib/content';

export default function FreelancerSources() {
  return (
    <aside
      className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5 text-emerald-50 backdrop-blur-sm sm:p-6"
      aria-labelledby="freelancer-sources-heading"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
        <div>
          <h2 id="freelancer-sources-heading" className="font-bold text-lg text-white">
            {FREELANCER_GUIDE_COPY.sourcesTitle}
          </h2>
          <p className="mt-1 text-emerald-50/80 text-sm leading-relaxed">
            {FREELANCER_GUIDE_COPY.sourcesDescription}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {FREELANCER_SOURCE_LINKS.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-200 text-sm underline decoration-emerald-300/50 underline-offset-4 hover:text-white"
              >
                {source.label}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-emerald-100/70 text-xs">
            <time dateTime={FREELANCER_GUIDE_COPY.reviewedDateTime}>
              {FREELANCER_GUIDE_COPY.reviewedLabel}
            </time>
          </p>
        </div>
      </div>
    </aside>
  );
}
