'use client';

import { Info } from 'lucide-react';

import HoverTooltip from '@/components/ui/HoverTooltip';
import useHoverTooltip from '@/components/ui/useHoverTooltip';

interface SegmentedControlOptionProps {
  active: boolean;
  label: string;
  name: string;
  onSelect: () => void;
  /** Plain-language explanation revealed on hover or focus of the segment. */
  tooltip?: string;
  /** Stable id the segment points `aria-describedby` at while the bubble is open. */
  tooltipId: string;
}

/**
 * One segment of a `SegmentedControl`, split out because its tooltip needs its
 * own open/closed state and a hook can't be called inside the options loop.
 *
 * The bubble hangs off the info icon, as before, but the whole segment turns it
 * on: a 16px icon is a poor hover target, and focus lands on the segment, so
 * keyboard users now get the explanation the mouse always had.
 */
export default function SegmentedControlOption({
  active,
  label,
  name,
  onSelect,
  tooltip,
  tooltipId,
}: SegmentedControlOptionProps) {
  const info = useHoverTooltip<HTMLSpanElement>();

  return (
    <button
      type="button"
      name={name}
      aria-describedby={tooltip && info.isOpen ? tooltipId : undefined}
      aria-pressed={active}
      onBlur={info.close}
      onClick={onSelect}
      onFocus={info.open}
      onPointerEnter={info.open}
      onPointerLeave={info.close}
      className={`min-h-10 min-w-0 flex-1 rounded-lg px-3 py-2 font-semibold text-sm transition-all ${
        active
          ? 'bg-emerald-600 text-white shadow-sm'
          : 'text-gray-600 hover:bg-white hover:text-gray-900'
      }`}
    >
      <span className="inline-flex items-center justify-center gap-1.5">
        {label}
        {tooltip ? (
          <span className="inline-flex" ref={info.triggerRef}>
            <Info
              className={`h-4 w-4 shrink-0 transition-opacity ${info.isOpen ? 'opacity-100' : 'opacity-70'}`}
              aria-hidden="true"
            />
          </span>
        ) : null}
      </span>
      {tooltip && info.isOpen ? (
        <HoverTooltip
          anchorRef={info.triggerRef}
          id={tooltipId}
          placement={info.placement}
          text={tooltip}
        />
      ) : null}
    </button>
  );
}
