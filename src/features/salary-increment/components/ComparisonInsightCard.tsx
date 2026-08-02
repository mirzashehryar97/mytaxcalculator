import type { LucideIcon } from 'lucide-react';

import type { ComparisonValueTone } from '@/features/salary-increment/lib/presentation';

type ComparisonInsightTone = ComparisonValueTone | 'info';

const TONE_CLASS: Record<ComparisonInsightTone, string> = {
  positive: 'text-emerald-600',
  negative: 'text-red-600',
  neutral: 'text-gray-600',
  info: 'text-blue-600',
};

interface ComparisonInsightCardProps {
  icon: LucideIcon;
  label: string;
  tone: ComparisonInsightTone;
  value: string;
}

export default function ComparisonInsightCard({
  icon: Icon,
  label,
  tone,
  value,
}: ComparisonInsightCardProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2 text-gray-500 text-xs">
        <Icon className={`h-4 w-4 ${TONE_CLASS[tone]}`} aria-hidden="true" />
        {label}
      </div>
      <p className={`amount-wrap mt-2 font-bold text-lg tabular-nums ${TONE_CLASS[tone]}`}>
        {value}
      </p>
    </div>
  );
}
