import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { PROPERTY_SALE_ROUTE } from '@/features/property-tax/lib/modes';
import { buildPropertyStructuredData } from '@/features/property-tax/lib/structuredData';
import PropertySaleTaxView from '@/features/property-tax/PropertySaleTaxView';

export const metadata: Metadata = getMetadata(PROPERTY_SALE_ROUTE);

export default function PropertySaleTaxPage() {
  return (
    <>
      <JsonLd data={buildPropertyStructuredData('sale')} />
      <PropertySaleTaxView />
    </>
  );
}
