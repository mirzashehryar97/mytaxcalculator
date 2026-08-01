import Link from 'next/link';

import EmeraldGridOverlay from '@/components/ui/EmeraldGridOverlay';

import { ABOUT_CTA_COPY } from '@/features/about/lib/content';

export default function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-[#064e3b]" aria-labelledby="about-cta-heading">
      <EmeraldGridOverlay />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-14">
        <div>
          <h2
            id="about-cta-heading"
            className="font-bold text-2xl text-white tracking-tight sm:text-3xl"
          >
            {ABOUT_CTA_COPY.title}
          </h2>
          <p className="mt-4 max-w-md text-base text-emerald-50/85 leading-relaxed">
            {ABOUT_CTA_COPY.description}
          </p>
        </div>

        <Link
          href={ABOUT_CTA_COPY.button.href}
          className="inline-flex shrink-0 items-center justify-center self-start rounded-lg bg-white px-7 py-3.5 font-semibold text-emerald-800 text-sm shadow-emerald-950/20 shadow-lg transition-colors hover:bg-emerald-50 sm:text-base lg:self-auto"
        >
          {ABOUT_CTA_COPY.button.label}
        </Link>
      </div>
    </section>
  );
}
