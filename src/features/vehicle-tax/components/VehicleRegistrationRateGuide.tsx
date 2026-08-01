import VehicleRateTable from '@/features/vehicle-tax/components/VehicleRateTable';
import { VEHICLE_GUIDE_COPY } from '@/features/vehicle-tax/lib/content';
import {
  buildRegistrationRateRows,
  buildTransferRateRows,
  getRateGuideTitle,
} from '@/features/vehicle-tax/lib/presentation';
import { DEFAULT_VEHICLE_FISCAL_YEAR } from '@/features/vehicle-tax/lib/rates';

const REGISTRATION_ROWS = buildRegistrationRateRows(DEFAULT_VEHICLE_FISCAL_YEAR);
const TRANSFER_ROWS = buildTransferRateRows(DEFAULT_VEHICLE_FISCAL_YEAR);

/**
 * Both Section 231B tables, side by side down the page. These are pinned to the
 * current year rather than following the calculator's dropdown — the basis
 * changed on 1 July 2024, so the year is named in each heading.
 */
export default function VehicleRegistrationRateGuide() {
  return (
    <div className="mt-12 sm:mt-16">
      <VehicleRateTable
        id="vehicle-registration-rates"
        title={getRateGuideTitle(
          VEHICLE_GUIDE_COPY.registrationRateTitle,
          DEFAULT_VEHICLE_FISCAL_YEAR,
        )}
        description={VEHICLE_GUIDE_COPY.registrationRateDescription}
        rows={REGISTRATION_ROWS}
        note={VEHICLE_GUIDE_COPY.registrationNote}
      />
      <VehicleRateTable
        id="vehicle-transfer-rates"
        title={getRateGuideTitle(VEHICLE_GUIDE_COPY.transferRateTitle, DEFAULT_VEHICLE_FISCAL_YEAR)}
        description={VEHICLE_GUIDE_COPY.transferRateDescription}
        rows={TRANSFER_ROWS}
        note={VEHICLE_GUIDE_COPY.transferNote}
      />
    </div>
  );
}
