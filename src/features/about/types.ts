import type { LucideIcon } from 'lucide-react';

/** Colour meaning of a row in the hero preview card (see the result colour convention). */
export type AboutPreviewTone = 'neutral' | 'negative' | 'positive';

export interface AboutPreviewRow {
  id: string;
  label: string;
  note: string;
  tone: AboutPreviewTone;
}

export interface AboutTrustBadge {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface AboutStoryCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AboutPrinciple {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AboutSector {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface AboutProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}
