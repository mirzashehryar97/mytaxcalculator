import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import BusinessTaxView from '@/features/business-tax/BusinessTaxView';
import {
  BUSINESS_TAX_ROUTE,
  BUSINESS_TAX_STRUCTURED_DATA,
} from '@/features/business-tax/lib/structuredData';

export const metadata: Metadata = getMetadata(BUSINESS_TAX_ROUTE);

export default function BusinessTaxPage() {
  return (
    <>
      <JsonLd data={BUSINESS_TAX_STRUCTURED_DATA} />
      <BusinessTaxView />
    </>
  );
}
