import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import UnderstandingTaxSystem from '@/views/UnderstandingTaxSystem';

export const metadata: Metadata = getMetadata('/tax-guides/understanding-tax-system');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/tax-guides/understanding-tax-system')} />
      <UnderstandingTaxSystem />
    </>
  );
}
