'use client';

import type { ReactNode, RefObject } from 'react';

import { createPortal } from 'react-dom';

import useAnchoredPanel from '@/components/calculator/useAnchoredPanel';

import { PANEL_GAP, type PanelWidthMode } from '@/utils/anchoredPanelPosition';
import type { DropdownPlacement } from '@/utils/dropdownPlacement';

interface AnchoredPanelProps {
  /** The trigger the panel hangs off; its box drives the panel's position and width. */
  anchorRef: RefObject<HTMLElement>;
  children: ReactNode;
  /** The panel's own look — border, background, width caps. Positioning is ours. */
  className?: string;
  /** Distance between the trigger and the panel, in pixels. */
  gap?: number;
  /** Set on the panel element so outside-click checks can reach through the portal. */
  panelRef: RefObject<HTMLDivElement>;
  placement: DropdownPlacement;
  widthMode: PanelWidthMode;
}

/**
 * A floating panel rendered into `document.body` instead of next to its trigger.
 *
 * Positioned in place, a panel is clipped by any ancestor with `overflow-hidden`
 * — and cards here have it for their rounded corners, so an option list that
 * flipped above its trigger got sliced off at the card's top edge. Escaping to
 * the body removes every clipping ancestor at once, which is the only fix that
 * doesn't ask each card to choose between its corners and its dropdowns.
 *
 * Portalling keeps the accessibility wiring intact: `aria-controls`,
 * `aria-labelledby` and `aria-expanded` resolve by id across the document, and
 * the panels close on Tab so focus order never jumps to the end of the page.
 *
 * This is placement only — roles stay with the caller, which knows whether it
 * is opening a listbox or a calendar. `z-50` matches the sticky header, and the
 * portal is appended after it, so an open panel wins the overlap.
 */
export default function AnchoredPanel({
  anchorRef,
  children,
  className,
  gap = PANEL_GAP,
  panelRef,
  placement,
  widthMode,
}: AnchoredPanelProps) {
  const style = useAnchoredPanel({ anchorRef, gap, placement, widthMode });

  return createPortal(
    <div className={`fixed z-50 ${className ?? ''}`} ref={panelRef} style={style ?? undefined}>
      {children}
    </div>,
    document.body,
  );
}
