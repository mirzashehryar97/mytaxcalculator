import type { ReactNode } from 'react';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import EmeraldGridOverlay from '@/components/ui/EmeraldGridOverlay';
import type { PolicyHeroCopy, PolicyTrustBadge } from '@/components/ui/policy/types';

interface PolicyHeroProps {
  copy: PolicyHeroCopy;
  trustBadges: readonly PolicyTrustBadge[];
  summary: ReactNode;
}

export default function PolicyHero({ copy, trustBadges, summary }: PolicyHeroProps) {
  return (
    <header className="relative overflow-hidden bg-[#064e3b]">
      <EmeraldGridOverlay />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.5rem]">
        <nav
          className="flex items-center gap-2 text-emerald-100/80 text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span aria-current="page" className="font-medium text-white">
            {copy.breadcrumb}
          </span>
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-14">
          <div>
            <p className="font-bold text-emerald-300 text-xs uppercase tracking-[0.18em] sm:text-sm">
              {copy.eyebrow}
            </p>

            <h1 className="mt-4 font-bold text-4xl text-white leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {copy.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-2xl text-base text-emerald-50/85 leading-relaxed sm:text-lg">
              {copy.description}
            </p>

            <p className="mt-6 inline-flex rounded-full border border-emerald-300/25 bg-emerald-950/25 px-4 py-2 font-semibold text-emerald-100 text-xs uppercase tracking-[0.12em]">
              {copy.reviewedLabel}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;

                return (
                  <li key={badge.id} className="flex items-center gap-2.5 text-emerald-50 text-sm">
                    <Icon className="h-5 w-5 shrink-0 text-emerald-100/90" aria-hidden="true" />
                    {badge.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:block">{summary}</div>
        </div>
      </div>
    </header>
  );
}
