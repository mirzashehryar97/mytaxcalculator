import type { SelectSize } from '@/components/calculator/select';

import type { DropdownPlacement } from '@/utils/dropdownPlacement';

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

const ANCHOR_SIZE: Record<SelectSize, string> = {
  md: 'relative block',
  sm: 'relative block',
  inline: 'relative inline-block',
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

const PANEL_BASE =
  'absolute z-40 rounded-xl border border-gray-200 bg-white shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)]';

const PANEL_SIZE: Record<SelectSize, string> = {
  md: 'right-0 left-0',
  sm: 'right-0 left-0 min-w-[5.5rem]',
  inline: 'left-0 w-max min-w-full max-w-[calc(100vw-2.5rem)]',
};

const OPTION_BASE =
  'flex w-full items-center justify-between gap-2 px-3 text-left transition-colors focus:outline-none';

const OPTION_SIZE: Record<SelectSize, string> = {
  md: 'min-h-11 py-2.5 text-base',
  sm: 'min-h-9 py-2 text-sm',
  inline: 'min-h-9 py-2 text-sm',
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

/** The floating option list, flipped above the trigger when there is no room below. */
export function getSelectPanelClass(size: SelectSize, placement: DropdownPlacement): string {
  const position = placement === 'above' ? 'bottom-full mb-1' : 'top-full mt-1';
  return `${PANEL_BASE} ${PANEL_SIZE[size]} ${position}`;
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
