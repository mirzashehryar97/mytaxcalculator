import type { DropdownPlacement } from '@/utils/dropdownPlacement';

/**
 * How wide a floating panel sits relative to the trigger it hangs off.
 *
 * - `match` — exactly the trigger's width, the way a full-width form field's
 *   option list lines up with the field.
 * - `min` — at least the trigger's width, wider when the content needs it.
 * - `auto` — the panel's own width; the trigger only fixes where its left edge
 *   starts.
 */
export type PanelWidthMode = 'auto' | 'match' | 'min';

/** Default distance between a trigger and the panel floating off it, in pixels. */
export const PANEL_GAP = 4;

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
  placement: DropdownPlacement;
  viewportHeight: number;
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
  placement,
  viewportHeight,
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
