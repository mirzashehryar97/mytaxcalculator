import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { PROPERTY_CAPITAL_GAINS_ROUTE } from '@/features/property-tax/lib/modes';
import { buildPropertyStructuredData } from '@/features/property-tax/lib/structuredData';
import PropertyCapitalGainsTaxView from '@/features/property-tax/PropertyCapitalGainsTaxView';

export const metadata: Metadata = getMetadata(PROPERTY_CAPITAL_GAINS_ROUTE);

export default function PropertyCapitalGainsTaxPage() {
  return (
    <>
      <JsonLd data={buildPropertyStructuredData('capital-gains')} />
      <PropertyCapitalGainsTaxView />
    </>
  );
}
