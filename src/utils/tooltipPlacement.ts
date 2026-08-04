import type { DropdownPlacement } from '@/utils/dropdownPlacement';
import { getDropdownPlacement } from '@/utils/dropdownPlacement';

/**
 * How wide a tooltip bubble gets before its text wraps. Applied as a measured
 * width rather than a Tailwind class: the centring maths needs the number
 * anyway, and one source of truth beats a constant mirroring a class.
 */
export const TOOLTIP_WIDTH = 224;

/** Distance between the term and the bubble explaining it, in pixels. */
export const TOOLTIP_GAP = 8;

/**
 * Roughly the tallest these explanations get at `TOOLTIP_WIDTH` — six lines of
 * `text-xs leading-relaxed` plus the bubble's own padding. Only the decision to
 * flip needs it; a flipped bubble is pinned by its bottom edge, so its real
 * height never has to be measured.
 */
const TOOLTIP_HEIGHT = 160;

/**
 * Puts the bubble below the term it explains, and above it when the term sits
 * too close to the bottom of the screen to show it underneath.
 */
export function getTooltipPlacement(
  triggerRect: DOMRect,
  viewportHeight: number,
): DropdownPlacement {
  return getDropdownPlacement(triggerRect, viewportHeight, TOOLTIP_HEIGHT);
}
