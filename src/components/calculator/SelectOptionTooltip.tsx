import type { OptionTooltipPosition } from '@/utils/optionTooltipPosition';

interface SelectOptionTooltipProps extends OptionTooltipPosition {
  text: string;
}

/**
 * Explains why an option can't be picked. It is anchored to the option but
 * rendered outside the scrolling list, so it is never clipped.
 */
export default function SelectOptionTooltip({
  left,
  placement,
  text,
  top,
  width,
}: SelectOptionTooltipProps) {
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
