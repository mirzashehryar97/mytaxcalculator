'use client';

import type { RefObject } from 'react';

import { Search } from 'lucide-react';

import type { SelectSize } from '@/components/calculator/select';
import { getSelectOptionId } from '@/components/calculator/select';
import {
  getSelectSearchFieldClass,
  getSelectSearchIconClass,
  getSelectSearchWrapperClass,
} from '@/components/calculator/selectStyles';

interface SelectSearchFieldProps {
  /** The index highlighted in the list, which this field points at rather than holds. */
  activeIndex: number;
  /** Id of the field this filters, so its options can be addressed by index. */
  fieldId: string;
  inputRef: RefObject<HTMLInputElement>;
  /** Names the field for a screen reader and fills the placeholder. */
  label: string;
  /** Id of the listbox below, for `aria-controls`. */
  listId: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
  /** How many options survive the current query; nothing is active at zero. */
  optionCount: number;
  query: string;
  size: SelectSize;
}

/**
 * The filter box at the top of a searchable dropdown.
 *
 * It is a combobox rather than a plain text field because the highlight lives
 * in the list below while focus stays here — `aria-activedescendant` is the
 * only way to say "the thing I am pointing at is over there", and without it a
 * screen reader would read an empty text box while the visible selection moved.
 */
export default function SelectSearchField({
  activeIndex,
  fieldId,
  inputRef,
  label,
  listId,
  onKeyDown,
  onSearch,
  optionCount,
  query,
  size,
}: SelectSearchFieldProps) {
  return (
    <span className={getSelectSearchWrapperClass()}>
      <Search aria-hidden="true" className={getSelectSearchIconClass(size)} />
      <input
        aria-activedescendant={
          activeIndex < optionCount ? getSelectOptionId(fieldId, activeIndex) : undefined
        }
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={true}
        aria-label={label}
        className={getSelectSearchFieldClass(size)}
        onChange={(event) => onSearch(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={label}
        ref={inputRef}
        role="combobox"
        type="text"
        value={query}
      />
    </span>
  );
}
