export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  /** Set when the option can't be chosen; the tooltip text explaining why. */
  disabledReason?: string;
}

/**
 * How much room the field takes: `md` matches the other form controls, `sm` sits
 * in a tight row of fields, `inline` sits inside a line of text.
 */
export type SelectSize = 'md' | 'sm' | 'inline';

/** What has been typed so far, and when the last letter landed. */
export interface TypeaheadState {
  query: string;
  at: number;
}

/** Chrome for a searchable list; the field's own placeholder can override it. */
export const SELECT_SEARCH_COPY = {
  placeholder: 'Search…',
  noMatch: 'No matching options',
} as const;

/** The id an option carries so `aria-activedescendant` can point at it. */
export function getSelectOptionId(id: string, index: number): string {
  return `${id}-option-${index}`;
}

const SEARCH_GAPS = /[^a-z0-9+]+/g;
const QUERY_TERMS = /\s+/;

/** Lowercased with spacing and punctuation dropped, so "a51" reaches "A-51". */
function collapse(value: string): string {
  return value.toLowerCase().replace(SEARCH_GAPS, '');
}

/**
 * The options a typed query still matches. Every whitespace-separated term has
 * to appear somewhere in the label, so "s10 plus" and "plus s10" both land on
 * "Galaxy S10 Plus" and neither needs the words to be adjacent.
 *
 * Both sides lose their punctuation and spacing before matching, because the
 * rulings this filters spell one handset several ways: "Galaxy A-51" is typed
 * "a51", "Galaxy NOTE8" is typed "note 8", and a substring test on the raw
 * label finds neither. `+` survives — "S23+" is a different phone from "S23"
 * at a different value, so it has to stay searchable.
 */
export function filterOptions<T extends string>(
  options: readonly SelectOption<T>[],
  query: string,
): readonly SelectOption<T>[] {
  const terms = query.split(QUERY_TERMS).map(collapse).filter(Boolean);

  if (terms.length === 0) {
    return options;
  }

  return options.filter((option) => {
    const haystack = collapse(option.label);
    return terms.every((term) => haystack.includes(term));
  });
}

/** How long a typed run counts as one word before the search restarts. */
const TYPEAHEAD_RESET_MS = 700;

/** A pause between letters starts a new word rather than extending the old one. */
export function extendTypeahead(current: TypeaheadState, key: string): TypeaheadState {
  const now = Date.now();
  return {
    query: now - current.at > TYPEAHEAD_RESET_MS ? key : current.query + key,
    at: now,
  };
}

export function findInitialIndex<T extends string>(
  options: readonly SelectOption<T>[],
  value: T,
): number {
  const selected = options.findIndex((option) => option.value === value);

  if (selected !== -1) {
    return selected;
  }

  const firstAvailable = options.findIndex((option) => !option.disabledReason);
  return firstAvailable === -1 ? 0 : firstAvailable;
}

/**
 * Typing in a native dropdown jumps to the matching option, which is the only
 * way to reach one year out of thirteen without scrolling. The search starts
 * after the active option so repeated letters walk through the matches.
 */
export function findTypeaheadIndex<T extends string>(
  options: readonly SelectOption<T>[],
  query: string,
  activeIndex: number,
): number {
  if (!query) {
    return -1;
  }

  const term = query.toLowerCase();
  // A single letter cycles from the next option; a longer word re-searches the
  // current one, so the match doesn't run away as the word is typed out.
  const start = query.length === 1 ? activeIndex + 1 : activeIndex;

  for (let step = 0; step < options.length; step += 1) {
    const index = (start + step + options.length) % options.length;
    const option = options[index];

    if (!option.disabledReason && option.label.toLowerCase().startsWith(term)) {
      return index;
    }
  }

  return -1;
}
