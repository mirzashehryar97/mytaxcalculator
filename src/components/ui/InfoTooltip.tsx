import { Info } from 'lucide-react';

interface InfoTooltipProps {
  /** Accessible name for the trigger, e.g. "What does surcharge mean?". */
  label: string;
  /** Plain-language explanation shown on hover, focus, or tap. */
  text: string;
}

/**
 * Small info icon that reveals a plain-language explanation of a term on hover,
 * keyboard focus, or tap. CSS-only (group-hover / focus-within) so it stays a
 * presentational primitive with no client-side state.
 */
export default function InfoTooltip({ label, text }: InfoTooltipProps) {
  return (
    <span className="group relative inline-flex align-middle">
      <button
        type="button"
        aria-label={label}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        role="tooltip"
        className="-translate-x-1/2 pointer-events-none absolute top-full left-1/2 z-30 mt-2 w-56 max-w-[15rem] rounded-lg bg-gray-900 px-3 py-2 text-left font-normal text-white text-xs leading-relaxed opacity-0 shadow-lg transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
