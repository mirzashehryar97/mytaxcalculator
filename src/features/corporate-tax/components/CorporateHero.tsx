import { Check } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import { getCorporateMode } from '@/features/corporate-tax/lib/modes';
import type { CorporateMode } from '@/features/corporate-tax/types';

interface CorporateHeroProps {
  mode: CorporateMode;
}

export default function CorporateHero({ mode }: CorporateHeroProps) {
  const copy = CORPORATE_PAGE_COPY[mode];

  return (
    <CalculatorBadgeHero
      eyebrow={copy.eyebrow}
      eyebrowIcon={getCorporateMode(mode).icon}
      title={copy.title}
      subtitle={copy.subtitle}
      badges={copy.badges}
      badgeIcon={Check}
    />
  );
}
