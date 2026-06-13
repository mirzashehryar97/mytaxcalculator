import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import TaxGuides from '@/views/TaxGuides';

export const metadata: Metadata = getMetadata('/tax-guides');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/tax-guides')} />
      <TaxGuides />
    </>
  );
}
