import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { buildFaqLd, getMetadata, routeStructuredData } from '@/lib/seo';

import BudgetDefenceView from '@/features/budget-comparison/BudgetDefenceView';
import { DEFENCE_FAQS, DEFENCE_ROUTE } from '@/features/budget-comparison/lib/defenceContent';

export const metadata: Metadata = getMetadata(DEFENCE_ROUTE);

export default function Page() {
  return (
    <>
      <JsonLd data={[...routeStructuredData(DEFENCE_ROUTE), buildFaqLd(DEFENCE_FAQS)]} />
      <BudgetDefenceView />
    </>
  );
}
