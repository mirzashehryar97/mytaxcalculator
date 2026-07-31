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
