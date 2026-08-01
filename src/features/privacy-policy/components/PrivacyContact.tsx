import { Mail } from 'lucide-react';

import EmeraldGridOverlay from '@/components/ui/EmeraldGridOverlay';

import { PRIVACY_CONTACT_COPY } from '@/features/privacy-policy/lib/content';

export default function PrivacyContact() {
  return (
    <section className="relative overflow-hidden bg-[#064e3b]" aria-labelledby="privacy-contact">
      <EmeraldGridOverlay />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-10 lg:px-12 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-bold text-emerald-300 text-xs uppercase tracking-[0.16em]">
              {PRIVACY_CONTACT_COPY.eyebrow}
            </p>
            <h2 id="privacy-contact" className="mt-3 font-bold text-2xl text-white sm:text-3xl">
              {PRIVACY_CONTACT_COPY.title}
            </h2>
            <p className="mt-4 max-w-2xl text-emerald-50/85 leading-relaxed">
              {PRIVACY_CONTACT_COPY.description}
            </p>
          </div>

          <a
            href={`mailto:${PRIVACY_CONTACT_COPY.email}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-white px-7 py-3.5 font-semibold text-emerald-800 shadow-emerald-950/20 shadow-lg transition-colors hover:bg-emerald-50 lg:self-auto"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {PRIVACY_CONTACT_COPY.buttonLabel}
          </a>
        </div>

        <p className="mt-8 border-white/10 border-t pt-5 text-emerald-100/65 text-xs leading-relaxed">
          {PRIVACY_CONTACT_COPY.note}
        </p>
      </div>
    </section>
  );
}
