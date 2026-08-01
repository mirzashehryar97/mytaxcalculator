import { FileText } from 'lucide-react';

import PolicyHero from '@/components/ui/policy/PolicyHero';
import PolicyHeroSummary from '@/components/ui/policy/PolicyHeroSummary';

import {
  TERMS_HERO_COPY,
  TERMS_HERO_FACTS,
  TERMS_TRUST_BADGES,
} from '@/features/terms-of-service/lib/content';

export default function TermsHero() {
  return (
    <PolicyHero
      copy={TERMS_HERO_COPY}
      trustBadges={TERMS_TRUST_BADGES}
      summary={
        <PolicyHeroSummary
          facts={TERMS_HERO_FACTS}
          note={TERMS_HERO_COPY.summaryNote}
          noteIcon={FileText}
        />
      }
    />
  );
}
