import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import TaxGuideArticleActions from '@/features/tax-guides/components/article/TaxGuideArticleActions';
import type { TaxGuideArticleHeroContent } from '@/features/tax-guides/types';

interface TaxGuideArticleHeroProps {
  content: TaxGuideArticleHeroContent;
  printLabel?: string;
}

export default function TaxGuideArticleHero({ content, printLabel }: TaxGuideArticleHeroProps) {
  return (
    <header className="rounded-xl border-[1.5px] border-emerald-700 bg-[#f3f8f5] px-5 py-6 sm:px-7 sm:py-7 lg:px-10 lg:py-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] sm:text-sm">
        <Link href="/tax-guides" className="font-medium text-emerald-800 hover:underline">
          Tax Guides
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        <span className="text-slate-700">{content.breadcrumb}</span>
      </nav>

      <div className="mt-4 inline-flex rounded-full border border-emerald-600/50 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-900 text-xs uppercase tracking-wide">
        {content.badge}
      </div>

      <h1 className="mt-3 max-w-3xl font-bold text-[#0b1736] text-[2.15rem] leading-[1.12] tracking-tight sm:text-[2.55rem] lg:text-[2.85rem]">
        {content.title}
      </h1>
      <p className="mt-3 max-w-3xl text-base text-slate-700 leading-7 sm:text-[17px]">
        {content.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-700 text-xs sm:text-sm">
        {content.meta.map((item, index) => {
          const Icon = item.icon;
          let label = <span>{item.label}</span>;

          if (item.dateTime) {
            label = <time dateTime={item.dateTime}>{item.label}</time>;
          }

          if (item.href) {
            label = (
              <Link href={item.href} className="font-medium text-emerald-900 hover:underline">
                {item.label}
              </Link>
            );
          }

          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 ${index > 0 ? 'sm:border-slate-300 sm:border-l sm:pl-4' : ''}`}
            >
              <Icon className="h-4 w-4 text-emerald-800" aria-hidden="true" />
              {label}
            </div>
          );
        })}
      </div>

      <TaxGuideArticleActions printLabel={printLabel} primaryAction={content.primaryAction} />
    </header>
  );
}
