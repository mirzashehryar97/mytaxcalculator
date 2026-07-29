import type { OptionTooltipPosition } from '@/features/multi-year-tax/lib/tooltipPosition';

interface DatePartOptionTooltipProps extends OptionTooltipPosition {
  text: string;
}

/**
 * Explains why a day or month can't be picked. It is anchored to the option but
 * rendered outside the scrolling list, so it is never clipped.
 */
export default function DatePartOptionTooltip({
  left,
  placement,
  text,
  top,
  width,
}: DatePartOptionTooltipProps) {
  return (
    <span
      className="pointer-events-none absolute z-50 rounded-lg bg-gray-900 px-3 py-2 text-left font-normal text-white text-xs leading-relaxed shadow-lg"
      role="tooltip"
      style={{
        left,
        top,
        width,
        transform: `translate(-50%, ${placement === 'above' ? '-100%' : '0'})`,
      }}
    >
      {text}
    </span>
  );
}
