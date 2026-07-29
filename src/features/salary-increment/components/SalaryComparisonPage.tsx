import type { ReactNode } from 'react';

import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import type { SalaryComparisonMode } from '@/features/salary-increment/types';

import SalaryComparisonCalculator from './SalaryComparisonCalculator';

interface SalaryComparisonPageProps {
  mode: SalaryComparisonMode;
  currentHref: string;
  hero: ReactNode;
  methodology: ReactNode;
  sources: ReactNode;
  faq: ReactNode;
}

export default function SalaryComparisonPage({
  mode,
  currentHref,
  hero,
  methodology,
  sources,
  faq,
}: SalaryComparisonPageProps) {
  return (
    <>
      {hero}
      <SalaryComparisonCalculator mode={mode} />
      {methodology}
      {faq}
      <RelatedCalculators currentHref={currentHref} />
      {sources}
    </>
  );
}
