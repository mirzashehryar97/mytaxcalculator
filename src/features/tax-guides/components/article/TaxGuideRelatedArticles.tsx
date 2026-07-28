import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import type { TaxGuideRelatedArticle } from '@/features/tax-guides/types';

interface TaxGuideRelatedArticlesProps {
  number?: number;
  title: string;
  description: string;
  articles: readonly TaxGuideRelatedArticle[];
}

export default function TaxGuideRelatedArticles({
  number,
  title,
  description,
  articles,
}: TaxGuideRelatedArticlesProps) {
  return (
    <section aria-labelledby="continue-learning-heading">
      <h2
        id="continue-learning-heading"
        className="font-bold text-[#0b1736] text-xl sm:text-[1.4rem]"
      >
        {number ? <span aria-hidden="true">{number}. </span> : null}
        {title}
      </h2>
      <p className="mt-1 text-slate-600 text-sm sm:text-[15px]">{description}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {articles.map((article) => {
          const Icon = article.icon;

          return (
            <Link
              key={article.id}
              href={article.href}
              className="group flex min-h-28 items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-600 hover:shadow-md"
            >
              <Icon className="h-12 w-12 shrink-0 text-emerald-800" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="font-bold text-[#0b1736] text-base sm:text-[17px]">
                  {article.title}
                </h3>
                <p className="mt-1 text-slate-600 text-sm leading-5">{article.description}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 font-semibold text-[13px] text-emerald-800">
                  Read guide
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
