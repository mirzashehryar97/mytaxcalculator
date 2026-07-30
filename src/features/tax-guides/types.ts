import type { LucideIcon } from 'lucide-react';

import type { SourceLogo } from '@/components/calculator/OfficialSourcesGrid';

export interface TaxGuideCardContent {
  id: string;
  title: string;
  description: string;
  href: string;
  readingTime: string;
  icon: LucideIcon;
  featured: boolean;
}

export interface TaxGuideTopic {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface TaxGuideTrustItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface TaxYearFact {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface TaxGuideFaqItem {
  id: string;
  question: string;
  answer: string;
  href: string;
  linkLabel: string;
}

export interface TaxGuideResource {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: SourceLogo;
}

export interface TaxGuideSearchEntry {
  id: string;
  title: string;
  description: string;
  href: string;
  keywords: readonly string[];
}

export interface TaxGuideArticleMetaItem {
  id: string;
  label: string;
  icon: LucideIcon;
  dateTime?: string;
  href?: string;
}

export interface TaxGuideArticleHeroContent {
  breadcrumb: string;
  badge: string;
  title: string;
  description: string;
  meta: readonly TaxGuideArticleMetaItem[];
  primaryAction?: TaxGuideArticleHeroAction;
}

export interface TaxGuideArticleHeroAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface TaxGuideArticleTocItem {
  id: string;
  label: string;
  href: string;
}

export interface TaxGuideArticleTool {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

export interface TaxGuideArticleSource {
  label: string;
  href: string;
}

export interface TaxGuideArticleInfoCard {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
}

export interface TaxGuideIncomeHead {
  id: string;
  title: string;
  description: string;
  /** Calculator that prices this head, linked from the card when present. */
  href?: string;
  /** Link text for `href`, e.g. "Property capital gains calculator". */
  linkLabel?: string;
}

export interface TaxGuideSlabRow {
  id: string;
  income: string;
  rate: string;
}

export interface TaxGuideFilingCheck {
  id: string;
  label: string;
}

export interface TaxGuideRelatedArticle {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface TaxGuideReliefComparison {
  id: string;
  title: string;
  description: string;
  steps: readonly string[];
  icon: LucideIcon;
  tone: 'emerald' | 'blue';
}

export interface TaxGuideReliefFinderRow {
  id: string;
  payment: string;
  evidence: string;
  verification: string;
  icon: LucideIcon;
}

export interface TaxGuideReliefCategory {
  id: string;
  title: string;
  effect: string;
  evidence: string;
  href: string;
  icon: LucideIcon;
}

export interface TaxGuideIrisStep {
  id: string;
  number: number;
  title: string;
  icon: LucideIcon;
}

export interface TaxGuideFilingPreparationCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TaxGuideFilingDocument {
  id: string;
  label: string;
}

export interface TaxGuideFilingProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface TaxGuideWealthFormulaItem {
  id: string;
  label: string;
  operator?: '+' | '-' | '=';
}

export interface TaxGuideAfterFilingStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}
