'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  extendTypeahead,
  filterOptions,
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
  /** Puts a filter box in the panel, for lists too long to scroll or type through. */
  searchable?: boolean;
}

/** Arrow keys walk the list, including over blocked options so they can be read. */
const MOVE_KEYS: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };

/**
 * Menu behaviour for one dropdown. The native `<select>` renders an opaque
 * list we can neither style nor annotate — an `<option>` can't say why it is
 * unavailable, and on mobile it hands the page over to the platform's own
 * picker. This drives a list of buttons instead, keeping what the native
 * control gave us: arrow keys, Home/End, type-to-jump, and Escape to close.
 *
 * Type-to-jump runs out somewhere past a hundred options: it matches the start
 * of a label only, so nothing reaches "Galaxy S10 Plus" except "galaxy". A
 * `searchable` list swaps it for a filter box, which moves focus into that box
 * and drives the highlight through `aria-activedescendant` instead — a listbox
 * cannot hold focus and be typed into at the same time.
 */
export default function useSelectInput<T extends string>({
  options,
  value,
  onChange,
  searchable = false,
}: UseSelectInputOptions<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState<DropdownPlacement>('below');
  const [tooltip, setTooltip] = useState<OptionTooltip | null>(null);
  const [query, setQuery] = useState('');
  const dropdownRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  /** The portalled panel, which lives outside `dropdownRef` in the DOM. */
  const panelRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef<TypeaheadState>({ query: '', at: 0 });

  /** What the list actually shows: everything until a search narrows it. */
  const visibleOptions = useMemo(
    () => (searchable ? filterOptions(options, query) : options),
    [options, query, searchable],
  );

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
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    setTooltip({
      reason,
      ...getOptionTooltipPosition(
        option.getBoundingClientRect(),
        panel.getBoundingClientRect(),
        window.innerWidth,
      ),
    });
  }, []);

  const open = useCallback(() => {
    const trigger = triggerRef.current;

    if (trigger) {
      setPlacement(getDropdownPlacement(trigger.getBoundingClientRect(), window.innerHeight));
    }

    // Cleared here rather than on close, so a panel that is closing never
    // repaints its full list on the way out.
    setQuery('');
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

  const moveActive = useCallback(
    (step: number) => {
      const count = visibleOptions.length;

      setActiveIndex((current) => (count === 0 ? 0 : (current + step + count) % count));
    },
    [visibleOptions.length],
  );

  const handleListKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const step = MOVE_KEYS[event.key];

      if (step) {
        event.preventDefault();
        moveActive(step);
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
    [closeAndRefocus, moveActive, options.length, runTypeahead],
  );

  /**
   * Narrowing the list re-picks the highlight rather than keeping the old
   * position, which would point at a different phone — or past the end of a
   * shorter list — as soon as a letter lands.
   */
  const search = useCallback(
    (next: string) => {
      setQuery(next);
      setActiveIndex(findInitialIndex(filterOptions(options, next), value));
    },
    [options, value],
  );

  const handleSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const step = MOVE_KEYS[event.key];

      if (step) {
        event.preventDefault();
        moveActive(step);
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();

        const option = visibleOptions[activeIndex];
        const element = listRef.current?.children[activeIndex];

        if (option && element instanceof HTMLElement) {
          selectOption(option, element);
        }

        return;
      }

      if (event.key === 'Escape' || event.key === 'Tab') {
        closeAndRefocus();
      }
    },
    [activeIndex, closeAndRefocus, moveActive, selectOption, visibleOptions],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // The panel is portalled to the body, so "inside" means either half of the
    // widget — a click on an option is not a click outside the dropdown.
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!(dropdownRef.current?.contains(target) || panelRef.current?.contains(target))) {
        close();
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [close, isOpen]);

  /** A searchable panel opens into its filter box, not onto an option. */
  useEffect(() => {
    if (isOpen && searchable) {
      searchRef.current?.focus();
    }
  }, [isOpen, searchable]);

  /** Focus follows the active option, so the reason for a blocked one is announced. */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const option = listRef.current?.children[activeIndex];

    if (!(option instanceof HTMLElement)) {
      return;
    }

    option.scrollIntoView({ block: 'nearest' });

    // Searching keeps focus in the filter box — taking it away would stop the
    // typing that built the list — so the reason a blocked option is
    // unavailable is raised here instead of on its focus handler.
    if (searchable) {
      const reason = visibleOptions[activeIndex]?.disabledReason;

      if (reason) {
        showTooltip(reason, option);
      } else {
        hideTooltip();
      }

      return;
    }

    option.focus({ preventScroll: true });
  }, [activeIndex, hideTooltip, isOpen, searchable, showTooltip, visibleOptions]);

  return {
    activeIndex,
    dropdownRef,
    handleListKeyDown,
    handleSearchKeyDown,
    handleTriggerKeyDown,
    hideTooltip,
    isOpen,
    listRef,
    panelRef,
    placement,
    query,
    search,
    searchRef,
    selectOption,
    showTooltip,
    toggle,
    tooltip,
    triggerRef,
    visibleOptions,
  };
}
