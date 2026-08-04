'use client';

import type { RefObject } from 'react';

import AnchoredPanel from '@/components/calculator/AnchoredPanel';

import type { DropdownPlacement } from '@/utils/dropdownPlacement';
import { TOOLTIP_GAP, TOOLTIP_WIDTH } from '@/utils/tooltipPlacement';

interface HoverTooltipProps {
  /** The term or icon being explained; the bubble is centred on it. */
  anchorRef: RefObject<HTMLElement>;
  /** Matches the trigger's `aria-describedby` while the bubble is open. */
  id: string;
  placement: DropdownPlacement;
  text: string;
}

/**
 * The dark bubble explaining a term, rendered into `document.body` rather than
 * beside the term it belongs to.
 *
 * In place it was clipped by any card with `overflow-hidden` — and it hung off
 * `top-full` with no way to flip, so a term near the bottom of the screen threw
 * its explanation below the fold. Portalling fixes both: `AnchoredPanel` puts
 * it in viewport coordinates, centred on the term and pushed back inside the
 * screen at the edges, above the term when there is no room below.
 */
export default function HoverTooltip({ anchorRef, id, placement, text }: HoverTooltipProps) {
  return (
    <AnchoredPanel
      anchorRef={anchorRef}
      className="pointer-events-none animate-tooltip-in rounded-lg bg-gray-900 px-3 py-2 text-left font-normal text-white text-xs leading-relaxed shadow-lg"
      gap={TOOLTIP_GAP}
      panelWidth={TOOLTIP_WIDTH}
      placement={placement}
      widthMode="center"
    >
      <span id={id} role="tooltip">
        {text}
      </span>
    </AnchoredPanel>
  );
}
