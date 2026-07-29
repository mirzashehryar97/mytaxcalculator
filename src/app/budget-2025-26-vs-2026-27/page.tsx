import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { budgetComparisonFaqLd, getMetadata, routeStructuredData } from '@/lib/seo';

import BudgetComparisonView from '@/features/budget-comparison/BudgetComparisonView';

export const metadata: Metadata = getMetadata('/budget-2025-26-vs-2026-27');

export default function Page() {
  return (
    <>
      <JsonLd
        data={[...routeStructuredData('/budget-2025-26-vs-2026-27'), budgetComparisonFaqLd]}
      />
      <BudgetComparisonView />
    </>
  );
}
