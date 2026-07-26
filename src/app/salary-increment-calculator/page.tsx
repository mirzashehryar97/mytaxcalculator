import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { SALARY_INCREMENT_ROUTE } from '@/features/salary-increment/lib/content';
import { SALARY_INCREMENT_STRUCTURED_DATA } from '@/features/salary-increment/lib/structuredData';
import SalaryIncrementView from '@/features/salary-increment/SalaryIncrementView';

export const metadata: Metadata = getMetadata(SALARY_INCREMENT_ROUTE);

export default function SalaryIncrementPage() {
  return (
    <>
      <JsonLd data={SALARY_INCREMENT_STRUCTURED_DATA} />
      <SalaryIncrementView />
    </>
  );
}
