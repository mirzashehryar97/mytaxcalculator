import VehicleRateTable from '@/features/vehicle-tax/components/VehicleRateTable';
import { VEHICLE_GUIDE_COPY } from '@/features/vehicle-tax/lib/content';
import {
  buildRegistrationRateRows,
  buildTransferRateRows,
} from '@/features/vehicle-tax/lib/presentation';
import { DEFAULT_VEHICLE_FISCAL_YEAR } from '@/features/vehicle-tax/lib/rates';

const REGISTRATION_ROWS = buildRegistrationRateRows(DEFAULT_VEHICLE_FISCAL_YEAR);
const TRANSFER_ROWS = buildTransferRateRows(DEFAULT_VEHICLE_FISCAL_YEAR);

/** Both Section 231B tables for the current year, side by side down the page. */
export default function VehicleRegistrationRateGuide() {
  return (
    <div className="mt-12 sm:mt-16">
      <VehicleRateTable
        id="vehicle-registration-rates"
        title={VEHICLE_GUIDE_COPY.registrationRateTitle}
        description={VEHICLE_GUIDE_COPY.registrationRateDescription}
        rows={REGISTRATION_ROWS}
        note={VEHICLE_GUIDE_COPY.registrationNote}
      />
      <VehicleRateTable
        id="vehicle-transfer-rates"
        title={VEHICLE_GUIDE_COPY.transferRateTitle}
        description={VEHICLE_GUIDE_COPY.transferRateDescription}
        rows={TRANSFER_ROWS}
        note={VEHICLE_GUIDE_COPY.transferNote}
      />
    </div>
  );
}
