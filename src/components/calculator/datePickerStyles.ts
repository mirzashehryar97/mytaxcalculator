const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1';
const DAY_CELL_BASE = `flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${FOCUS_RING}`;
const OPTION_CELL_BASE = `flex h-10 w-full items-center justify-center rounded-lg text-sm transition-colors ${FOCUS_RING}`;
const SELECTED_CELL = 'bg-emerald-600 font-semibold text-white shadow-sm shadow-emerald-900/20';
const BLOCKED_CELL = 'cursor-not-allowed text-gray-300';
const SELECTABLE_CELL = 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700';

interface DayCellState {
  isSelected: boolean;
  isToday: boolean;
  isOutsideMonth: boolean;
  isBlocked: boolean;
}

export function getDayCellClass({
  isBlocked,
  isOutsideMonth,
  isSelected,
  isToday,
}: DayCellState): string {
  if (isSelected) {
    return `${DAY_CELL_BASE} ${SELECTED_CELL}`;
  }

  if (isBlocked) {
    return `${DAY_CELL_BASE} ${BLOCKED_CELL}`;
  }

  if (isToday) {
    return `${DAY_CELL_BASE} font-semibold text-emerald-700 ring-1 ring-emerald-300 ring-inset hover:bg-emerald-50`;
  }

  if (isOutsideMonth) {
    return `${DAY_CELL_BASE} text-gray-300 hover:bg-gray-50 hover:text-gray-500`;
  }

  return `${DAY_CELL_BASE} ${SELECTABLE_CELL}`;
}

export function getOptionCellClass({
  isBlocked,
  isSelected,
}: Pick<DayCellState, 'isBlocked' | 'isSelected'>): string {
  if (isSelected) {
    return `${OPTION_CELL_BASE} ${SELECTED_CELL}`;
  }

  return `${OPTION_CELL_BASE} ${isBlocked ? BLOCKED_CELL : SELECTABLE_CELL}`;
}

export function getDateFieldClass(hasError: boolean): string {
  const base = 'form-input pr-12 text-base';
  return hasError ? `${base} border-red-300 focus:border-red-500 focus:ring-red-500/20` : base;
}

export function getDateMessageClass(hasError: boolean): string {
  const base = 'mt-1.5 text-xs leading-relaxed';
  return hasError ? `${base} text-red-600` : `${base} text-gray-500`;
}

/**
 * Look of the floating calendar. No positioning: the panel is portalled to the
 * body and placed from the field's measured box by `AnchoredPanel`, so a card
 * with `overflow-hidden` can't slice it off.
 */
export const PANEL_CLASS =
  'w-[19.5rem] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)]';

/** Distance between the field and the calendar, in pixels. */
export const PANEL_GAP = 8;

/** Arrow and title buttons in the panel header. */
export const PANEL_NAV_BUTTON_CLASS = `flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-gray-200 disabled:hover:bg-transparent ${FOCUS_RING}`;
export const PANEL_TITLE_BUTTON_CLASS = `flex items-center gap-1 rounded-lg px-2 py-1.5 font-semibold text-gray-900 text-sm transition-colors hover:bg-gray-100 ${FOCUS_RING}`;
export const PANEL_ACTION_CLASS = `rounded-lg px-2.5 py-1.5 font-semibold text-xs transition-colors disabled:cursor-not-allowed disabled:text-gray-300 ${FOCUS_RING}`;
