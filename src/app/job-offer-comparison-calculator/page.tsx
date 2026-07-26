import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import JobOfferComparisonView from '@/features/salary-increment/JobOfferComparisonView';
import { JOB_OFFER_COMPARISON_ROUTE } from '@/features/salary-increment/lib/content';
import { JOB_OFFER_COMPARISON_STRUCTURED_DATA } from '@/features/salary-increment/lib/structuredData';

export const metadata: Metadata = getMetadata(JOB_OFFER_COMPARISON_ROUTE);

export default function JobOfferComparisonPage() {
  return (
    <>
      <JsonLd data={JOB_OFFER_COMPARISON_STRUCTURED_DATA} />
      <JobOfferComparisonView />
    </>
  );
}
