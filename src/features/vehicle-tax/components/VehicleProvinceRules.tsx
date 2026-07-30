import { CheckCircle2, ExternalLink, Info, MapPin } from 'lucide-react';

import { VEHICLE_GUIDE_COPY, VEHICLE_TOKEN_RESULT_COPY } from '@/features/vehicle-tax/lib/content';
import {
  buildTokenProvinceSummary,
  getTokenSourceSummary,
} from '@/features/vehicle-tax/lib/presentation';
import {
  DEFAULT_VEHICLE_TOKEN_FISCAL_YEAR,
  VEHICLE_PROVINCES,
} from '@/features/vehicle-tax/lib/rates';

/** Every province we know about, with its published bands where there are any. */
export default function VehicleProvinceRules() {
  return (
    <section
      id="vehicle-province-rules"
      className="mt-12 scroll-mt-24 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="vehicle-province-rules-heading"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2
            id="vehicle-province-rules-heading"
            className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
          >
            {VEHICLE_GUIDE_COPY.tokenTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600 leading-relaxed">
            {VEHICLE_GUIDE_COPY.tokenDescription}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {VEHICLE_PROVINCES.map((province) => {
          const { rows, source } = buildTokenProvinceSummary(
            province.province,
            DEFAULT_VEHICLE_TOKEN_FISCAL_YEAR,
          );

          return (
            <article
              key={province.province}
              className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-bold text-gray-900 text-lg">{province.label}</h3>
                {source === null ? (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-semibold text-amber-800 text-xs">
                    No table published
                  </span>
                ) : (
                  <span
                    className={
                      source.tier === 'official'
                        ? 'rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-700 text-xs'
                        : 'rounded-full bg-amber-100 px-2.5 py-0.5 font-semibold text-amber-800 text-xs'
                    }
                  >
                    {source.tier === 'official'
                      ? VEHICLE_TOKEN_RESULT_COPY.sourceOfficialBadge
                      : VEHICLE_TOKEN_RESULT_COPY.sourceSecondaryBadge}
                  </span>
                )}
              </div>

              {rows.length > 0 ? (
                <dl className="mt-4 space-y-2 text-sm">
                  {rows.map((row) => (
                    <div className="flex items-baseline justify-between gap-4" key={row.id}>
                      <dt className="min-w-0 text-gray-600">{row.band}</dt>
                      <dd className="shrink-0 text-right">
                        <span className="block font-semibold text-gray-900 tabular-nums">
                          {row.amount}
                        </span>
                        <span className="block text-gray-500 text-xs">{row.frequency}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <ul className="mt-4 space-y-2">
                {province.notes.map((note) => (
                  <li key={note} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              {source === null ? null : (
                <p className="mt-4 text-gray-500 text-xs leading-relaxed">
                  {getTokenSourceSummary(source)}
                </p>
              )}

              <a
                href={province.authorityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-emerald-700 text-sm hover:text-emerald-800"
              >
                {province.authority}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>

      <p className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <span>{VEHICLE_TOKEN_RESULT_COPY.reVerifyNote}</span>
      </p>
    </section>
  );
}
