'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  extendTypeahead,
  findInitialIndex,
  findTypeaheadIndex,
  type SelectOption,
  type TypeaheadState,
} from '@/components/calculator/select';

import { type DropdownPlacement, getDropdownPlacement } from '@/utils/dropdownPlacement';
import {
  getOptionTooltipPosition,
  type OptionTooltipPosition,
} from '@/utils/optionTooltipPosition';

interface OptionTooltip extends OptionTooltipPosition {
  reason: string;
}

interface UseSelectInputOptions<T extends string> {
  options: readonly SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Arrow keys walk the list, including over blocked options so they can be read. */
const MOVE_KEYS: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };

/**
 * Menu behaviour for one dropdown. The native `<select>` renders an opaque
 * list we can neither style nor annotate — an `<option>` can't say why it is
 * unavailable, and on mobile it hands the page over to the platform's own
 * picker. This drives a list of buttons instead, keeping what the native
 * control gave us: arrow keys, Home/End, type-to-jump, and Escape to close.
 */
export default function useSelectInput<T extends string>({
  options,
  value,
  onChange,
}: UseSelectInputOptions<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState<DropdownPlacement>('below');
  const [tooltip, setTooltip] = useState<OptionTooltip | null>(null);
  const dropdownRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLSpanElement>(null);
  const typeahead = useRef<TypeaheadState>({ query: '', at: 0 });

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
    (option: SelectOption<T>, element: HTMLElement) => {
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

  const runTypeahead = useCallback(
    (key: string) => {
      const next = extendTypeahead(typeahead.current, key);
      typeahead.current = next;

      setActiveIndex((current) => {
        const match = findTypeaheadIndex(options, next.query, current);
        return match === -1 ? current : match;
      });
    },
    [options],
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
        return;
      }

      if (event.key.length === 1 && !(event.altKey || event.ctrlKey || event.metaKey)) {
        runTypeahead(event.key);
      }
    },
    [closeAndRefocus, options.length, runTypeahead],
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
