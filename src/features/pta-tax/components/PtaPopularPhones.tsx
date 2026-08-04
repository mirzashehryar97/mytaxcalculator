import { AlertCircle, Info } from 'lucide-react';

import { PTA_POPULAR_PHONES, PTA_POPULAR_PHONES_COPY } from '@/features/pta-tax/lib/content';
import { formatPtaFiscalYear } from '@/features/pta-tax/lib/formatting';
import { buildPopularPhoneRows } from '@/features/pta-tax/lib/presentation';
import {
  DEFAULT_PTA_FISCAL_YEAR,
  PTA_DEFAULT_EXCHANGE_RATE,
  PTA_EXCHANGE_RATE_DATE,
} from '@/features/pta-tax/lib/rates';

const POPULAR_PHONE_ROWS = buildPopularPhoneRows(PTA_POPULAR_PHONES);

const BASIS_NOTE = `Tax year ${formatPtaFiscalYear(DEFAULT_PTA_FISCAL_YEAR)}, new smartphone, at Rs ${PTA_DEFAULT_EXCHANGE_RATE} to the US dollar as at ${PTA_EXCHANGE_RATE_DATE}. Sales tax is a percentage, so every total here moves with the rupee — set your own rate in the calculator.`;

/**
 * Named handsets with their totals, which is what people search for and what
 * the picker above cannot put in the HTML. Rows are computed by `calcPtaTax`
 * at build time, so nothing here can contradict the calculator.
 */
export default function PtaPopularPhones() {
  return (
    <section
      aria-labelledby="pta-popular-phones-heading"
      className="surface-card mx-auto mt-6 max-w-6xl scroll-mt-24 p-4 sm:p-6"
      id="pta-tax-popular-phones"
    >
      <span className="font-semibold text-[11px] text-emerald-700 uppercase tracking-[0.2em]">
        {PTA_POPULAR_PHONES_COPY.eyebrow}
      </span>
      <h2
        className="mt-2 font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
        id="pta-popular-phones-heading"
      >
        {PTA_POPULAR_PHONES_COPY.title}
      </h2>
      <p className="mt-2 max-w-4xl text-gray-600 text-sm leading-relaxed">
        {PTA_POPULAR_PHONES_COPY.description}
      </p>

      <ul className="mt-6 space-y-3 lg:hidden">
        {POPULAR_PHONE_ROWS.map((row) => (
          <li key={row.id} className="min-w-0 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="font-semibold text-gray-900 text-sm">{row.name}</p>
            <p className="mt-0.5 text-gray-500 text-xs">
              {row.cnfUsd} · {PTA_POPULAR_PHONES_COPY.salesTaxColumn} {row.salesTaxPercent}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="min-w-0">
                <dt className="text-gray-500 text-xs">{PTA_POPULAR_PHONES_COPY.passportColumn}</dt>
                <dd className="amount-wrap font-bold text-red-600 tabular-nums">
                  {row.passportTotal}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-gray-500 text-xs">{PTA_POPULAR_PHONES_COPY.cnicColumn}</dt>
                <dd className="amount-wrap font-bold text-red-600 tabular-nums">{row.cnicTotal}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-gray-200 lg:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{PTA_POPULAR_PHONES_COPY.title}</caption>
          <thead>
            <tr className="bg-emerald-50 text-emerald-950">
              <th className="px-4 py-3 font-semibold" scope="col">
                {PTA_POPULAR_PHONES_COPY.phoneColumn}
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                {PTA_POPULAR_PHONES_COPY.cnfColumn}
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                {PTA_POPULAR_PHONES_COPY.salesTaxColumn}
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                {PTA_POPULAR_PHONES_COPY.passportColumn}
              </th>
              <th className="px-4 py-3 font-semibold" scope="col">
                {PTA_POPULAR_PHONES_COPY.cnicColumn}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {POPULAR_PHONE_ROWS.map((row) => (
              <tr key={row.id} className="even:bg-gray-50/70">
                <th className="px-4 py-3 text-left font-medium text-gray-900" scope="row">
                  {row.name}
                </th>
                <td className="px-4 py-3 text-gray-700 tabular-nums">{row.cnfUsd}</td>
                <td className="px-4 py-3 font-semibold text-emerald-700 tabular-nums">
                  {row.salesTaxPercent}
                </td>
                <td className="px-4 py-3 font-bold text-red-600 tabular-nums">
                  {row.passportTotal}
                </td>
                <td className="px-4 py-3 font-bold text-red-600 tabular-nums">{row.cnicTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 space-y-3">
        <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm leading-relaxed">
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <span className="min-w-0">{BASIS_NOTE}</span>
        </p>
        <p className="flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span className="min-w-0">{PTA_POPULAR_PHONES_COPY.cliffNote}</span>
        </p>
        <p className="flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span className="min-w-0">{PTA_POPULAR_PHONES_COPY.fineNote}</span>
        </p>
      </div>
    </section>
  );
}
