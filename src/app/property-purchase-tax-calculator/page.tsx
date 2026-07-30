import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { PROPERTY_PURCHASE_ROUTE } from '@/features/property-tax/lib/modes';
import { buildPropertyStructuredData } from '@/features/property-tax/lib/structuredData';
import PropertyPurchaseTaxView from '@/features/property-tax/PropertyPurchaseTaxView';

export const metadata: Metadata = getMetadata(PROPERTY_PURCHASE_ROUTE);

export default function PropertyPurchaseTaxPage() {
  return (
    <>
      <JsonLd data={buildPropertyStructuredData('purchase')} />
      <PropertyPurchaseTaxView />
    </>
  );
}
