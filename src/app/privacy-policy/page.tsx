import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import PrivacyPolicy from '@/views/PrivacyPolicy';

export const metadata: Metadata = getMetadata('/privacy-policy');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/privacy-policy')} />
      <PrivacyPolicy />
    </>
  );
}
