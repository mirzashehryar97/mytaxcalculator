import { Megaphone, ShieldCheck } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { FREELANCER_PAGE_COPY } from '@/features/freelancer-tax/lib/content';

export default function FreelancerHero() {
  return (
    <CalculatorBadgeHero
      eyebrow={FREELANCER_PAGE_COPY.eyebrow}
      eyebrowIcon={Megaphone}
      title={FREELANCER_PAGE_COPY.title}
      subtitle={FREELANCER_PAGE_COPY.subtitle}
      badges={FREELANCER_PAGE_COPY.badges}
      badgeIcon={ShieldCheck}
    />
  );
}
