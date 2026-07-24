import Image from 'next/image';

import { Linkedin, Twitter } from 'lucide-react';

import FooterLinkColumn from '@/components/layout/FooterLinkColumn';
import {
  FOOTER_CALCULATOR_LINKS,
  FOOTER_COPY,
  FOOTER_EXTERNAL_LINKS,
  FOOTER_GUIDE_LINKS,
  FOOTER_QUICK_LINKS,
} from '@/components/layout/footerContent';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-white/10 border-t bg-emerald-950/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center">
              <Image
                src="/main-logo.png"
                alt="My Tax Calculator — Pakistan tax calculator"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="ml-2.5 font-extrabold text-white text-xl tracking-tight">
                My Tax Calculator
              </span>
            </div>
            <p className="mt-4 max-w-md text-emerald-100/70 text-sm leading-relaxed">
              {FOOTER_COPY.description}
            </p>
            <div className="mt-5 flex space-x-3">
              <button
                type="button"
                aria-label="Twitter"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-emerald-100 transition-colors hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="LinkedIn"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-emerald-100 transition-colors hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <FooterLinkColumn title={FOOTER_COPY.quickLinksTitle} links={FOOTER_QUICK_LINKS} />

          <FooterLinkColumn title={FOOTER_COPY.calculatorsTitle} links={FOOTER_CALCULATOR_LINKS} />

          <FooterLinkColumn
            title={FOOTER_COPY.guidesTitle}
            links={FOOTER_GUIDE_LINKS}
            externalLinks={FOOTER_EXTERNAL_LINKS}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-white/10 border-t pt-8 md:flex-row">
          <p className="text-emerald-100/60 text-sm">
            &copy; {FOOTER_COPY.copyrightYear} {FOOTER_COPY.copyrightLabel}
          </p>
          <p className="text-emerald-100/60 text-sm">{FOOTER_COPY.locationLabel}</p>
        </div>
      </div>
    </footer>
  );
}
