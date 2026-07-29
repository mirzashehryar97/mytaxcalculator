import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import AboutGridOverlay from '@/features/about/components/AboutGridOverlay';
import AboutHeroPreview from '@/features/about/components/AboutHeroPreview';
import { ABOUT_HERO_COPY, ABOUT_TRUST_BADGES } from '@/features/about/lib/content';

export default function AboutHero() {
  return (
    <header className="relative overflow-hidden bg-[#064e3b]">
      <AboutGridOverlay />

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
            {ABOUT_HERO_COPY.breadcrumb}
          </span>
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-14">
          <div>
            <p className="font-bold text-emerald-300 text-xs uppercase tracking-[0.18em] sm:text-sm">
              {ABOUT_HERO_COPY.eyebrow}
            </p>

            <h1 className="mt-4 font-bold text-4xl text-white leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {ABOUT_HERO_COPY.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-xl text-base text-emerald-50/85 leading-relaxed sm:text-lg">
              {ABOUT_HERO_COPY.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={ABOUT_HERO_COPY.primaryCta.href}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 text-sm shadow-emerald-950/20 shadow-lg transition-colors hover:bg-emerald-50 sm:text-base"
              >
                {ABOUT_HERO_COPY.primaryCta.label}
              </Link>
              <Link
                href={ABOUT_HERO_COPY.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-lg border border-white/80 px-6 py-3 font-semibold text-sm text-white transition-colors hover:bg-white/10 sm:text-base"
              >
                {ABOUT_HERO_COPY.secondaryCta.label}
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 sm:mt-10">
              {ABOUT_TRUST_BADGES.map((badge) => {
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

          {/* Preview card is desktop-only — below lg the hero copy stands on its own. */}
          <div className="hidden lg:block">
            <AboutHeroPreview />
          </div>
        </div>
      </div>
    </header>
  );
}
