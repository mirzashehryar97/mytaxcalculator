import { ShieldCheck } from 'lucide-react';

import PolicyHero from '@/components/ui/policy/PolicyHero';
import PolicyHeroSummary from '@/components/ui/policy/PolicyHeroSummary';

import {
  PRIVACY_HERO_COPY,
  PRIVACY_HERO_FACTS,
  PRIVACY_TRUST_BADGES,
} from '@/features/privacy-policy/lib/content';

export default function PrivacyHero() {
  return (
    <PolicyHero
      copy={PRIVACY_HERO_COPY}
      trustBadges={PRIVACY_TRUST_BADGES}
      summary={
        <PolicyHeroSummary
          facts={PRIVACY_HERO_FACTS}
          note={PRIVACY_HERO_COPY.summaryNote}
          noteIcon={ShieldCheck}
        />
      }
    />
  );
}
