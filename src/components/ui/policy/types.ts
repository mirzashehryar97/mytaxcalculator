import type { LucideIcon } from 'lucide-react';

export interface PolicyHeroFact {
  id: string;
  label: string;
  value: string;
  tone: 'neutral' | 'positive';
}

export interface PolicyTrustBadge {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface PolicyHighlight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PolicyBullet {
  label: string;
  href?: string;
}

export interface PolicySectionContent {
  id: string;
  number: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly PolicyBullet[];
  icon: LucideIcon;
}

export interface PolicyHeroCopy {
  breadcrumb: string;
  eyebrow: string;
  titleLines: readonly string[];
  description: string;
  reviewedLabel: string;
}

export interface PolicyHighlightsCopy {
  eyebrow: string;
  title: string;
  description: string;
}

export interface PolicyBodyCopy {
  eyebrow: string;
  title: string;
  introduction: string;
  navigationLabel: string;
}

export interface PolicyContactCopy {
  eyebrow: string;
  title: string;
  description: string;
  email: string;
  buttonLabel: string;
  note: string;
}
