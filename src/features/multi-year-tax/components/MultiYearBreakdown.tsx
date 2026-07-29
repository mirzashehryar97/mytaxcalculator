import MultiYearBreakdownCards from '@/features/multi-year-tax/components/MultiYearBreakdownCards';
import MultiYearBreakdownList from '@/features/multi-year-tax/components/MultiYearBreakdownList';
import MultiYearBreakdownTable from '@/features/multi-year-tax/components/MultiYearBreakdownTable';
import { MULTI_YEAR_RESULT_COPY } from '@/features/multi-year-tax/lib/content';
import { RESULT_PANEL_CLASS } from '@/features/multi-year-tax/lib/styles';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearBreakdownProps {
  result: MultiYearResult;
}

export default function MultiYearBreakdown({ result }: MultiYearBreakdownProps) {
  return (
    <section aria-labelledby="multi-year-breakdown-heading" className={RESULT_PANEL_CLASS}>
      <h3 className="font-bold text-gray-900 text-lg" id="multi-year-breakdown-heading">
        {MULTI_YEAR_RESULT_COPY.breakdownTitle}
      </h3>
      <p className="mt-1 text-gray-500 text-sm">
        <span className="hidden sm:inline">{MULTI_YEAR_RESULT_COPY.breakdownSubtitleDesktop}</span>
        <span className="sm:hidden">{MULTI_YEAR_RESULT_COPY.breakdownSubtitleMobile}</span>
      </p>

      {/* Three widths, three shapes: the six-column table only fits from `lg`,
          tablets get the same figures as stacked rows rather than a sideways
          scroll, and phones keep the taller cards. */}
      <div className="mt-4 hidden lg:block">
        <MultiYearBreakdownTable result={result} />
      </div>
      <div className="mt-4 hidden sm:block lg:hidden">
        <MultiYearBreakdownList result={result} />
      </div>
      <div className="mt-4 sm:hidden">
        <MultiYearBreakdownCards result={result} />
      </div>
    </section>
  );
}
