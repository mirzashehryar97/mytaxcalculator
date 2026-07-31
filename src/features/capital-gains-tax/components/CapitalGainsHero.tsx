import { Check } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { CAPITAL_GAINS_PAGE_COPY } from '@/features/capital-gains-tax/lib/content';
import { getCapitalGainsMode } from '@/features/capital-gains-tax/lib/modes';
import type { CapitalGainsMode } from '@/features/capital-gains-tax/types';

interface CapitalGainsHeroProps {
  mode: CapitalGainsMode;
}

export default function CapitalGainsHero({ mode }: CapitalGainsHeroProps) {
  const copy = CAPITAL_GAINS_PAGE_COPY[mode];

  return (
    <CalculatorBadgeHero
      eyebrow={copy.eyebrow}
      eyebrowIcon={getCapitalGainsMode(mode).icon}
      title={copy.title}
      subtitle={copy.subtitle}
      badges={copy.badges}
      badgeIcon={Check}
    />
  );
}
