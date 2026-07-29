import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { buildFaqLd, getMetadata, routeStructuredData } from '@/lib/seo';

import BudgetBusinessSuperTaxView from '@/features/budget-comparison/BudgetBusinessSuperTaxView';
import {
  BUSINESS_SUPER_TAX_FAQS,
  BUSINESS_SUPER_TAX_ROUTE,
} from '@/features/budget-comparison/lib/businessSuperTaxContent';

export const metadata: Metadata = getMetadata(BUSINESS_SUPER_TAX_ROUTE);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          ...routeStructuredData(BUSINESS_SUPER_TAX_ROUTE),
          buildFaqLd(BUSINESS_SUPER_TAX_FAQS),
        ]}
      />
      <BudgetBusinessSuperTaxView />
    </>
  );
}
