import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { PTA_ROUTE } from '@/features/pta-tax/lib/content';
import { PTA_STRUCTURED_DATA } from '@/features/pta-tax/lib/structuredData';
import PtaTaxView from '@/features/pta-tax/PtaTaxView';

export const metadata: Metadata = getMetadata(PTA_ROUTE);

export default function PtaTaxCalculatorPage() {
  return (
    <>
      <JsonLd data={PTA_STRUCTURED_DATA} />
      <PtaTaxView />
    </>
  );
}
