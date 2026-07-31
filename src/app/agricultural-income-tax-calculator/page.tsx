import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import AgriculturalTaxView from '@/features/agricultural-tax/AgriculturalTaxView';
import { AGRICULTURAL_TAX_ROUTE } from '@/features/agricultural-tax/lib/provinces';
import { buildAgriculturalStructuredData } from '@/features/agricultural-tax/lib/structuredData';

export const metadata: Metadata = getMetadata(AGRICULTURAL_TAX_ROUTE);

export default function AgriculturalIncomeTaxPage() {
  return (
    <>
      <JsonLd data={buildAgriculturalStructuredData()} />
      <AgriculturalTaxView />
    </>
  );
}
