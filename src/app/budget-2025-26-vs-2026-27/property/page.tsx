import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { buildFaqLd, getMetadata, routeStructuredData } from '@/lib/seo';

import BudgetPropertyView from '@/features/budget-comparison/BudgetPropertyView';
import { PROPERTY_FAQS, PROPERTY_ROUTE } from '@/features/budget-comparison/lib/propertyContent';

export const metadata: Metadata = getMetadata(PROPERTY_ROUTE);

export default function Page() {
  return (
    <>
      <JsonLd data={[...routeStructuredData(PROPERTY_ROUTE), buildFaqLd(PROPERTY_FAQS)]} />
      <BudgetPropertyView />
    </>
  );
}
