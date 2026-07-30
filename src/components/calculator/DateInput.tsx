'use client';

import { CalendarDays } from 'lucide-react';

import DatePickerPanel from '@/components/calculator/DatePickerPanel';
import { getDateFieldClass, getDateMessageClass } from '@/components/calculator/datePickerStyles';
import useDatePicker from '@/components/calculator/useDatePicker';

import { TYPED_DATE_MAX_LENGTH, TYPED_DATE_PLACEHOLDER } from '@/utils/dateMask';

interface DateInputProps {
  id: string;
  label: string;
  /** The held date as `YYYY-MM-DD`, or `''` when nothing is chosen. */
  value: string;
  onChange: (value: string) => void;
  helpText?: string;
  /** Earliest date the field will accept, as `YYYY-MM-DD`. */
  min?: string;
  /** Latest date the field will accept, as `YYYY-MM-DD`. */
  max?: string;
  /** Optional element rendered after the label text (e.g. an info tooltip). */
  labelAdornment?: React.ReactNode;
}

/**
 * Date field with our own calendar rather than the browser's. The native control
 * reads the visitor's locale, so it showed these dates as `MM/DD/YYYY` and hid
 * the year behind a scrolling list — no use for a purchase date twenty years
 * back. Here the field is typed day-first, the way dates are written in
 * Pakistan, and the calendar steps day → month → year.
 */
export default function DateInput({
  id,
  label,
  value,
  onChange,
  helpText,
  min,
  max,
  labelAdornment,
}: DateInputProps) {
  const picker = useDatePicker({ value, onChange, min, max });
  const hasError = picker.rangeMessage !== null;
  const message = picker.rangeMessage ?? helpText;
  const messageId = `${id}-message`;

  return (
    <div className="min-w-0">
      <label className="form-label flex items-center gap-1.5" htmlFor={id}>
        {label}
        {labelAdornment}
      </label>

      <div className="relative" ref={picker.containerRef}>
        <input
          aria-describedby={message ? messageId : undefined}
          aria-invalid={hasError}
          autoComplete="off"
          className={getDateFieldClass(hasError)}
          id={id}
          inputMode="numeric"
          maxLength={TYPED_DATE_MAX_LENGTH}
          onBlur={picker.handleTextBlur}
          onChange={(event) => picker.handleTextChange(event.target.value)}
          onFocus={picker.handleTextFocus}
          onKeyDown={picker.handleTextKeyDown}
          placeholder={TYPED_DATE_PLACEHOLDER}
          type="text"
          value={picker.text}
        />

        <button
          aria-expanded={picker.isOpen}
          aria-haspopup="dialog"
          aria-label={`${picker.isOpen ? 'Hide' : 'Show'} the calendar for ${label.toLowerCase()}`}
          className="absolute inset-y-px right-px flex w-11 items-center justify-center rounded-r-[0.6rem] text-gray-400 transition-colors hover:bg-gray-50 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          onClick={picker.toggle}
          ref={picker.triggerRef}
          type="button"
        >
          <CalendarDays aria-hidden="true" className="h-5 w-5" />
        </button>

        {picker.isOpen ? (
          <DatePickerPanel label={label} picker={picker} selectedIso={value} />
        ) : null}
      </div>

      {message ? (
        <p
          className={getDateMessageClass(hasError)}
          id={messageId}
          role={hasError ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
