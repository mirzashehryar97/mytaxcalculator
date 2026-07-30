import VehicleRateTable from '@/features/vehicle-tax/components/VehicleRateTable';
import { VEHICLE_GUIDE_COPY } from '@/features/vehicle-tax/lib/content';
import { buildAnnualTaxRows } from '@/features/vehicle-tax/lib/presentation';

const ANNUAL_TAX_ROWS = buildAnnualTaxRows();

/** The federal amounts collected at the token counter, by engine size. */
export default function VehicleAnnualTaxGuide() {
  return (
    <div className="mt-12 sm:mt-16">
      <VehicleRateTable
        id="vehicle-annual-tax-rates"
        title={VEHICLE_GUIDE_COPY.annualTaxTitle}
        description={VEHICLE_GUIDE_COPY.annualTaxDescription}
        rows={ANNUAL_TAX_ROWS}
        note={VEHICLE_GUIDE_COPY.annualTaxNote}
      />
    </div>
  );
}
