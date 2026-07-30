import { isRealDate, parseIsoDateParts, toIsoDate } from '@/utils/calendarDates';

/** Day-first, because that is how dates are written in Pakistan. */
export const TYPED_DATE_PLACEHOLDER = 'DD/MM/YYYY';
export const TYPED_DATE_MAX_LENGTH = 10;

const NON_DATE_CHARACTERS = /[^\d/\-. ]/g;
const ALTERNATIVE_SEPARATORS = /[-. ]/g;
const REPEATED_SLASHES = /\/{2,}/g;
const TYPED_DATE_PATTERN = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const DAY_LENGTH = 2;
const MONTH_END = 4;
const DIGITS_LENGTH = 8;

/**
 * Keeps what the visitor types usable: digits are grouped into `DD/MM/YYYY` as
 * they go, and a separator they type themselves is normalised to `/` and left
 * alone, so `1/6/2025` is as acceptable as `01062025`.
 */
export function maskTypedDate(raw: string): string {
  const cleaned = raw
    .replace(NON_DATE_CHARACTERS, '')
    .replace(ALTERNATIVE_SEPARATORS, '/')
    .replace(REPEATED_SLASHES, '/');

  if (cleaned.includes('/')) {
    return cleaned.slice(0, TYPED_DATE_MAX_LENGTH);
  }

  const digits = cleaned.slice(0, DIGITS_LENGTH);
  const groups = [
    digits.slice(0, DAY_LENGTH),
    digits.slice(DAY_LENGTH, MONTH_END),
    digits.slice(MONTH_END),
  ];

  // A separator only appears once there is something after it, so backspace can
  // walk back through the field instead of getting stuck on a slash.
  return groups.filter((group) => group !== '').join('/');
}

/** Reads a typed `DD/MM/YYYY` value as an ISO date, or null if it isn't one yet. */
export function parseTypedDate(text: string): string | null {
  const match = TYPED_DATE_PATTERN.exec(text.trim());
  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  const parts = { year: Number(year), month: Number(month), day: Number(day) };
  return isRealDate(parts) ? toIsoDate(parts) : null;
}

/** Shows an ISO date the way the field is typed: `2025-06-21` → `21/06/2025`. */
export function formatIsoAsTyped(iso: string): string {
  const parts = parseIsoDateParts(iso);
  if (parts === null) {
    return '';
  }

  const day = String(parts.day).padStart(2, '0');
  const month = String(parts.month).padStart(2, '0');
  return `${day}/${month}/${parts.year}`;
}
