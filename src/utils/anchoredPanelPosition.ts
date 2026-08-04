import type { DropdownPlacement } from '@/utils/dropdownPlacement';

/**
 * How wide a floating panel sits relative to the trigger it hangs off.
 *
 * - `match` — exactly the trigger's width, the way a full-width form field's
 *   option list lines up with the field.
 * - `min` — at least the trigger's width, wider when the content needs it.
 * - `auto` — the panel's own width; the trigger only fixes where its left edge
 *   starts.
 * - `center` — a fixed-width bubble centred on the trigger and pushed back
 *   inside the viewport when centring would hang it off an edge. What a tooltip
 *   wants: it explains the trigger, so it points at it rather than lining up
 *   with it.
 */
export type PanelWidthMode = 'auto' | 'center' | 'match' | 'min';

/** Default distance between a trigger and the panel floating off it, in pixels. */
export const PANEL_GAP = 4;

/** Breathing room kept between a centred panel and the edge that would cut it. */
const EDGE_GUTTER = 8;

export interface AnchoredPanelStyle {
  left: number;
  top?: number;
  bottom?: number;
  width?: number;
  minWidth?: number;
}

interface AnchoredPanelOptions {
  anchorRect: DOMRect;
  gap: number;
  /** Only read in `center` mode; defaults to the trigger's own width. */
  panelWidth?: number;
  placement: DropdownPlacement;
  viewportHeight: number;
  viewportWidth: number;
  widthMode: PanelWidthMode;
}

/**
 * Turns a trigger's viewport box into `position: fixed` coordinates for the
 * panel that floats off it.
 *
 * Fixed rather than absolute because the panel is portalled to the body. Left
 * next to its trigger, any ancestor with `overflow-hidden` between the two —
 * a rounded card, a bordered table wrapper — slices the panel off at that
 * ancestor's edge. Measuring against the viewport instead means no card has to
 * give up its rounded corners to keep a dropdown whole.
 *
 * A panel flipped above its trigger is pinned by its *bottom* edge, so it never
 * has to be measured first: however tall it turns out, it still ends just above
 * the trigger.
 */
export function getAnchoredPanelStyle({
  anchorRect,
  gap,
  panelWidth,
  placement,
  viewportHeight,
  viewportWidth,
  widthMode,
}: AnchoredPanelOptions): AnchoredPanelStyle {
  const vertical =
    placement === 'above'
      ? { bottom: viewportHeight - anchorRect.top + gap }
      : { top: anchorRect.bottom + gap };

  if (widthMode === 'match') {
    return { left: anchorRect.left, width: anchorRect.width, ...vertical };
  }

  if (widthMode === 'min') {
    return { left: anchorRect.left, minWidth: anchorRect.width, ...vertical };
  }

  if (widthMode === 'center') {
    // Narrow the bubble before placing it, so the clamp below always has room
    // to work with on a phone-width screen.
    const width = Math.min(panelWidth ?? anchorRect.width, viewportWidth - EDGE_GUTTER * 2);
    const centred = anchorRect.left + anchorRect.width / 2 - width / 2;
    const furthestLeft = viewportWidth - width - EDGE_GUTTER;

    return { left: Math.max(EDGE_GUTTER, Math.min(centred, furthestLeft)), width, ...vertical };
  }

  return { left: anchorRect.left, ...vertical };
}

/**
 * Whether a freshly measured position is the one already applied. Scrolling the
 * panel's own option list fires the same capture-phase listener that tracks the
 * page, so without this every wheel tick would re-render the panel.
 */
export function isSamePanelStyle(a: AnchoredPanelStyle, b: AnchoredPanelStyle): boolean {
  return (
    a.left === b.left &&
    a.top === b.top &&
    a.bottom === b.bottom &&
    a.width === b.width &&
    a.minWidth === b.minWidth
  );
}
