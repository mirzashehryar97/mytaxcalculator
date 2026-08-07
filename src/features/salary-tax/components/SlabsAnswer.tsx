'use client';

import { useState } from 'react';

import { toSelectOptions } from '@/components/calculator/options';
import SelectInput from '@/components/calculator/SelectInput';

import {
  BUDGET_YEARS,
  FY_2025_26_SURCHARGE_RATE,
  FY_2025_26_SURCHARGE_THRESHOLD,
} from '@/lib/budgetComparison';

import { bandStart } from '@/utils/slabEngine';
import { taxSlabs } from '@/utils/taxCalculator';

const FISCAL_YEARS = Object.keys(taxSlabs);
const FISCAL_YEAR_OPTIONS = toSelectOptions(FISCAL_YEARS, (year) => `FY ${year}`);

const formatPkr = (value: number) => `Rs. ${value.toLocaleString('en-IN')}`;

function formatSlabRange(min: number, max: number | null): string {
  if (min === 0 && max !== null) return `Up to ${formatPkr(max)}`;
  if (max === null) return `Above ${formatPkr(min)}`;
  return `${formatPkr(bandStart(min))} to ${formatPkr(max)}`;
}

function formatTaxRate(slab: {
  min: number;
  max: number | null;
  rate: number;
  fixed: number;
}): string {
  if (slab.rate === 0 && slab.fixed === 0) return '0% (Tax Free)';
  const exceedingBase = formatPkr(slab.min);
  const rateStr = `${slab.rate}% of the amount exceeding ${exceedingBase}`;
  if (slab.fixed === 0) return rateStr;
  return `${formatPkr(slab.fixed)} + ${rateStr}`;
}

/**
 * The home page renders this twice — once as its own slab section, once inside FAQ
 * question 1 — so the select's id has to be caller-supplied: `SelectInput` derives its
 * label, listbox and option ids from it, and duplicates would break the ARIA wiring.
 */
export default function SlabsAnswer({ selectId = 'slabs-fiscal-year' }: { selectId?: string }) {
  const [year, setYear] = useState<string>(FISCAL_YEARS[0]);
  const slabs = taxSlabs[year] ?? [];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          Pakistan&rsquo;s salaried income tax slabs for the selected fiscal year:
        </p>
        <SelectInput
          ariaLabel="Select fiscal year for tax slabs"
          hideLabel
          id={selectId}
          label="Fiscal year"
          onChange={setYear}
          options={FISCAL_YEAR_OPTIONS}
          size="inline"
          value={year}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-emerald-50 text-emerald-800">
              <th scope="col" className="w-[45%] px-4 py-2.5 font-semibold">
                Annual Taxable Income
              </th>
              <th scope="col" className="w-[55%] px-4 py-2.5 font-semibold">
                Tax
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slabs.map((slab) => (
              <tr key={`${slab.min}-${slab.max}`} className="even:bg-gray-50/60">
                <td className="px-4 py-2.5 text-gray-700">{formatSlabRange(slab.min, slab.max)}</td>
                <td className="px-4 py-2.5 text-gray-900">{formatTaxRate(slab)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {year === BUDGET_YEARS.previous && (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 text-sm leading-relaxed">
          <span className="font-semibold">Surcharge:</span> {FY_2025_26_SURCHARGE_RATE * 100}% of
          the income tax payable applies when annual taxable income exceeds{' '}
          {formatPkr(FY_2025_26_SURCHARGE_THRESHOLD)}.
        </p>
      )}
    </div>
  );
}
