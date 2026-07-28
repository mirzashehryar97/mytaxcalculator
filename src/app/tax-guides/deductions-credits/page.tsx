import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import TaxDeductionsCreditsView from '@/features/tax-guides/TaxDeductionsCreditsView';

export const metadata: Metadata = getMetadata('/tax-guides/deductions-credits');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/tax-guides/deductions-credits')} />
      <TaxDeductionsCreditsView />
    </>
  );
}
