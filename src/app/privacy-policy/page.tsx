import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import PrivacyPolicyView from '@/features/privacy-policy/PrivacyPolicyView';

export const metadata: Metadata = getMetadata('/privacy-policy');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/privacy-policy')} />
      <PrivacyPolicyView />
    </>
  );
}
