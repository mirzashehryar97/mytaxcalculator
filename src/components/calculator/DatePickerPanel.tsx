'use client';

import DatePickerActions from '@/components/calculator/DatePickerActions';
import DatePickerDayGrid from '@/components/calculator/DatePickerDayGrid';
import DatePickerHeader from '@/components/calculator/DatePickerHeader';
import DatePickerMonthGrid from '@/components/calculator/DatePickerMonthGrid';
import DatePickerYearGrid from '@/components/calculator/DatePickerYearGrid';
import {
  getDatePickerStepLabel,
  getDatePickerTitleAction,
} from '@/components/calculator/datePicker';
import { getPanelClass } from '@/components/calculator/datePickerStyles';
import type { DatePickerController } from '@/components/calculator/useDatePicker';

interface DatePickerPanelProps {
  /** The field's label, so the panel says which date it belongs to. */
  label: string;
  picker: DatePickerController;
  selectedIso: string;
}

export default function DatePickerPanel({ label, picker, selectedIso }: DatePickerPanelProps) {
  return (
    <div aria-label={`${label} calendar`} className={getPanelClass(picker.placement)} role="dialog">
      <DatePickerHeader
        canDrillUp={picker.view !== 'years'}
        canStepBack={picker.canStepBack}
        canStepForward={picker.canStepForward}
        onDrillUp={picker.drillUp}
        onStep={picker.stepCalendar}
        stepLabel={getDatePickerStepLabel(picker.view)}
        title={picker.title}
        titleAction={getDatePickerTitleAction(picker.view)}
      />

      {picker.view === 'days' ? (
        <DatePickerDayGrid
          focusedIso={picker.focusedIso}
          gridRef={picker.gridRef}
          monthTitle={picker.title}
          onKeyDown={picker.handleDayKeyDown}
          onSelect={picker.selectDay}
          range={picker.range}
          selectedIso={selectedIso}
          todayIso={picker.todayIso}
          weeks={picker.weeks}
        />
      ) : null}

      {picker.view === 'months' ? (
        <DatePickerMonthGrid
          month={picker.visibleMonth}
          onSelect={picker.selectMonth}
          range={picker.range}
        />
      ) : null}

      {picker.view === 'years' ? (
        <DatePickerYearGrid
          onSelect={picker.selectYear}
          range={picker.range}
          year={picker.visibleMonth.year}
        />
      ) : null}

      <DatePickerActions
        canSelectToday={picker.isTodaySelectable}
        hasValue={selectedIso !== ''}
        onClear={picker.clear}
        onToday={picker.selectToday}
      />
    </div>
  );
}
