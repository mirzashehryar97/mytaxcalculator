import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { filingHowToLd, getMetadata, routeStructuredData } from '@/lib/seo';

import FilingTaxReturn from '@/views/FilingTaxReturn';

export const metadata: Metadata = getMetadata('/tax-guides/filing-tax-return');

export default function Page() {
  return (
    <>
      <JsonLd data={[...routeStructuredData('/tax-guides/filing-tax-return'), filingHowToLd]} />
      <FilingTaxReturn />
    </>
  );
}
