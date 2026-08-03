import RelatedCalculatorRow from '@/components/calculator/RelatedCalculatorRow';
import { type CalculatorNavGroup, formatCalculatorCount } from '@/components/layout/navigation';

interface RelatedCalculatorGroupProps {
  group: CalculatorNavGroup;
}

/** One category inside the panel: a header rule, then the calculators in two columns. */
export default function RelatedCalculatorGroup({ group }: RelatedCalculatorGroupProps) {
  return (
    <div className="pt-5 first:pt-2">
      <div className="flex items-center gap-3 px-4 pb-2.5">
        <h3 className="font-bold text-[11px] text-gray-900 uppercase tracking-[0.12em]">
          {group.label}
        </h3>
        <span className="h-px flex-1 bg-gray-300" aria-hidden="true" />
        <span className="font-medium text-[11px] text-gray-400">
          {formatCalculatorCount(group.links.length)}
        </span>
      </div>

      <div className="grid gap-2 px-2 sm:grid-cols-2">
        {group.links.map((link) => (
          <RelatedCalculatorRow key={link.href} link={link} />
        ))}
      </div>
    </div>
  );
}
