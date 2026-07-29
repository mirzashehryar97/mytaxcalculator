import { Briefcase, Check } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { BUSINESS_PAGE_COPY } from '@/features/business-tax/lib/content';

export default function BusinessHero() {
  return (
    <CalculatorBadgeHero
      eyebrow={BUSINESS_PAGE_COPY.eyebrow}
      eyebrowIcon={Briefcase}
      title={BUSINESS_PAGE_COPY.title}
      subtitle={BUSINESS_PAGE_COPY.subtitle}
      badges={BUSINESS_PAGE_COPY.badges}
      badgeIcon={Check}
    />
  );
}
