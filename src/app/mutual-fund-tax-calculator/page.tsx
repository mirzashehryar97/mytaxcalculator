import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { MUTUAL_FUND_ROUTE } from '@/features/capital-gains-tax/lib/modes';
import { buildCapitalGainsStructuredData } from '@/features/capital-gains-tax/lib/structuredData';
import MutualFundTaxView from '@/features/capital-gains-tax/MutualFundTaxView';

export const metadata: Metadata = getMetadata(MUTUAL_FUND_ROUTE);

export default function MutualFundTaxPage() {
  return (
    <>
      <JsonLd data={buildCapitalGainsStructuredData('mutual-funds')} />
      <MutualFundTaxView />
    </>
  );
}
