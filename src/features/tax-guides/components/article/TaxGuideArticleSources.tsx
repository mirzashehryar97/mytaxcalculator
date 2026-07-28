import { ExternalLink, ShieldCheck } from 'lucide-react';

import type { TaxGuideArticleSource } from '@/features/tax-guides/types';

interface TaxGuideArticleSourcesProps {
  sources: readonly TaxGuideArticleSource[];
}

export default function TaxGuideArticleSources({ sources }: TaxGuideArticleSourcesProps) {
  return (
    <section className="flex gap-3 rounded-xl border-[1.5px] border-slate-200 bg-[#f7faf8] p-4 shadow-sm">
      <ShieldCheck className="h-7 w-7 shrink-0 text-emerald-800" aria-hidden="true" />
      <div>
        <h2 className="font-semibold text-slate-700 text-sm">Official sources</h2>
        <ul className="mt-1 space-y-1">
          {sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] text-slate-700 leading-5 hover:text-emerald-800 hover:underline"
              >
                {source.label}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-1 text-[13px] text-slate-600">Federal Board of Revenue (FBR)</p>
      </div>
    </section>
  );
}
