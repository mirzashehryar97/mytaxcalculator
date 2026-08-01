import type { LucideIcon } from 'lucide-react';

export interface PrivacyHeroFact {
  id: string;
  label: string;
  value: string;
  tone: 'neutral' | 'positive';
}

export interface PrivacyTrustBadge {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface PrivacyHighlight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PrivacyProvider {
  id: string;
  name: string;
  description: string;
  detail: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
}

export interface PrivacyBullet {
  label: string;
  href?: string;
}

export interface PrivacySection {
  id: string;
  number: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly PrivacyBullet[];
  providers?: readonly PrivacyProvider[];
  icon: LucideIcon;
}
