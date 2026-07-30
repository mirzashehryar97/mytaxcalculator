'use client';

import { useCallback, useRef, useState } from 'react';

import { Info } from 'lucide-react';

import type { TooltipAlignment } from '@/utils/tooltipPlacement';
import { getClippingBounds, getTooltipAlignment } from '@/utils/tooltipPlacement';

interface InfoTooltipProps {
  /** Accessible name for the trigger, e.g. "What does surcharge mean?". */
  label: string;
  /** Plain-language explanation shown on hover, focus, or tap. */
  text: string;
}

const ALIGNMENT_CLASSES: Record<TooltipAlignment, string> = {
  center: '-translate-x-1/2 left-1/2',
  start: 'left-0',
  end: 'right-0',
};

/**
 * Small info icon that reveals a plain-language explanation of a term on hover,
 * keyboard focus, or tap. Showing and hiding stays CSS-only (group-hover /
 * focus-within); the only state is which side the bubble hangs off, measured
 * when the trigger is pointed at or focused so a term sitting at the edge of a
 * card isn't cut in half.
 */
export default function InfoTooltip({ label, text }: InfoTooltipProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [alignment, setAlignment] = useState<TooltipAlignment>('center');

  const align = useCallback(() => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const bounds = getClippingBounds(trigger, window.innerWidth);

    setAlignment(getTooltipAlignment(trigger.getBoundingClientRect(), bounds));
  }, []);

  return (
    <span className="group relative inline-flex align-middle">
      <button
        type="button"
        ref={triggerRef}
        aria-label={label}
        onPointerEnter={align}
        onFocus={align}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute top-full z-30 mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-lg bg-gray-900 px-3 py-2 text-left font-normal text-white text-xs leading-relaxed opacity-0 shadow-lg transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 ${ALIGNMENT_CLASSES[alignment]}`}
      >
        {text}
      </span>
    </span>
  );
}
