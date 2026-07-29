import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import {
  RENTAL_TAX_ROUTE,
  RENTAL_TAX_STRUCTURED_DATA,
} from '@/features/rental-income-tax/lib/structuredData';
import RentalIncomeTaxView from '@/features/rental-income-tax/RentalIncomeTaxView';

export const metadata: Metadata = getMetadata(RENTAL_TAX_ROUTE);

export default function RentalIncomeTaxPage() {
  return (
    <>
      <JsonLd data={RENTAL_TAX_STRUCTURED_DATA} />
      <RentalIncomeTaxView />
    </>
  );
}
