import type { SelectSize } from '@/components/calculator/select';

import type { PanelWidthMode } from '@/utils/anchoredPanelPosition';

const TRIGGER_BASE =
  'flex w-full items-center justify-between gap-2 border-gray-200 bg-white text-left transition-colors hover:border-gray-300 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/15';

const TRIGGER_SIZE: Record<SelectSize, string> = {
  md: 'rounded-xl border-2 px-4 py-3 text-lg',
  sm: 'min-h-11 rounded-xl border-2 px-3 py-2 text-base',
  inline: 'min-h-8 rounded-lg border px-2.5 py-1 font-semibold text-sm shadow-sm focus:ring-2',
};

// Every container is a <span>, so the field is legal inside a paragraph; these
// give it back the layout a <div> would have had.
const WRAPPER_SIZE: Record<SelectSize, string> = {
  md: 'block min-w-0',
  sm: 'block min-w-0',
  inline: 'inline-flex w-fit flex-col align-middle',
};

// Not `relative` any more — the panel is portalled out and measured against the
// viewport, so this only has to be the box the trigger fills.
const ANCHOR_SIZE: Record<SelectSize, string> = {
  md: 'block',
  sm: 'block',
  inline: 'inline-block',
};

const LABEL_SIZE: Record<SelectSize, string> = {
  md: 'form-label flex items-center gap-1.5',
  sm: 'mb-1.5 flex items-center gap-1.5 font-medium text-gray-600 text-xs',
  inline: 'mb-1.5 flex items-center gap-1.5 font-medium text-gray-600 text-xs',
};

const CHEVRON_SIZE: Record<SelectSize, string> = {
  md: 'h-5 w-5',
  sm: 'h-4 w-4',
  inline: 'h-3.5 w-3.5',
};

// No positioning here: the panel is portalled to the body and placed from the
// trigger's measured box by `AnchoredPanel`, so it can't be clipped by a card
// with `overflow-hidden`. Width follows from the size's `PANEL_WIDTH_MODE`.
const PANEL_BASE =
  'rounded-xl border border-gray-200 bg-white shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)]';

const PANEL_SIZE: Record<SelectSize, string> = {
  md: '',
  sm: 'min-w-[5.5rem]',
  inline: 'w-max max-w-[calc(100vw-2.5rem)]',
};

/** Full-width fields get a list the same width; an inline one grows to its content. */
export const PANEL_WIDTH_MODE: Record<SelectSize, PanelWidthMode> = {
  md: 'match',
  sm: 'match',
  inline: 'min',
};

const OPTION_BASE =
  'flex w-full items-center justify-between gap-2 px-3 text-left transition-colors focus:outline-none';

const OPTION_SIZE: Record<SelectSize, string> = {
  md: 'min-h-11 py-2.5 text-base',
  sm: 'min-h-9 py-2 text-sm',
  inline: 'min-h-9 py-2 text-sm',
};

// The filter box sits above the scrolling list, inside the panel, so it stays
// put while the options move under it.
const SEARCH_FIELD_BASE =
  'w-full border-none bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0';

const SEARCH_SIZE: Record<SelectSize, string> = {
  md: 'py-2.5 pr-3 pl-9 text-base',
  sm: 'py-2 pr-2.5 pl-8 text-sm',
  inline: 'py-2 pr-2.5 pl-8 text-sm',
};

const SEARCH_ICON_SIZE: Record<SelectSize, string> = {
  md: 'left-3 h-4 w-4',
  sm: 'left-2.5 h-3.5 w-3.5',
  inline: 'left-2.5 h-3.5 w-3.5',
};

export function getSelectWrapperClass(size: SelectSize, className?: string): string {
  return className ? `${WRAPPER_SIZE[size]} ${className}` : WRAPPER_SIZE[size];
}

export function getSelectAnchorClass(size: SelectSize): string {
  return ANCHOR_SIZE[size];
}

export function getSelectLabelClass(size: SelectSize, isHidden: boolean): string {
  return isHidden ? 'sr-only' : LABEL_SIZE[size];
}

export function getSelectTriggerClass(size: SelectSize): string {
  return `${TRIGGER_BASE} ${TRIGGER_SIZE[size]}`;
}

export function getSelectValueClass(size: SelectSize, hasValue: boolean): string {
  const colour = hasValue ? 'text-gray-900' : 'text-gray-400';
  return size === 'inline' ? `truncate ${colour}` : `min-w-0 truncate ${colour}`;
}

export function getSelectChevronClass(size: SelectSize, isOpen: boolean): string {
  return `${CHEVRON_SIZE[size]} shrink-0 text-gray-400 transition-transform ${
    isOpen ? 'rotate-180' : ''
  }`;
}

/** Look of the floating option list; `AnchoredPanel` supplies where it sits. */
export function getSelectPanelClass(size: SelectSize): string {
  return `${PANEL_BASE} ${PANEL_SIZE[size]}`;
}

export function getSelectSearchWrapperClass(): string {
  return 'relative flex items-center border-gray-100 border-b';
}

export function getSelectSearchFieldClass(size: SelectSize): string {
  return `${SEARCH_FIELD_BASE} ${SEARCH_SIZE[size]}`;
}

export function getSelectSearchIconClass(size: SelectSize): string {
  return `pointer-events-none absolute text-gray-400 ${SEARCH_ICON_SIZE[size]}`;
}

/** Shown in place of the list when a search matches nothing. */
export function getSelectEmptyClass(size: SelectSize): string {
  return `flex items-center px-3 text-gray-500 ${OPTION_SIZE[size]}`;
}

interface SelectOptionState {
  isActive: boolean;
  isBlocked: boolean;
  isSelected: boolean;
  size: SelectSize;
}

export function getSelectOptionClass({
  isActive,
  isBlocked,
  isSelected,
  size,
}: SelectOptionState): string {
  const base = `${OPTION_BASE} ${OPTION_SIZE[size]}`;

  if (isBlocked) {
    return `${base} cursor-not-allowed text-gray-300 ${isActive ? 'bg-gray-50' : ''}`;
  }

  if (isSelected) {
    return `${base} cursor-pointer bg-emerald-50 font-semibold text-emerald-700`;
  }

  return `${base} cursor-pointer text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 ${
    isActive ? 'bg-emerald-50 text-emerald-800' : ''
  }`;
}
