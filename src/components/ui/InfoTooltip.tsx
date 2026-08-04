'use client';

import { useId } from 'react';

import { Info } from 'lucide-react';

import HoverTooltip from '@/components/ui/HoverTooltip';
import useHoverTooltip from '@/components/ui/useHoverTooltip';

interface InfoTooltipProps {
  /** Accessible name for the trigger, e.g. "What does surcharge mean?". */
  label: string;
  /** Plain-language explanation shown on hover, focus, or tap. */
  text: string;
}

/**
 * Small info icon that reveals a plain-language explanation of a term on hover,
 * keyboard focus, or tap. The bubble is portalled out to the page body, so a
 * term sitting at the edge of a card — or near the bottom of the screen — gets
 * its whole explanation rather than the slice the card allows.
 *
 * `aria-describedby` is wired only while the bubble is mounted, which is the
 * point at which the element it names exists.
 */
export default function InfoTooltip({ label, text }: InfoTooltipProps) {
  const tooltip = useHoverTooltip<HTMLButtonElement>();
  const tooltipId = useId();

  return (
    <span className="inline-flex align-middle">
      <button
        type="button"
        ref={tooltip.triggerRef}
        aria-describedby={tooltip.isOpen ? tooltipId : undefined}
        aria-label={label}
        onBlur={tooltip.close}
        onFocus={tooltip.open}
        onPointerEnter={tooltip.open}
        onPointerLeave={tooltip.close}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>
      {tooltip.isOpen ? (
        <HoverTooltip
          anchorRef={tooltip.triggerRef}
          id={tooltipId}
          placement={tooltip.placement}
          text={text}
        />
      ) : null}
    </span>
  );
}
