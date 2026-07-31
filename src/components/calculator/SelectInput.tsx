'use client';

import { ChevronDown } from 'lucide-react';

import SelectOptionTooltip from '@/components/calculator/SelectOptionTooltip';
import type { SelectOption, SelectSize } from '@/components/calculator/select';
import {
  getSelectAnchorClass,
  getSelectChevronClass,
  getSelectLabelClass,
  getSelectOptionClass,
  getSelectPanelClass,
  getSelectTriggerClass,
  getSelectValueClass,
  getSelectWrapperClass,
} from '@/components/calculator/selectStyles';
import useSelectInput from '@/components/calculator/useSelectInput';

interface SelectInputProps<T extends string> {
  id: string;
  label: string;
  options: readonly SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: SelectSize;
  /** Keeps the label for screen readers but drops it from the layout. */
  hideLabel?: boolean;
  /** Spoken name when the visible label alone isn't specific enough. */
  ariaLabel?: string;
  /** Shown on the trigger while nothing is chosen. */
  placeholder?: string;
  helpText?: string;
  /** Optional element rendered after the label text (e.g. an info tooltip). */
  labelAdornment?: React.ReactNode;
  /** Extra classes for the wrapper, e.g. the width it takes in a row. */
  className?: string;
}

/**
 * Dropdown built from our own markup rather than `<select>`. The native control
 * hands its list to the platform — unstyled on desktop, a full-screen wheel on
 * mobile — and refuses any content beyond plain text, so every calculator uses
 * this instead. See `useSelectInput` for the keyboard behaviour it keeps.
 */
export default function SelectInput<T extends string>({
  id,
  label,
  options,
  value,
  onChange,
  size = 'md',
  hideLabel = false,
  ariaLabel,
  placeholder,
  helpText,
  labelAdornment,
  className,
}: SelectInputProps<T>) {
  const menu = useSelectInput({ options, value, onChange });
  const selected = options.find((option) => option.value === value);
  const labelId = `${id}-label`;
  const listId = `${id}-listbox`;
  const helpId = `${id}-help`;

  return (
    <span className={getSelectWrapperClass(size, className)}>
      <label className={getSelectLabelClass(size, hideLabel)} htmlFor={id} id={labelId}>
        {label}
        {labelAdornment}
      </label>

      <span className={getSelectAnchorClass(size)} ref={menu.dropdownRef}>
        <button
          aria-controls={menu.isOpen ? listId : undefined}
          aria-describedby={helpText ? helpId : undefined}
          aria-expanded={menu.isOpen}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabel ? undefined : labelId}
          className={getSelectTriggerClass(size)}
          id={id}
          onClick={menu.toggle}
          onKeyDown={menu.handleTriggerKeyDown}
          ref={menu.triggerRef}
          type="button"
        >
          <span className={getSelectValueClass(size, Boolean(selected))}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown aria-hidden="true" className={getSelectChevronClass(size, menu.isOpen)} />
        </button>

        {menu.isOpen ? (
          <span className={getSelectPanelClass(size, menu.placement)}>
            {/* biome-ignore lint/a11y/useSemanticElements: the native <select> this
                replaces is the whole point — the roles are what keep it announced
                as a dropdown. */}
            <span
              aria-labelledby={labelId}
              className="flex max-h-56 flex-col overflow-y-auto overscroll-contain py-1"
              id={listId}
              ref={menu.listRef}
              role="listbox"
            >
              {options.map((option, index) => (
                /* biome-ignore lint/a11y/useSemanticElements: an <option> can't hold
                   focus or explain why it is unavailable, so these are buttons. */
                <button
                  aria-disabled={Boolean(option.disabledReason)}
                  aria-selected={option.value === value}
                  className={getSelectOptionClass({
                    isActive: index === menu.activeIndex,
                    isBlocked: Boolean(option.disabledReason),
                    isSelected: option.value === value,
                    size,
                  })}
                  key={option.value}
                  onClick={(event) => menu.selectOption(option, event.currentTarget)}
                  onFocus={(event) =>
                    option.disabledReason
                      ? menu.showTooltip(option.disabledReason, event.currentTarget)
                      : menu.hideTooltip()
                  }
                  onKeyDown={menu.handleListKeyDown}
                  onMouseEnter={(event) =>
                    option.disabledReason
                      ? menu.showTooltip(option.disabledReason, event.currentTarget)
                      : menu.hideTooltip()
                  }
                  onMouseLeave={menu.hideTooltip}
                  role="option"
                  tabIndex={index === menu.activeIndex ? 0 : -1}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </span>

            {menu.tooltip ? (
              <SelectOptionTooltip
                left={menu.tooltip.left}
                placement={menu.tooltip.placement}
                text={menu.tooltip.reason}
                top={menu.tooltip.top}
                width={menu.tooltip.width}
              />
            ) : null}
          </span>
        ) : null}
      </span>

      {helpText ? (
        <span className="mt-1.5 block text-gray-500 text-xs leading-relaxed" id={helpId}>
          {helpText}
        </span>
      ) : null}
    </span>
  );
}
