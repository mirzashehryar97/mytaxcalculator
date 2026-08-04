export interface OptionTooltipPosition {
  /** Offset from the panel's left edge, in pixels; the tooltip is centred on it. */
  left: number;
  /** Offset from the panel's top edge, in pixels. */
  top: number;
  placement: 'above' | 'below';
  width: number;
}

const MAX_TOOLTIP_WIDTH = 240;
const VIEWPORT_MARGIN = 12;
const OPTION_GAP = 8;
/** Below this distance from the top of the screen a tooltip above would be cut off. */
const FLIP_BELOW_THRESHOLD = 150;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/**
 * Places a blocked option's tooltip next to that option while keeping it on
 * screen: it is measured against the viewport, then expressed relative to the
 * panel it is rendered inside, so no fixed positioning is needed.
 *
 * The panel, not the trigger — the tooltip's containing block is the panel it
 * sits in, and the two no longer share an origin now that the panel is
 * portalled to the body.
 */
export function getOptionTooltipPosition(
  optionRect: DOMRect,
  panelRect: DOMRect,
  viewportWidth: number,
): OptionTooltipPosition {
  const width = Math.min(MAX_TOOLTIP_WIDTH, viewportWidth - VIEWPORT_MARGIN * 2);
  const halfWidth = width / 2;
  const centre = clamp(
    optionRect.left + optionRect.width / 2,
    VIEWPORT_MARGIN + halfWidth,
    viewportWidth - VIEWPORT_MARGIN - halfWidth,
  );
  const placement = optionRect.top < FLIP_BELOW_THRESHOLD ? 'below' : 'above';
  const anchorY =
    placement === 'below' ? optionRect.bottom + OPTION_GAP : optionRect.top - OPTION_GAP;

  return {
    left: centre - panelRect.left,
    top: anchorY - panelRect.top,
    placement,
    width,
  };
}
