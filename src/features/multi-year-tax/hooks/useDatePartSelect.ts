'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { type DropdownPlacement, getDropdownPlacement } from '@/utils/dropdownPlacement';

import {
  getOptionTooltipPosition,
  type OptionTooltipPosition,
} from '@/features/multi-year-tax/lib/tooltipPosition';
import type { DatePartOption } from '@/features/multi-year-tax/types';

interface OptionTooltip extends OptionTooltipPosition {
  reason: string;
}

interface UseDatePartSelectOptions {
  options: DatePartOption[];
  value: string;
  onChange: (value: string) => void;
}

/** Arrow keys walk the list, including over blocked options so they can be read. */
const MOVE_KEYS: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };

function findInitialIndex(options: DatePartOption[], value: string): number {
  const selected = options.findIndex((option) => option.value === value);

  if (selected !== -1) {
    return selected;
  }

  const firstAvailable = options.findIndex((option) => !option.disabledReason);
  return firstAvailable === -1 ? 0 : firstAvailable;
}

/**
 * Menu behaviour for one date part. Native `<option>` elements can't say why
 * they are unavailable, so this drives a list of buttons where a blocked option
 * stays visible, stays reachable by keyboard, and reveals its reason on hover,
 * focus or tap.
 */
export default function useDatePartSelect({ options, value, onChange }: UseDatePartSelectOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState<DropdownPlacement>('below');
  const [tooltip, setTooltip] = useState<OptionTooltip | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const hideTooltip = useCallback(() => setTooltip(null), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTooltip(null);
  }, []);

  const closeAndRefocus = useCallback(() => {
    close();
    triggerRef.current?.focus();
  }, [close]);

  const showTooltip = useCallback((reason: string, option: HTMLElement) => {
    const dropdown = dropdownRef.current;

    if (!dropdown) {
      return;
    }

    setTooltip({
      reason,
      ...getOptionTooltipPosition(
        option.getBoundingClientRect(),
        dropdown.getBoundingClientRect(),
        window.innerWidth,
      ),
    });
  }, []);

  const open = useCallback(() => {
    const trigger = triggerRef.current;

    if (trigger) {
      setPlacement(getDropdownPlacement(trigger.getBoundingClientRect(), window.innerHeight));
    }

    setActiveIndex(findInitialIndex(options, value));
    setIsOpen(true);
  }, [options, value]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
      return;
    }

    open();
  }, [close, isOpen, open]);

  const selectOption = useCallback(
    (option: DatePartOption, element: HTMLElement) => {
      if (option.disabledReason) {
        showTooltip(option.disabledReason, element);
        return;
      }

      onChange(option.value);
      closeAndRefocus();
    },
    [closeAndRefocus, onChange, showTooltip],
  );

  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        open();
      }
    },
    [open],
  );

  const handleListKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const step = MOVE_KEYS[event.key];

      if (step) {
        event.preventDefault();
        setActiveIndex((current) => (current + step + options.length) % options.length);
        return;
      }

      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        setActiveIndex(event.key === 'Home' ? 0 : options.length - 1);
        return;
      }

      if (event.key === 'Escape' || event.key === 'Tab') {
        closeAndRefocus();
      }
    },
    [closeAndRefocus, options.length],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [close, isOpen]);

  /** Focus follows the active option, so the reason for a blocked one is announced. */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const option = listRef.current?.children[activeIndex];

    if (option instanceof HTMLElement) {
      option.focus({ preventScroll: true });
      option.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  return {
    activeIndex,
    dropdownRef,
    handleListKeyDown,
    handleTriggerKeyDown,
    hideTooltip,
    isOpen,
    listRef,
    placement,
    selectOption,
    showTooltip,
    toggle,
    tooltip,
    triggerRef,
  };
}
