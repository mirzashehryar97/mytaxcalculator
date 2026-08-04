'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  canStepCalendar,
  DATE_PICKER_PANEL_HEIGHT,
  type DatePickerView,
  getDatePickerTitle,
  getDateRangeMessage,
  getInitialFocusIso,
  getKeyboardTargetIso,
  getViewStepInMonths,
} from '@/components/calculator/datePicker';

import {
  buildCalendarWeeks,
  clampIsoToMonth,
  EARLIEST_ISO_DATE,
  getCalendarMonth,
  getTodayCalendarMonth,
  getTodayIso,
  isIsoWithinRange,
  LATEST_ISO_DATE,
  setIsoMonth,
  setIsoYear,
  shiftIsoByMonths,
} from '@/utils/calendarDates';
import { formatIsoAsTyped, maskTypedDate, parseTypedDate } from '@/utils/dateMask';
import { type DropdownPlacement, getDropdownPlacement } from '@/utils/dropdownPlacement';

interface UseDatePickerOptions {
  value: string;
  onChange: (value: string) => void;
  /** Earliest selectable date as `YYYY-MM-DD`. */
  min?: string;
  max?: string;
}

/**
 * Behaviour for the date field: a typed `DD/MM/YYYY` value and the calendar
 * panel that goes with it.
 *
 * Two things are deliberate. The typed text is only pushed up once it parses to
 * a real date, so half-typed input never resets the calculator, and it snaps
 * back to the committed date on blur rather than being thrown away. And the
 * focused day — the one arrow keys move and the panel opens on — is the single
 * source of the visible month, so the grid can never scroll away from it.
 */
export default function useDatePicker({ value, onChange, min, max }: UseDatePickerOptions) {
  const range = useMemo(
    () => ({ min: min ?? EARLIEST_ISO_DATE, max: max ?? LATEST_ISO_DATE }),
    [max, min],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<DatePickerView>('days');
  const [placement, setPlacement] = useState<DropdownPlacement>('below');
  const [text, setText] = useState(() => formatIsoAsTyped(value));
  const [focusedIso, setFocusedIso] = useState(() => getInitialFocusIso(value, range));

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  /** The portalled calendar, which lives outside `containerRef` in the DOM. */
  const panelRef = useRef<HTMLDivElement>(null);
  /** True while the field has focus, so the value below it can't rewrite the text. */
  const isTypingRef = useRef(false);
  /** Set by keyboard moves only, so clicking an arrow doesn't pull focus into the grid. */
  const shouldFocusDayRef = useRef(false);

  const todayIso = useMemo(() => getTodayIso(), []);
  const visibleMonth = useMemo(
    () => getCalendarMonth(focusedIso) ?? getTodayCalendarMonth(),
    [focusedIso],
  );
  const weeks = useMemo(() => buildCalendarWeeks(visibleMonth), [visibleMonth]);

  const close = useCallback(() => {
    setIsOpen(false);
    setView('days');
  }, []);

  const closeAndRefocus = useCallback(() => {
    close();
    triggerRef.current?.focus();
  }, [close]);

  const open = useCallback(() => {
    const trigger = triggerRef.current;

    if (trigger) {
      setPlacement(
        getDropdownPlacement(
          trigger.getBoundingClientRect(),
          window.innerHeight,
          DATE_PICKER_PANEL_HEIGHT,
        ),
      );
    }

    setView('days');
    setFocusedIso(getInitialFocusIso(value, range));
    shouldFocusDayRef.current = true;
    setIsOpen(true);
  }, [range, value]);

  const toggle = useCallback(() => {
    if (isOpen) {
      closeAndRefocus();
      return;
    }

    open();
  }, [closeAndRefocus, isOpen, open]);

  const moveFocusedIso = useCallback(
    (iso: string | null, focusDay: boolean) => {
      if (iso === null) {
        return;
      }

      if (focusDay) {
        shouldFocusDayRef.current = true;
      }

      setFocusedIso(clampIsoToMonth(iso, range));
    },
    [range],
  );

  /** Arrows in the header: a month, a year or a page of years, depending on the view. */
  const stepCalendar = useCallback(
    (direction: number, focusDay = false) => {
      moveFocusedIso(shiftIsoByMonths(focusedIso, getViewStepInMonths(view) * direction), focusDay);
    },
    [focusedIso, moveFocusedIso, view],
  );

  const drillUp = useCallback(() => {
    setView((current) => (current === 'days' ? 'months' : 'years'));
  }, []);

  const selectDay = useCallback(
    (iso: string) => {
      onChange(iso);
      closeAndRefocus();
    },
    [closeAndRefocus, onChange],
  );

  const selectMonth = useCallback(
    (month: number) => {
      moveFocusedIso(setIsoMonth(focusedIso, month), true);
      setView('days');
    },
    [focusedIso, moveFocusedIso],
  );

  const selectYear = useCallback(
    (year: number) => {
      moveFocusedIso(setIsoYear(focusedIso, year), false);
      setView('months');
    },
    [focusedIso, moveFocusedIso],
  );

  const selectToday = useCallback(() => {
    selectDay(todayIso);
  }, [selectDay, todayIso]);

  const clear = useCallback(() => {
    onChange('');
    closeAndRefocus();
  }, [closeAndRefocus, onChange]);

  const handleTextChange = useCallback(
    (raw: string) => {
      const masked = maskTypedDate(raw);
      setText(masked);

      if (masked === '') {
        if (value !== '') {
          onChange('');
        }
        return;
      }

      const iso = parseTypedDate(masked);
      if (iso !== null && iso !== value) {
        onChange(iso);
      }
    },
    [onChange, value],
  );

  const handleTextFocus = useCallback(() => {
    isTypingRef.current = true;
  }, []);

  /** Anything half-typed goes back to the date that is actually held. */
  const handleTextBlur = useCallback(() => {
    isTypingRef.current = false;
    setText(formatIsoAsTyped(value));
  }, [value]);

  const handleTextKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowDown' && !isOpen) {
        event.preventDefault();
        open();
      }
    },
    [isOpen, open],
  );

  const handleDayKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const target = getKeyboardTargetIso(event.key, focusedIso, view, range);

      if (target === null) {
        return;
      }

      event.preventDefault();
      moveFocusedIso(target, true);
    },
    [focusedIso, moveFocusedIso, range, view],
  );

  /** The field shows the value it is given, unless the visitor is mid-edit. */
  useEffect(() => {
    if (!isTypingRef.current) {
      setText(formatIsoAsTyped(value));
    }
  }, [value]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // The calendar is portalled to the body, so "inside" means either half of
    // the widget. Without the panel check, `focusin` would fire as focus lands
    // on a day and shut the calendar before it could be used.
    const closeOnOutside = (event: Event) => {
      const target = event.target as Node;

      if (!(containerRef.current?.contains(target) || panelRef.current?.contains(target))) {
        close();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAndRefocus();
      }
    };

    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('focusin', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('focusin', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [close, closeAndRefocus, isOpen]);

  /** Keyboard moves take focus with them so the day is read out as it changes. */
  useEffect(() => {
    if (!(isOpen && shouldFocusDayRef.current && view === 'days')) {
      return;
    }

    shouldFocusDayRef.current = false;
    gridRef.current
      ?.querySelector<HTMLElement>('[data-focused="true"]')
      ?.focus({ preventScroll: true });
  }, [focusedIso, isOpen, view]);

  const hasRangeError = value !== '' && !isIsoWithinRange(value, range);

  return {
    canStepBack: canStepCalendar(view, visibleMonth, -1, range),
    canStepForward: canStepCalendar(view, visibleMonth, 1, range),
    clear,
    closeAndRefocus,
    containerRef,
    drillUp,
    focusedIso,
    gridRef,
    handleDayKeyDown,
    handleTextBlur,
    handleTextChange,
    handleTextFocus,
    handleTextKeyDown,
    isOpen,
    isTodaySelectable: isIsoWithinRange(todayIso, range),
    panelRef,
    placement,
    range,
    rangeMessage: hasRangeError ? getDateRangeMessage(min, max) : null,
    selectDay,
    selectMonth,
    selectToday,
    selectYear,
    stepCalendar,
    text,
    title: getDatePickerTitle(view, visibleMonth),
    todayIso,
    toggle,
    triggerRef,
    view,
    visibleMonth,
    weeks,
  };
}

export type DatePickerController = ReturnType<typeof useDatePicker>;
