'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { DropdownPlacement } from '@/utils/dropdownPlacement';
import { getTooltipPlacement } from '@/utils/tooltipPlacement';

interface HoverTooltipState<T extends HTMLElement> {
  isOpen: boolean;
  /** Which side of the trigger the bubble hangs off, fixed when it opens. */
  placement: DropdownPlacement;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<T>;
}

/**
 * Open/closed state for a tooltip bubble, and which side of its trigger it
 * hangs off.
 *
 * This used to be CSS only — `group-hover` and `group-focus-within` fading a
 * bubble that was always in the DOM. That works right up until an ancestor has
 * `overflow-hidden`, which every rounded card here does, and then the bubble is
 * sliced off at the card's edge. Escaping that means portalling the bubble out
 * of the card, and a portalled node is no longer a descendant of the `group`,
 * so hover has to be tracked in state instead.
 *
 * Pointer events rather than mouse events so a tap on a touch screen reveals
 * the bubble the same way a hover does; a pointerdown anywhere else closes it,
 * since touch has no reliable "moved away".
 */
export default function useHoverTooltip<T extends HTMLElement>(): HoverTooltipState<T> {
  const triggerRef = useRef<T>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<DropdownPlacement>('below');

  const open = useCallback(() => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    setPlacement(getTooltipPlacement(trigger.getBoundingClientRect(), window.innerHeight));
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!triggerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePress);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePress);
    };
  }, [isOpen]);

  return { close, isOpen, open, placement, triggerRef };
}
