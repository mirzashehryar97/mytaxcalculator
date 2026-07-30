'use client';

import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  PANEL_NAV_BUTTON_CLASS,
  PANEL_TITLE_BUTTON_CLASS,
} from '@/components/calculator/datePickerStyles';

interface DatePickerHeaderProps {
  /** False on the year page, which is the top of the drill-up. */
  canDrillUp: boolean;
  canStepBack: boolean;
  canStepForward: boolean;
  onDrillUp: () => void;
  onStep: (direction: number) => void;
  /** What one press of an arrow moves, e.g. "month". */
  stepLabel: string;
  title: string;
  /** Where the title button leads, e.g. "Choose a month". */
  titleAction: string;
}

export default function DatePickerHeader({
  canDrillUp,
  canStepBack,
  canStepForward,
  onDrillUp,
  onStep,
  stepLabel,
  title,
  titleAction,
}: DatePickerHeaderProps) {
  return (
    <div className="mb-1 flex items-center justify-between gap-1">
      <button
        aria-label={`Previous ${stepLabel}`}
        className={PANEL_NAV_BUTTON_CLASS}
        disabled={!canStepBack}
        onClick={() => onStep(-1)}
        type="button"
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
      </button>

      {canDrillUp ? (
        <button
          aria-label={`${title}. ${titleAction}`}
          className={PANEL_TITLE_BUTTON_CLASS}
          onClick={onDrillUp}
          type="button"
        >
          {title}
          <ChevronDown aria-hidden="true" className="h-4 w-4 text-gray-400" />
        </button>
      ) : (
        <span className="px-2 py-1.5 font-semibold text-gray-900 text-sm">{title}</span>
      )}

      <button
        aria-label={`Next ${stepLabel}`}
        className={PANEL_NAV_BUTTON_CLASS}
        disabled={!canStepForward}
        onClick={() => onStep(1)}
        type="button"
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
