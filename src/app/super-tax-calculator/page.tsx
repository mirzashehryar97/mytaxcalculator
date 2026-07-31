import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { SUPER_TAX_ROUTE } from '@/features/corporate-tax/lib/modes';
import { buildCorporateStructuredData } from '@/features/corporate-tax/lib/structuredData';
import SuperTaxView from '@/features/corporate-tax/SuperTaxView';

export const metadata: Metadata = getMetadata(SUPER_TAX_ROUTE);

export default function SuperTaxPage() {
  return (
    <>
      <JsonLd data={buildCorporateStructuredData('super-tax')} />
      <SuperTaxView />
    </>
  );
}
