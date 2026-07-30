import { BadgeCheck, ExternalLink, ShieldAlert } from 'lucide-react';

import { VEHICLE_TOKEN_RESULT_COPY } from '@/features/vehicle-tax/lib/content';
import type { VehicleTokenSource } from '@/features/vehicle-tax/types';

interface VehicleTokenSourceNoteProps {
  source: VehicleTokenSource;
}

/**
 * Says where the province's bands came from. An official schedule gets a quiet
 * confirmation; anything read off a secondary source is called out plainly, so
 * nobody mistakes an estimate for a published rate.
 */
export default function VehicleTokenSourceNote({ source }: VehicleTokenSourceNoteProps) {
  const isOfficial = source.tier === 'official';

  if (isOfficial) {
    return (
      <p className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed">
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-gray-900">
            {VEHICLE_TOKEN_RESULT_COPY.sourceOfficialTitle}
          </strong>{' '}
          {source.label}.{' '}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-800"
          >
            {VEHICLE_TOKEN_RESULT_COPY.sourceLink}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </span>
      </p>
    );
  }

  return (
    <p className="flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950 text-sm leading-relaxed">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
      <span>
        <strong className="block font-bold text-base">
          {VEHICLE_TOKEN_RESULT_COPY.sourceSecondaryTitle}
        </strong>
        <span className="mt-1 block">{VEHICLE_TOKEN_RESULT_COPY.sourceSecondaryBody}</span>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 font-semibold text-amber-900 underline decoration-amber-400 underline-offset-4 hover:text-amber-950"
        >
          {source.label}
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </span>
    </p>
  );
}
