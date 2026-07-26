import { Info, Target } from 'lucide-react';

import { REVERSE_SALARY_RESULT_COPY } from '@/features/reverse-salary/lib/content';
import { formatPercent, formatPkr } from '@/features/reverse-salary/lib/formatting';
import {
  buildReverseBreakdownSections,
  type ReverseResultTone,
} from '@/features/reverse-salary/lib/presentation';
import type { ReverseSalaryResult } from '@/features/reverse-salary/types';

const TONE_TEXT: Record<ReverseResultTone, string> = {
  neutral: 'text-gray-900',
  negative: 'text-red-600',
  positive: 'text-emerald-600',
};

interface ReverseSalaryResultsProps {
  result: ReverseSalaryResult;
}

export default function ReverseSalaryResults({ result }: ReverseSalaryResultsProps) {
  const sections = buildReverseBreakdownSections(result);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-emerald-900/20 shadow-md">
          <Target className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="text-emerald-950 text-lg leading-relaxed max-[400px]:text-sm">
          {REVERSE_SALARY_RESULT_COPY.headlineLead}{' '}
          <strong className="font-bold text-emerald-700 tabular-nums">
            {formatPkr(result.desiredMonthlyNet)}
          </strong>{' '}
          {REVERSE_SALARY_RESULT_COPY.headlineMiddle}{' '}
          <strong className="font-bold text-gray-900 tabular-nums">
            {formatPkr(result.requiredMonthlyGross)}
          </strong>{' '}
          {REVERSE_SALARY_RESULT_COPY.headlineTrail}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.id} className="stat-card border-emerald-100 bg-[#ecfdf5]">
            <h3 className="mb-5 font-bold text-emerald-700 text-sm uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-5">
              {section.rows.map((row) => (
                <div key={row.label}>
                  <p className="text-gray-500 text-sm">{row.label}</p>
                  <p className={`font-semibold text-2xl tabular-nums ${TONE_TEXT[row.tone]}`}>
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-500 text-sm">
          {REVERSE_SALARY_RESULT_COPY.effectiveRateLabel}
        </span>
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800 text-lg tabular-nums">
          {formatPercent(result.effectiveRate)}
        </span>
      </div>

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <div>
          <p className="font-semibold">{REVERSE_SALARY_RESULT_COPY.howItWorksTitle}</p>
          <p className="mt-0.5">{REVERSE_SALARY_RESULT_COPY.howItWorksBody}</p>
        </div>
      </div>
    </div>
  );
}
