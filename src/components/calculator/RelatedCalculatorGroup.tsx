import RelatedCalculatorRow from '@/components/calculator/RelatedCalculatorRow';
import { type CalculatorNavGroup, formatCalculatorCount } from '@/components/layout/navigation';

interface RelatedCalculatorGroupProps {
  group: CalculatorNavGroup;
}

/** One category inside the panel: a header rule, then the calculators in two columns. */
export default function RelatedCalculatorGroup({ group }: RelatedCalculatorGroupProps) {
  return (
    <div className="px-1 py-6 first:pt-3 last:pb-3 sm:px-2 sm:py-7">
      <div className="flex items-center gap-3 px-2 pb-3 sm:px-3 sm:pb-4">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
          aria-hidden="true"
        />
        <h3 className="font-bold text-[11px] text-gray-800 uppercase tracking-[0.14em] sm:text-xs">
          {group.label}
        </h3>
        <span
          className="h-px flex-1 bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"
          aria-hidden="true"
        />
        <span className="shrink-0 rounded-full border border-gray-200 bg-white/90 px-2.5 py-1 font-semibold text-[10px] text-gray-500 shadow-sm sm:text-[11px]">
          {formatCalculatorCount(group.links.length)}
        </span>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        {group.links.map((link) => (
          <RelatedCalculatorRow key={link.href} link={link} />
        ))}
      </div>
    </div>
  );
}
