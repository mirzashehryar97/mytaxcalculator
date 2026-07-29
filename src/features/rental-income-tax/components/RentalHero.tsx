import { Check, Home } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { RENTAL_PAGE_COPY } from '@/features/rental-income-tax/lib/content';

export default function RentalHero() {
  return (
    <CalculatorBadgeHero
      eyebrow={RENTAL_PAGE_COPY.eyebrow}
      eyebrowIcon={Home}
      title={RENTAL_PAGE_COPY.title}
      subtitle={RENTAL_PAGE_COPY.subtitle}
      badges={RENTAL_PAGE_COPY.badges}
      badgeIcon={Check}
    />
  );
}
