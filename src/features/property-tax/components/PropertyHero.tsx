import { Check } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { PROPERTY_PAGE_COPY } from '@/features/property-tax/lib/content';
import { getPropertyMode } from '@/features/property-tax/lib/modes';
import type { PropertyMode } from '@/features/property-tax/types';

interface PropertyHeroProps {
  mode: PropertyMode;
}

export default function PropertyHero({ mode }: PropertyHeroProps) {
  const copy = PROPERTY_PAGE_COPY[mode];

  return (
    <CalculatorBadgeHero
      eyebrow={copy.eyebrow}
      eyebrowIcon={getPropertyMode(mode).icon}
      title={copy.title}
      subtitle={copy.subtitle}
      badges={copy.badges}
      badgeIcon={Check}
    />
  );
}
