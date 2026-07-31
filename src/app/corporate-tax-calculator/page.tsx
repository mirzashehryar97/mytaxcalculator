import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import CorporateTaxView from '@/features/corporate-tax/CorporateTaxView';
import { CORPORATE_TAX_ROUTE } from '@/features/corporate-tax/lib/modes';
import { buildCorporateStructuredData } from '@/features/corporate-tax/lib/structuredData';

export const metadata: Metadata = getMetadata(CORPORATE_TAX_ROUTE);

export default function CorporateTaxPage() {
  return (
    <>
      <JsonLd data={buildCorporateStructuredData('company-tax')} />
      <CorporateTaxView />
    </>
  );
}
