import VehicleRegistrationTaxDetail from '@/features/vehicle-tax/components/VehicleRegistrationTaxDetail';
import VehicleUnratedNotice from '@/features/vehicle-tax/components/VehicleUnratedNotice';
import VehicleWorkingNote from '@/features/vehicle-tax/components/VehicleWorkingNote';
import {
  VEHICLE_REGISTRATION_PAGE_COPY,
  VEHICLE_REGISTRATION_RESULT_COPY,
} from '@/features/vehicle-tax/lib/content';
import { formatCharge, formatVehicleFiscalYear } from '@/features/vehicle-tax/lib/formatting';
import {
  getRegistrationModeLabel,
  getRegistrationWorking,
  getUnratedNotice,
} from '@/features/vehicle-tax/lib/presentation';
import type { VehicleRegistrationResult } from '@/features/vehicle-tax/types';

interface VehicleRegistrationResultSummaryProps {
  result: VehicleRegistrationResult;
}

export default function VehicleRegistrationResultSummary({
  result,
}: VehicleRegistrationResultSummaryProps) {
  const fiscalYearLabel = formatVehicleFiscalYear(result.fiscalYear);
  const unrated = getUnratedNotice(result);

  return (
    <div id="vehicle-tax-result" className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">
          {VEHICLE_REGISTRATION_PAGE_COPY.resultTitle}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getRegistrationModeLabel(result.mode)} · {fiscalYearLabel}
        </span>
      </div>

      {unrated ? (
        <VehicleUnratedNotice title={unrated.title} body={unrated.body} />
      ) : (
        <VehicleRegistrationTaxDetail result={result} />
      )}

      <VehicleWorkingNote
        title={`${VEHICLE_REGISTRATION_RESULT_COPY.workingTitle} (${fiscalYearLabel})`}
        body={getRegistrationWorking(result)}
        figure={result.charge ? formatCharge(result.charge) : undefined}
      />
    </div>
  );
}
