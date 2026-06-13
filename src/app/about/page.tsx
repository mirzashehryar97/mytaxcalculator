import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import AboutUs from '@/views/AboutUs';

export const metadata: Metadata = getMetadata('/about');

export default function Page() {
  return (
    <>
      <JsonLd data={routeStructuredData('/about')} />
      <AboutUs />
    </>
  );
}
