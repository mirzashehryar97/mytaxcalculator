import { ExternalLink, MapPin } from 'lucide-react';

import { AGRICULTURAL_GUIDE_COPY } from '@/features/agricultural-tax/lib/content';
import { buildProvinceRows } from '@/features/agricultural-tax/lib/presentation';
import { DEFAULT_AGRICULTURAL_FISCAL_YEAR } from '@/features/agricultural-tax/lib/rates';

export default function AgriculturalProvinceGuide() {
  const rows = buildProvinceRows(DEFAULT_AGRICULTURAL_FISCAL_YEAR);

  return (
    <section
      id="agricultural-provinces"
      className="mt-12 scroll-mt-24 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="agricultural-province-heading"
    >
      <h2
        id="agricultural-province-heading"
        className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
      >
        {AGRICULTURAL_GUIDE_COPY.provinceTitle}
      </h2>
      <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">
        {AGRICULTURAL_GUIDE_COPY.provinceDescription}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => (
          <article
            key={row.id}
            id={`province-${row.id}`}
            className="flex min-w-0 scroll-mt-24 flex-col rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5"
          >
            <h3 className="flex items-center gap-2 font-bold text-emerald-800 text-lg">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              {row.province}
            </h3>

            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  {AGRICULTURAL_GUIDE_COPY.lawColumn}
                </dt>
                <dd className="mt-1 text-gray-700 leading-relaxed">{row.law}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  {AGRICULTURAL_GUIDE_COPY.landColumn}
                </dt>
                <dd className="mt-1 font-semibold text-gray-900 leading-relaxed">{row.land}</dd>
              </div>
            </dl>

            <p className="mt-3 text-gray-600 text-sm leading-relaxed">{row.note}</p>

            <a
              href={row.authorityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-emerald-700 text-sm underline decoration-emerald-300 underline-offset-4 hover:text-emerald-900"
            >
              {row.authority}
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
