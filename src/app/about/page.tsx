import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import AboutView from '@/features/about/AboutView';

export const metadata: Metadata = getMetadata('/about');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/about')} />
      <AboutView />
    </>
  );
}
