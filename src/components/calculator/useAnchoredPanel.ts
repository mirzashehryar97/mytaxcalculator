'use client';

import { type RefObject, useCallback, useEffect, useState } from 'react';

import {
  type AnchoredPanelStyle,
  getAnchoredPanelStyle,
  isSamePanelStyle,
  type PanelWidthMode,
} from '@/utils/anchoredPanelPosition';
import type { DropdownPlacement } from '@/utils/dropdownPlacement';

interface UseAnchoredPanelOptions {
  anchorRef: RefObject<HTMLElement>;
  gap: number;
  placement: DropdownPlacement;
  widthMode: PanelWidthMode;
}

/**
 * Keeps a portalled panel glued to the trigger it belongs to.
 *
 * The position is measured in the state initialiser rather than an effect: the
 * trigger is already on the page by the time an open panel mounts, so the very
 * first render can be placed correctly and nothing is ever painted in the wrong
 * spot. This only ever runs in the browser — panels mount on an interaction, so
 * `isOpen` is false for the whole server render.
 */
export default function useAnchoredPanel({
  anchorRef,
  gap,
  placement,
  widthMode,
}: UseAnchoredPanelOptions): AnchoredPanelStyle | null {
  const measure = useCallback((): AnchoredPanelStyle | null => {
    const anchor = anchorRef.current;

    if (!anchor) {
      return null;
    }

    return getAnchoredPanelStyle({
      anchorRect: anchor.getBoundingClientRect(),
      gap,
      placement,
      viewportHeight: window.innerHeight,
      widthMode,
    });
  }, [anchorRef, gap, placement, widthMode]);

  const [style, setStyle] = useState<AnchoredPanelStyle | null>(measure);

  useEffect(() => {
    const reposition = () => {
      const next = measure();

      setStyle((current) => (next && current && isSamePanelStyle(current, next) ? current : next));
    };

    reposition();

    // Capture phase: scrolling a container between the trigger and the page root
    // moves the trigger too, and those scroll events never reach the window.
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);

    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [measure]);

  return style;
}
