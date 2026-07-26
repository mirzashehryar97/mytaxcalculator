import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import { REVERSE_SALARY_ROUTE } from '@/features/reverse-salary/lib/content';
import { REVERSE_SALARY_STRUCTURED_DATA } from '@/features/reverse-salary/lib/structuredData';
import ReverseSalaryView from '@/features/reverse-salary/ReverseSalaryView';

export const metadata: Metadata = getMetadata(REVERSE_SALARY_ROUTE);

export default function ReverseSalaryPage() {
  return (
    <>
      <JsonLd data={REVERSE_SALARY_STRUCTURED_DATA} />
      <ReverseSalaryView />
    </>
  );
}
