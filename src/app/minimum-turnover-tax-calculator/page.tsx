import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { MINIMUM_TURNOVER_TAX_ROUTE } from '@/features/corporate-tax/lib/modes';
import { buildCorporateStructuredData } from '@/features/corporate-tax/lib/structuredData';
import MinimumTurnoverTaxView from '@/features/corporate-tax/MinimumTurnoverTaxView';

export const metadata: Metadata = getMetadata(MINIMUM_TURNOVER_TAX_ROUTE);

export default function MinimumTurnoverTaxPage() {
  return (
    <>
      <JsonLd data={buildCorporateStructuredData('minimum-tax')} />
      <MinimumTurnoverTaxView />
    </>
  );
}
