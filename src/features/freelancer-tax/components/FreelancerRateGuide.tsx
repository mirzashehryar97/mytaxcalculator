import { Info } from 'lucide-react';

import {
  FREELANCER_GUIDE_COPY,
  FREELANCER_RATE_GUIDE_ROWS,
} from '@/features/freelancer-tax/lib/content';

export default function FreelancerRateGuide() {
  return (
    <section
      className="mt-12 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="freelancer-rate-guide-heading"
    >
      <h2
        id="freelancer-rate-guide-heading"
        className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
      >
        {FREELANCER_GUIDE_COPY.rateTitle}
      </h2>
      <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">
        {FREELANCER_GUIDE_COPY.rateDescription}
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <caption className="sr-only">{FREELANCER_GUIDE_COPY.rateTitle}</caption>
          <thead>
            <tr className="bg-emerald-50 text-emerald-950">
              <th scope="col" className="px-4 py-3 font-semibold">
                {FREELANCER_GUIDE_COPY.psebColumn}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {FREELANCER_GUIDE_COPY.filerColumn}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {FREELANCER_GUIDE_COPY.rateColumn}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                {FREELANCER_GUIDE_COPY.treatmentColumn}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {FREELANCER_RATE_GUIDE_ROWS.map((row) => (
              <tr key={row.id} className="even:bg-gray-50/70">
                <td className="px-4 py-3 font-medium text-gray-900">{row.psebStatus}</td>
                <td className="px-4 py-3 text-gray-700">{row.filerStatus}</td>
                <td className="px-4 py-3 font-bold text-emerald-700">{row.rate}</td>
                <td className="px-4 py-3 text-gray-600">{row.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
        <span>{FREELANCER_GUIDE_COPY.nonFilerCaveat}</span>
      </p>
    </section>
  );
}
