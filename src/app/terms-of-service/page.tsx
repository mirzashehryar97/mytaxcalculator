import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import TermsOfService from '@/views/TermsOfService';

export const metadata: Metadata = getMetadata('/terms-of-service');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/terms-of-service')} />
      <TermsOfService />
    </>
  );
}
