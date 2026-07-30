import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { VEHICLE_TOKEN_ROUTE } from '@/features/vehicle-tax/lib/modes';
import { VEHICLE_TOKEN_STRUCTURED_DATA } from '@/features/vehicle-tax/lib/structuredData';
import VehicleTokenTaxView from '@/features/vehicle-tax/VehicleTokenTaxView';

export const metadata: Metadata = getMetadata(VEHICLE_TOKEN_ROUTE);

export default function VehicleTokenTaxCalculatorPage() {
  return (
    <>
      <JsonLd data={VEHICLE_TOKEN_STRUCTURED_DATA} />
      <VehicleTokenTaxView />
    </>
  );
}
