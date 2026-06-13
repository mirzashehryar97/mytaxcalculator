'use client';

import { useState } from 'react';

import { taxSlabs } from '@/utils/taxCalculator';

const FISCAL_YEARS = Object.keys(taxSlabs);

const formatPkr = (value: number) => `Rs. ${value.toLocaleString('en-IN')}`;

function formatSlabRange(min: number, max: number | null): string {
  if (min === 0 && max !== null) return `Up to ${formatPkr(max)}`;
  if (max === null) return `Above ${formatPkr(min - 1)}`;
  return `${formatPkr(min)} to ${formatPkr(max)}`;
}

function formatTaxRate(slab: {
  min: number;
  max: number | null;
  rate: number;
  fixed: number;
}): string {
  if (slab.rate === 0 && slab.fixed === 0) return '0% (Tax Free)';
  const exceedingBase = formatPkr(slab.min - 1);
  const rateStr = `${slab.rate}% of the amount exceeding ${exceedingBase}`;
  if (slab.fixed === 0) return rateStr;
  return `${formatPkr(slab.fixed)} + ${rateStr}`;
}

export default function SlabsAnswer() {
  const [year, setYear] = useState<string>(FISCAL_YEARS[0]);
  const slabs = taxSlabs[year] ?? [];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          Pakistan&rsquo;s salaried income tax slabs for the selected fiscal year:
        </p>
        <div className="relative inline-flex items-center">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pr-10 pl-3 font-semibold text-gray-900 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            aria-label="Select fiscal year for tax slabs"
          >
            {FISCAL_YEARS.map((fy) => (
              <option key={fy} value={fy}>
                FY {fy}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
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
    </div>
  );
}
