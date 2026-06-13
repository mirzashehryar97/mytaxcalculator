import type { Metadata } from 'next';

import HomeContent from '@/components/HomeContent';
import JsonLd from '@/components/JsonLd';

import { buildBreadcrumb, faqLd, getMetadata, webApplicationLd } from '@/lib/seo';

export const metadata: Metadata = getMetadata('/');

export default function HomePage() {
  return (
    <>
      <JsonLd data={[buildBreadcrumb('/'), webApplicationLd, faqLd]} />
      <HomeContent />
    </>
  );
}
