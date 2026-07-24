import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import FreelancerTaxView from '@/features/freelancer-tax/FreelancerTaxView';
import {
  FREELANCER_TAX_ROUTE,
  FREELANCER_TAX_STRUCTURED_DATA,
} from '@/features/freelancer-tax/lib/structuredData';

export const metadata: Metadata = getMetadata(FREELANCER_TAX_ROUTE);

export default function FreelancerTaxPage() {
  return (
    <>
      <JsonLd data={FREELANCER_TAX_STRUCTURED_DATA} />
      <FreelancerTaxView />
    </>
  );
}
