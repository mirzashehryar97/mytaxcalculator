import Image from 'next/image';

import { Linkedin, Twitter } from 'lucide-react';

import BrandWordmark from '@/components/layout/BrandWordmark';
import FooterLinkColumn from '@/components/layout/FooterLinkColumn';
import {
  FOOTER_COPY,
  FOOTER_EXTERNAL_LINKS,
  FOOTER_GUIDE_LINKS,
  FOOTER_PUBLISHER_LINKS,
  FOOTER_QUICK_LINKS,
} from '@/components/layout/footerContent';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-white/10 border-t bg-[#052518] bg-[radial-gradient(circle_at_10%_0%,rgba(20,184,166,0.14),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(16,185,129,0.11),transparent_34%),linear-gradient(135deg,#031b12_0%,#083f2e_46%,#031b12_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <div className="flex items-center">
              <Image
                src="/main-logo.png"
                alt="My Tax Calculator — Pakistan tax calculator"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="ml-2.5">
                <BrandWordmark tone="light" />
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-slate-300 transition-colors hover:border-emerald-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="LinkedIn"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-slate-300 transition-colors hover:border-emerald-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <FooterLinkColumn title={FOOTER_COPY.quickLinksTitle} links={FOOTER_QUICK_LINKS} />

          <FooterLinkColumn
            title={FOOTER_COPY.guidesTitle}
            links={FOOTER_GUIDE_LINKS}
            externalLinks={FOOTER_EXTERNAL_LINKS}
          />

          <FooterLinkColumn title={FOOTER_COPY.publishersTitle} links={FOOTER_PUBLISHER_LINKS} />
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
