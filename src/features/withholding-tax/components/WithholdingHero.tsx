import { Check } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { WITHHOLDING_PAGE_COPY } from '@/features/withholding-tax/lib/content';
import { getWithholdingMode } from '@/features/withholding-tax/lib/modes';
import type { WithholdingMode } from '@/features/withholding-tax/types';

interface WithholdingHeroProps {
  mode: WithholdingMode;
}

export default function WithholdingHero({ mode }: WithholdingHeroProps) {
  const copy = WITHHOLDING_PAGE_COPY[mode];

  return (
    <CalculatorBadgeHero
      eyebrow={copy.eyebrow}
      eyebrowIcon={getWithholdingMode(mode).icon}
      title={copy.title}
      subtitle={copy.subtitle}
      badges={copy.badges}
      badgeIcon={Check}
    />
  );
}
