import { ShieldCheck } from 'lucide-react';

import { ABOUT_HERO_COPY, ABOUT_PREVIEW_ROWS } from '@/features/about/lib/content';
import { ABOUT_PREVIEW_TONE_STYLES } from '@/features/about/lib/presentation';

/** Static illustration of a calculator result — placeholder amounts, no real numbers. */
export default function AboutHeroPreview() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-5">
      <div className="space-y-3">
        {ABOUT_PREVIEW_ROWS.map((row) => {
          const tone = ABOUT_PREVIEW_TONE_STYLES[row.tone];

          return (
            <div
              key={row.id}
              className={`flex items-center justify-between gap-4 rounded-xl px-4 py-4 ${tone.row}`}
            >
              <div className="min-w-0">
                <p className={`font-semibold text-sm ${tone.label}`}>{row.label}</p>
                <p className="mt-1 text-gray-500 text-xs sm:text-sm">{row.note}</p>
              </div>
              <span
                className={`shrink-0 font-bold text-base tracking-[0.22em] sm:text-lg ${tone.dashes}`}
                aria-hidden="true"
              >
                ------
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 flex items-start gap-2 px-1 text-gray-500 text-xs sm:text-[13px]">
        <ShieldCheck className="mt-px h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
        {ABOUT_HERO_COPY.previewNote}
      </p>
    </div>
  );
}
