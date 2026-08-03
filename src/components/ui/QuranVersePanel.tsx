import type { IslamicText } from '@/lib/islamicContent';

interface QuranVersePanelProps {
  /** Optional line tying the verse to the figure on screen. Desktop only. */
  note?: string;
  verse: IslamicText;
}

/**
 * Deep-green inset carrying one verse inside a result card — a deliberate pause
 * between the result and the actions below it, rather than another tinted panel
 * competing with them.
 *
 * From `sm` up the verse sits left (Arabic, brass hairline, translation) with the
 * citation and `note` right-aligned beside it. Below that it centres and stacks,
 * and the note drops out so the panel stays short on a phone.
 *
 * Type is scaled up from the mockup, whose card was 790px with a 16px headline
 * where ours is 896px with an 18px one.
 */
export default function QuranVersePanel({ note, verse }: QuranVersePanelProps) {
  return (
    <aside className="relative overflow-hidden rounded-2xl bg-[#0b3b2c] px-5 py-5 sm:px-6 sm:py-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(185,155,77,0.18),transparent_60%)] sm:bg-[radial-gradient(110%_130%_at_8%_0%,rgba(185,155,77,0.16),transparent_58%)]"
      />

      <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-[22px] sm:text-left">
        <div className="min-w-0 sm:flex-1">
          <p
            className="font-arabic text-[#f4ead1] text-[24px] leading-[1.8] sm:whitespace-nowrap sm:text-[30px] sm:leading-[1.7]"
            dir="rtl"
            lang="ar"
          >
            {verse.arabic}
          </p>
          <span
            aria-hidden="true"
            className="mx-auto my-2.5 block h-px w-[34px] bg-[rgba(216,201,160,0.5)] sm:mx-0 sm:my-3 sm:w-11"
          />
          <p className="text-[#e7ddc6] text-[14px] leading-[1.6] sm:text-base sm:leading-[1.55]">
            &ldquo;{verse.translation}&rdquo;
          </p>
        </div>

        <div className="mt-2 sm:mt-0 sm:flex-none sm:text-right">
          <p className="font-semibold text-[#c4a95f] text-[11px] leading-none tracking-[0.06em] sm:mb-[9px] sm:text-xs sm:tracking-[0.07em]">
            {verse.citation}
          </p>
          {note ? (
            <p className="hidden text-[#8fb3a3] text-[13px] leading-[1.6] sm:block sm:max-w-[200px]">
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
