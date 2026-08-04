import { ShieldCheck, Smartphone } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { PTA_PAGE_COPY } from '@/features/pta-tax/lib/content';

export default function PtaHero() {
  return (
    <CalculatorBadgeHero
      badgeIcon={ShieldCheck}
      badges={PTA_PAGE_COPY.badges}
      eyebrow={PTA_PAGE_COPY.eyebrow}
      eyebrowIcon={Smartphone}
      subtitle={PTA_PAGE_COPY.subtitle}
      title={PTA_PAGE_COPY.title}
    />
  );
}
