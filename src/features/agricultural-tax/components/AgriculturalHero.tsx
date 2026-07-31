import { Check, Sprout } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { AGRICULTURAL_PAGE_COPY } from '@/features/agricultural-tax/lib/content';

export default function AgriculturalHero() {
  return (
    <CalculatorBadgeHero
      eyebrow={AGRICULTURAL_PAGE_COPY.eyebrow}
      eyebrowIcon={Sprout}
      title={AGRICULTURAL_PAGE_COPY.title}
      subtitle={AGRICULTURAL_PAGE_COPY.subtitle}
      badges={AGRICULTURAL_PAGE_COPY.badges}
      badgeIcon={Check}
    />
  );
}
