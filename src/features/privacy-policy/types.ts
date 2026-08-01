import type { LucideIcon } from 'lucide-react';

import type {
  PolicyHeroFact,
  PolicyHighlight,
  PolicySectionContent,
  PolicyTrustBadge,
} from '@/components/ui/policy/types';

export type PrivacyHeroFact = PolicyHeroFact;

export type PrivacyTrustBadge = PolicyTrustBadge;

export type PrivacyHighlight = PolicyHighlight;

export interface PrivacyProvider {
  id: string;
  name: string;
  description: string;
  detail: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
}

export interface PrivacySection extends PolicySectionContent {
  providers?: readonly PrivacyProvider[];
}
