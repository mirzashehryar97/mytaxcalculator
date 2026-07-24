interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
  last?: boolean;
}

export default function ResultCard({
  label,
  value,
  highlight = false,
  last = false,
}: ResultCardProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-4 ${last ? '' : 'border-gray-100 border-b'}`}
    >
      <span className="max-w-[65%] text-gray-600 text-sm leading-relaxed">{label}</span>
      <strong
        className={`min-w-0 break-words text-right font-bold tabular-nums ${highlight ? 'text-emerald-700 text-xl' : 'text-emerald-700'}`}
      >
        {value}
      </strong>
    </div>
  );
}
