import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import TaxNews from '@/views/TaxNews';

export const metadata: Metadata = getMetadata('/tax-news');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/tax-news')} />
      <TaxNews />
    </>
  );
}
