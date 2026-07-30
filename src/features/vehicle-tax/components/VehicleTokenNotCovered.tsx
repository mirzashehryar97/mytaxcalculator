import { ExternalLink, ShieldAlert } from 'lucide-react';

import { VEHICLE_TOKEN_RESULT_COPY } from '@/features/vehicle-tax/lib/content';
import type { VehicleProvinceConfig } from '@/features/vehicle-tax/types';

interface VehicleTokenNotCoveredProps {
  province: VehicleProvinceConfig;
}

/** Shown for a province whose yearly table we have nothing verified for. */
export default function VehicleTokenNotCovered({ province }: VehicleTokenNotCoveredProps) {
  return (
    <p className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950 text-sm leading-relaxed">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
      <span>
        <strong className="block font-bold text-base">
          {VEHICLE_TOKEN_RESULT_COPY.notCoveredTitle}
        </strong>
        <span className="mt-1 block">{VEHICLE_TOKEN_RESULT_COPY.notCoveredBody}</span>
        <a
          href={province.authorityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 font-semibold text-amber-900 underline decoration-amber-400 underline-offset-4 hover:text-amber-950"
        >
          {VEHICLE_TOKEN_RESULT_COPY.notCoveredLink}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </span>
    </p>
  );
}
