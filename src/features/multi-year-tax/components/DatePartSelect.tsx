'use client';

import { ChevronDown } from 'lucide-react';

import DatePartOptionTooltip from '@/features/multi-year-tax/components/DatePartOptionTooltip';
import useDatePartSelect from '@/features/multi-year-tax/hooks/useDatePartSelect';
import {
  DATE_PART_LABEL_CLASS,
  getDatePartOptionClass,
} from '@/features/multi-year-tax/lib/styles';
import type { DatePartOption } from '@/features/multi-year-tax/types';

interface DatePartSelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: DatePartOption[];
  value: string;
  onChange: (value: string) => void;
  /** Spoken name of the field, e.g. "Start date month for period 2". */
  ariaLabel: string;
}

export default function DatePartSelect({
  ariaLabel,
  id,
  label,
  onChange,
  options,
  placeholder,
  value,
}: DatePartSelectProps) {
  const {
    activeIndex,
    dropdownRef,
    handleListKeyDown,
    handleTriggerKeyDown,
    hideTooltip,
    isOpen,
    listRef,
    placement,
    selectOption,
    showTooltip,
    toggle,
    tooltip,
    triggerRef,
  } = useDatePartSelect({ options, value, onChange });
  const selected = options.find((option) => option.value === value);

  return (
    <div className="min-w-0 flex-1">
      <span className={DATE_PART_LABEL_CLASS} id={`${id}-label`}>
        {label}
      </span>
      <div className="relative" ref={dropdownRef}>
        <button
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={ariaLabel}
          className="flex min-h-11 w-full items-center justify-between gap-1 rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-left transition-colors hover:border-gray-300 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
          id={id}
          onClick={toggle}
          onKeyDown={handleTriggerKeyDown}
          ref={triggerRef}
          type="button"
        >
          <span className={`truncate text-base ${selected ? 'text-gray-900' : 'text-gray-400'}`}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen ? (
          <div
            className={`absolute right-0 left-0 z-40 min-w-[5.5rem] rounded-xl border border-gray-200 bg-white shadow-lg ${
              placement === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
          >
            <div
              className="flex max-h-56 flex-col overflow-y-auto overscroll-contain py-1"
              ref={listRef}
            >
              {options.map((option, index) => (
                <button
                  aria-current={option.value === value}
                  aria-disabled={Boolean(option.disabledReason)}
                  className={getDatePartOptionClass({
                    isActive: index === activeIndex,
                    isBlocked: Boolean(option.disabledReason),
                    isSelected: option.value === value,
                  })}
                  key={option.value}
                  onClick={(event) => selectOption(option, event.currentTarget)}
                  onKeyDown={handleListKeyDown}
                  onFocus={(event) =>
                    option.disabledReason
                      ? showTooltip(option.disabledReason, event.currentTarget)
                      : hideTooltip()
                  }
                  onMouseEnter={(event) =>
                    option.disabledReason
                      ? showTooltip(option.disabledReason, event.currentTarget)
                      : hideTooltip()
                  }
                  onMouseLeave={hideTooltip}
                  tabIndex={index === activeIndex ? 0 : -1}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
            {tooltip ? (
              <DatePartOptionTooltip
                left={tooltip.left}
                placement={tooltip.placement}
                text={tooltip.reason}
                top={tooltip.top}
                width={tooltip.width}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
