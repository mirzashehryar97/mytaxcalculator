import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import TaxGuidesView from '@/features/tax-guides/TaxGuidesView';

export const metadata: Metadata = getMetadata('/tax-guides');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/tax-guides')} />
      <TaxGuidesView />
    </>
  );
}
