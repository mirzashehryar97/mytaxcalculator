import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { VEHICLE_REGISTRATION_ROUTE } from '@/features/vehicle-tax/lib/modes';
import { VEHICLE_REGISTRATION_STRUCTURED_DATA } from '@/features/vehicle-tax/lib/structuredData';
import VehicleRegistrationTaxView from '@/features/vehicle-tax/VehicleRegistrationTaxView';

export const metadata: Metadata = getMetadata(VEHICLE_REGISTRATION_ROUTE);

export default function VehicleTaxCalculatorPage() {
  return (
    <>
      <JsonLd data={VEHICLE_REGISTRATION_STRUCTURED_DATA} />
      <VehicleRegistrationTaxView />
    </>
  );
}
