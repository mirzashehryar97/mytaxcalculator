export type TooltipAlignment = 'center' | 'start' | 'end';

/** Mirrors the bubble's own `w-56` so the maths and the CSS can't drift apart. */
export const TOOLTIP_WIDTH = 224;

/** Breathing room kept between the bubble and whatever edge would otherwise cut it. */
const EDGE_GUTTER = 8;

interface HorizontalBounds {
  left: number;
  right: number;
}

/**
 * Narrows the viewport down to the nearest ancestor that clips or scrolls
 * horizontally, so a bubble inside a scrolling rate table is measured against
 * that table rather than against the page.
 */
export function getClippingBounds(trigger: HTMLElement, viewportWidth: number): HorizontalBounds {
  let node = trigger.parentElement;

  while (node) {
    if (getComputedStyle(node).overflowX !== 'visible') {
      const rect = node.getBoundingClientRect();

      return { left: Math.max(0, rect.left), right: Math.min(viewportWidth, rect.right) };
    }

    node = node.parentElement;
  }

  return { left: 0, right: viewportWidth };
}

/**
 * Centres the bubble on its trigger unless that would push it past an edge, in
 * which case it hangs off the near side instead of being sliced in half.
 */
export function getTooltipAlignment(
  triggerRect: DOMRect,
  bounds: HorizontalBounds,
  tooltipWidth: number = TOOLTIP_WIDTH,
): TooltipAlignment {
  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  const halfWidth = tooltipWidth / 2;

  if (triggerCenter + halfWidth > bounds.right - EDGE_GUTTER) {
    return 'end';
  }

  if (triggerCenter - halfWidth < bounds.left + EDGE_GUTTER) {
    return 'start';
  }

  return 'center';
}
