import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata, routeStructuredData } from '@/lib/seo';

import EmbedSalaryTaxView from '@/features/embed-salary-tax/EmbedSalaryTaxView';
import { EMBED_SALARY_TAX_ROUTE } from '@/features/embed-salary-tax/lib/content';

export const metadata: Metadata = getMetadata(EMBED_SALARY_TAX_ROUTE);

export default function EmbedSalaryTaxPage() {
  return (
    <>
      <JsonLd data={routeStructuredData(EMBED_SALARY_TAX_ROUTE)} />
      <EmbedSalaryTaxView />
    </>
  );
}
