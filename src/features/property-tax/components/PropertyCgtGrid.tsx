import { PROPERTY_SECTION_COPY } from '@/features/property-tax/lib/content';
import { CGT_GUIDE_ROWS } from '@/features/property-tax/lib/rates';
import type { PropertyType } from '@/features/property-tax/types';

interface PropertyCgtGridProps {
  /** Highlights the column for the type the visitor selected. */
  highlightedType?: PropertyType;
}

/**
 * The holding-period scale for property bought before 1 July 2024, built from
 * the same table the calculator reads.
 */
export default function PropertyCgtGrid({ highlightedType }: PropertyCgtGridProps) {
  const columnClass = (type: PropertyType) =>
    `px-4 py-3 text-right font-semibold tabular-nums ${
      highlightedType === type ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
    }`;

  return (
    <section aria-labelledby="property-cgt-grid-heading">
      <h3 id="property-cgt-grid-heading" className="font-bold text-gray-900 text-lg">
        Capital gains rates for property bought before 1 July 2024
      </h3>
      <p className="mt-1 text-gray-500 text-sm leading-relaxed">
        These rates still govern older purchases in every later tax year. Anything bought on or
        after 1 July 2024 is taxed at a flat 15% for sellers on the Active Taxpayer List.
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700">
                Holding period
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">
                Open plots
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">
                Constructed
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">
                Flats
              </th>
            </tr>
          </thead>
          <tbody>
            {CGT_GUIDE_ROWS.map((row) => (
              <tr key={row.id} className="border-gray-100 border-t">
                <th scope="row" className="px-4 py-3 font-medium text-gray-700">
                  {row.holdingPeriod}
                </th>
                <td className={columnClass('open-plot')}>{row.openPlot}</td>
                <td className={columnClass('constructed')}>{row.constructed}</td>
                <td className={columnClass('flat')}>{row.flat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-gray-500 text-xs leading-relaxed">
        {PROPERTY_SECTION_COPY.cgtRegimesDescription}
      </p>
    </section>
  );
}
