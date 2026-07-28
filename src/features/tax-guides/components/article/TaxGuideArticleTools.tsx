import Link from 'next/link';

import { ArrowRight, ExternalLink } from 'lucide-react';

import type { TaxGuideArticleTool } from '@/features/tax-guides/types';

interface TaxGuideArticleToolsProps {
  title?: string;
  tools: readonly TaxGuideArticleTool[];
}

export default function TaxGuideArticleTools({
  title = 'Helpful tools',
  tools,
}: TaxGuideArticleToolsProps) {
  return (
    <section className="rounded-xl border-[1.5px] border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="px-1 font-bold text-[#0b1736] text-xl">{title}</h2>
      <div className="mt-4 space-y-2.5">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <Link
              key={tool.id}
              href={tool.href}
              target={tool.external ? '_blank' : undefined}
              rel={tool.external ? 'noopener noreferrer' : undefined}
              className="group flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50/40"
            >
              <Icon className="h-6 w-6 shrink-0 text-emerald-800" aria-hidden="true" />
              <span className="min-w-0 flex-1 text-sm leading-5">{tool.label}</span>
              {tool.external ? (
                <ExternalLink className="h-4 w-4 shrink-0 text-emerald-800" aria-hidden="true" />
              ) : (
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-emerald-800 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
