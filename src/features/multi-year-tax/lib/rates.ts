import { taxSlabs } from '@/utils/taxCalculator';

/**
 * The salary slabs are the rate table for this calculator — a period is only
 * usable while it falls inside a fiscal year we hold slabs for. Everything the
 * date dropdowns allow is derived from these keys, so adding a fiscal year to
 * `taxSlabs` widens the pickers automatically.
 */
const SORTED_FISCAL_YEARS = [...Object.keys(taxSlabs)].sort();

const EARLIEST_FISCAL_YEAR = SORTED_FISCAL_YEARS[0];
const LATEST_FISCAL_YEAR = SORTED_FISCAL_YEARS.at(-1) ?? EARLIEST_FISCAL_YEAR;

const EARLIEST_CALENDAR_YEAR = Number.parseInt(EARLIEST_FISCAL_YEAR.split('-')[0], 10);
const LATEST_CALENDAR_YEAR = Number.parseInt(LATEST_FISCAL_YEAR.split('-')[1], 10);

/** Fiscal years run 1 July – 30 June, so these are the outer edges we support. */
export const FIRST_SUPPORTED_MONTH = 7;
export const LAST_SUPPORTED_MONTH = 6;

export const EARLIEST_FISCAL_YEAR_LABEL = EARLIEST_FISCAL_YEAR;
export const LATEST_FISCAL_YEAR_LABEL = LATEST_FISCAL_YEAR;

/** 1 July of the oldest fiscal year we hold slabs for. */
export function getEarliestSupportedDate(): Date {
  return new Date(EARLIEST_CALENDAR_YEAR, FIRST_SUPPORTED_MONTH - 1, 1);
}

/** 30 June of the newest fiscal year we hold slabs for. */
export function getLatestSupportedDate(): Date {
  return new Date(LATEST_CALENDAR_YEAR, LAST_SUPPORTED_MONTH - 1, 30);
}

/** Every calendar year a supported date can fall in, oldest first. */
export const SUPPORTED_CALENDAR_YEARS: readonly number[] = Array.from(
  { length: LATEST_CALENDAR_YEAR - EARLIEST_CALENDAR_YEAR + 1 },
  (_unused, index) => EARLIEST_CALENDAR_YEAR + index,
);
