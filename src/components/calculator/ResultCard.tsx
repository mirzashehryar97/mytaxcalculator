export type ResultCardTone = 'positive' | 'negative' | 'neutral' | 'warning' | 'info';
export type ResultCardWeight = 'bold' | 'semibold' | 'medium';

/**
 * Site-wide result colour convention (see CLAUDE.md):
 * every tax amount is red (`negative`) and every income/net amount is green
 * (`positive`), regardless of what a design mockup shows.
 */
const TONE_CLASS: Record<ResultCardTone, string> = {
  positive: 'text-emerald-600',
  negative: 'text-red-600',
  neutral: 'text-gray-900',
  warning: 'text-amber-600',
  info: 'text-blue-600',
};

const WEIGHT_CLASS: Record<ResultCardWeight, string> = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
};

interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
  last?: boolean;
  tone?: ResultCardTone;
  /** Font weight of the value. Defaults to `bold`. */
  weight?: ResultCardWeight;
  /** Optional element rendered after the label text (e.g. an info tooltip). */
  labelAdornment?: React.ReactNode;
}

export default function ResultCard({
  label,
  value,
  highlight = false,
  last = false,
  tone = 'positive',
  weight = 'bold',
  labelAdornment,
}: ResultCardProps) {
  return (
    <div
      className={`flex min-w-0 items-start justify-between gap-4 py-4 ${last ? '' : 'border-gray-100 border-b'}`}
    >
      <span className="flex max-w-[65%] items-center gap-1.5 text-gray-600 text-sm leading-relaxed">
        {label}
        {labelAdornment}
      </span>
      <strong
        className={`amount-wrap text-right tabular-nums ${WEIGHT_CLASS[weight]} ${TONE_CLASS[tone]} ${highlight ? 'text-xl' : ''}`}
      >
        {value}
      </strong>
    </div>
  );
}
