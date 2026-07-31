import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import ListedSecuritiesTaxView from '@/features/capital-gains-tax/ListedSecuritiesTaxView';
import { LISTED_SECURITIES_ROUTE } from '@/features/capital-gains-tax/lib/modes';
import { buildCapitalGainsStructuredData } from '@/features/capital-gains-tax/lib/structuredData';

export const metadata: Metadata = getMetadata(LISTED_SECURITIES_ROUTE);

export default function CapitalGainsTaxPage() {
  return (
    <>
      <JsonLd data={buildCapitalGainsStructuredData('listed-securities')} />
      <ListedSecuritiesTaxView />
    </>
  );
}
