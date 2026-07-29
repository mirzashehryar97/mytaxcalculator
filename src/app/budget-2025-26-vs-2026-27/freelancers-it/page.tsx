import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { buildFaqLd, getMetadata, routeStructuredData } from '@/lib/seo';

import BudgetFreelancersItView from '@/features/budget-comparison/BudgetFreelancersItView';
import {
  FREELANCERS_IT_FAQS,
  FREELANCERS_IT_ROUTE,
} from '@/features/budget-comparison/lib/freelancersItContent';

export const metadata: Metadata = getMetadata(FREELANCERS_IT_ROUTE);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[...routeStructuredData(FREELANCERS_IT_ROUTE), buildFaqLd(FREELANCERS_IT_FAQS)]}
      />
      <BudgetFreelancersItView />
    </>
  );
}
