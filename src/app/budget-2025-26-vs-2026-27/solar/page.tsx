import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { buildFaqLd, getMetadata, routeStructuredData } from '@/lib/seo';

import BudgetSolarView from '@/features/budget-comparison/BudgetSolarView';
import { SOLAR_FAQS, SOLAR_ROUTE } from '@/features/budget-comparison/lib/solarContent';

export const metadata: Metadata = getMetadata(SOLAR_ROUTE);

export default function Page() {
  return (
    <>
      <JsonLd data={[...routeStructuredData(SOLAR_ROUTE), buildFaqLd(SOLAR_FAQS)]} />
      <BudgetSolarView />
    </>
  );
}
