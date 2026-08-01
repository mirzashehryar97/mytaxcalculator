import VehicleRateTable from '@/features/vehicle-tax/components/VehicleRateTable';
import { VEHICLE_GUIDE_COPY } from '@/features/vehicle-tax/lib/content';
import {
  buildAnnualTaxLumpSumRows,
  buildAnnualTaxRows,
} from '@/features/vehicle-tax/lib/presentation';

const ANNUAL_TAX_ROWS = buildAnnualTaxRows();
const LUMP_SUM_TAX_ROWS = buildAnnualTaxLumpSumRows();

/**
 * The federal amounts collected at the token counter, by engine size. Division
 * III has two tables and the calculator charges from both, so both are printed.
 */
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
      <VehicleRateTable
        id="vehicle-lump-sum-tax-rates"
        title={VEHICLE_GUIDE_COPY.annualTaxLumpSumTitle}
        description={VEHICLE_GUIDE_COPY.annualTaxLumpSumDescription}
        rows={LUMP_SUM_TAX_ROWS}
        note={VEHICLE_GUIDE_COPY.annualTaxLumpSumNote}
      />
    </div>
  );
}
