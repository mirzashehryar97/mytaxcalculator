import { CHARITY_HADITH, HADITH_MARK } from '@/lib/islamicContent';

/**
 * Single-line hadith strip that closes every page, sitting between the page
 * body and the footer. Shares the sand/gold treatment used for the hero verse
 * ribbon so religious content reads the same everywhere on the site.
 *
 * As in the mockup, the Arabic runs to the right edge of the strip (it is a
 * full-width RTL block) with the English rendering below it on the left.
 */
export default function ClosingHadithStrip() {
  return (
    <aside className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 rounded-xl border border-[#e8dfc5] bg-[#faf6ec] px-5 py-4 sm:gap-5 sm:px-6 sm:py-5">
        <span
          aria-hidden="true"
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-[#e0d3ac] bg-[#f1e7cd] font-arabic font-bold text-[#8c7434] text-[17px] leading-none sm:h-11 sm:w-11 sm:rounded-xl sm:text-[20px]"
        >
          {HADITH_MARK}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="font-arabic text-[#3b3320] text-[22px] leading-[1.7] sm:text-[25px]"
            dir="rtl"
            lang="ar"
          >
            {CHARITY_HADITH.arabic}
          </p>
          <p className="mt-1 text-[#4a4433] text-[14px] leading-[1.55] sm:text-[15px]">
            &ldquo;{CHARITY_HADITH.translation}&rdquo;{' '}
            <span className="font-semibold text-[#8c7434]">&mdash; {CHARITY_HADITH.citation}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
