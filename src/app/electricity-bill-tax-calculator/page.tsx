import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import ElectricityBillTaxView from '@/features/withholding-tax/ElectricityBillTaxView';
import { ELECTRICITY_ROUTE } from '@/features/withholding-tax/lib/modes';
import { buildWithholdingStructuredData } from '@/features/withholding-tax/lib/structuredData';

export const metadata: Metadata = getMetadata(ELECTRICITY_ROUTE);

export default function ElectricityBillTaxPage() {
  return (
    <>
      <JsonLd data={buildWithholdingStructuredData('electricity')} />
      <ElectricityBillTaxView />
    </>
  );
}
