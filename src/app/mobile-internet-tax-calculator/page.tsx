import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { PHONE_INTERNET_ROUTE } from '@/features/withholding-tax/lib/modes';
import { buildWithholdingStructuredData } from '@/features/withholding-tax/lib/structuredData';
import PhoneInternetTaxView from '@/features/withholding-tax/PhoneInternetTaxView';

export const metadata: Metadata = getMetadata(PHONE_INTERNET_ROUTE);

export default function PhoneInternetTaxPage() {
  return (
    <>
      <JsonLd data={buildWithholdingStructuredData('phone-internet')} />
      <PhoneInternetTaxView />
    </>
  );
}
