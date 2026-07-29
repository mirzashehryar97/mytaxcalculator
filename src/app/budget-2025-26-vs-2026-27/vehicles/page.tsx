import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { buildFaqLd, getMetadata, routeStructuredData } from '@/lib/seo';

import BudgetVehiclesView from '@/features/budget-comparison/BudgetVehiclesView';
import { VEHICLES_FAQS, VEHICLES_ROUTE } from '@/features/budget-comparison/lib/vehiclesContent';

export const metadata: Metadata = getMetadata(VEHICLES_ROUTE);

export default function Page() {
  return (
    <>
      <JsonLd data={[...routeStructuredData(VEHICLES_ROUTE), buildFaqLd(VEHICLES_FAQS)]} />
      <BudgetVehiclesView />
    </>
  );
}
