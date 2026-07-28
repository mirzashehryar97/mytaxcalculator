import Link from 'next/link';

import { ArrowRight, Clock3 } from 'lucide-react';

import type { TaxGuideCardContent } from '@/features/tax-guides/types';

interface EssentialGuideCardProps {
  guide: TaxGuideCardContent;
}

export default function EssentialGuideCard({ guide }: EssentialGuideCardProps) {
  const Icon = guide.icon;
  const cardClass = guide.featured
    ? 'border-[1.5px] border-emerald-700 bg-[#f2f8f5] shadow-emerald-900/10'
    : 'border-[1.5px] border-slate-300 bg-white shadow-slate-900/5 hover:border-emerald-400';
  const buttonClass = guide.featured
    ? 'border-[1.5px] border-emerald-800 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white group-hover:from-emerald-800 group-hover:to-emerald-900'
    : 'border-[1.5px] border-emerald-800 bg-white text-emerald-900 group-hover:bg-emerald-50';

  return (
    <Link
      href={guide.href}
      className={`group hover:-translate-y-1 block rounded-xl shadow-sm transition duration-200 hover:shadow-lg md:h-[320px] lg:h-[330px] ${cardClass}`}
    >
      <div className="flex h-full flex-col overflow-hidden p-3 sm:p-5 md:p-3 lg:p-5">
        <Icon
          className="h-auto w-[clamp(3rem,calc(13%+1rem),5.5rem)] shrink-0 text-emerald-800"
          aria-hidden="true"
        />
        <h3 className="mt-3 text-balance font-bold text-base text-slate-900 leading-tight tracking-tight sm:mt-5 sm:text-lg md:mt-3 md:text-base lg:mt-5 lg:text-lg">
          {guide.title}
        </h3>
        <p className="mt-2 flex-1 text-slate-600 text-xs leading-[18px] sm:mt-3 sm:text-sm sm:leading-relaxed md:mt-2 md:text-xs md:leading-[18px] lg:mt-3 lg:text-sm lg:leading-relaxed">
          {guide.description}
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-900 text-xs sm:mt-3 md:mt-2 lg:mt-3">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          {guide.readingTime}
        </span>
        <span
          className={`mt-2.5 flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-xs transition-colors sm:mt-4 sm:min-h-11 sm:py-2.5 sm:text-sm md:mt-2.5 md:min-h-10 md:py-2 md:text-xs lg:mt-4 lg:min-h-11 lg:py-2.5 lg:text-sm ${buttonClass}`}
        >
          Read guide
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
