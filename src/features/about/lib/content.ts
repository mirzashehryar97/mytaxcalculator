import {
  Briefcase,
  ClipboardCheck,
  Compass,
  FileText,
  Gift,
  Home,
  Laptop,
  Lock,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
  SquareUser,
} from 'lucide-react';

import type {
  AboutPreviewRow,
  AboutPrinciple,
  AboutProcessStep,
  AboutSector,
  AboutStoryCard,
  AboutTrustBadge,
} from '@/features/about/types';

/** In-page anchor for the calculator grid — both hero and closing CTAs point at it. */
export const ABOUT_SECTORS_ANCHOR = 'calculators';

export const ABOUT_SOCIAL_IMAGE_COPY = {
  eyebrow: 'About · My Tax Calculator',
  title: 'Tax clarity, without the complexity',
  subtitle: 'Salary · Freelance · Business · Rental',
  features: 'Official FBR sources · Private by design · Free',
  brand: 'My Tax Calculator',
} as const;

export const ABOUT_HERO_COPY = {
  breadcrumb: 'About Us',
  eyebrow: 'Built for Pakistani taxpayers',
  titleLines: ['Tax clarity,', 'without the complexity.'],
  description:
    'My Tax Calculator turns official FBR rules into free, practical tools that help you understand what you owe — and what you keep.',
  primaryCta: { label: 'Explore calculators', href: `#${ABOUT_SECTORS_ANCHOR}` },
  secondaryCta: { label: 'Read tax guides', href: '/tax-guides' },
  previewNote: 'Calculated using latest FBR tax slabs (FY 2026–2027)',
} as const;

export const ABOUT_PREVIEW_ROWS: readonly AboutPreviewRow[] = [
  { id: 'gross', label: 'Annual income', note: 'Income before tax', tone: 'neutral' },
  { id: 'tax', label: 'Estimated tax', note: 'Total tax liability', tone: 'negative' },
  { id: 'net', label: 'Take-home income', note: 'Income after tax', tone: 'positive' },
];

export const ABOUT_TRUST_BADGES: readonly AboutTrustBadge[] = [
  { id: 'sources', label: 'Official FBR sources', icon: ShieldCheck },
  { id: 'privacy', label: 'Private by design', icon: Lock },
  { id: 'free', label: 'Free to use', icon: Gift },
];

export const ABOUT_STORY_COPY = {
  title: 'Why we built this',
  lead: 'Tax rules can be difficult. Understanding your own numbers should not be.',
  body: 'We saw how confusing tax rules and scattered information make it hard for people to plan with confidence. Our goal is simple: give you reliable tools and plain-English guidance so you can decide better about your money.',
} as const;

export const ABOUT_STORY_CARDS: readonly AboutStoryCard[] = [
  {
    id: 'problem',
    title: 'The problem',
    description:
      'Tax rules are complex, change often and are hard to apply without expert help. Most people end up unsure about what they owe — or miss deductions they’re entitled to.',
    icon: FileText,
  },
  {
    id: 'approach',
    title: 'Our approach',
    description:
      'We translate official FBR rules into simple calculators and guides. No jargon. No guesswork. Just clear answers you can trust, built for Pakistan.',
    icon: Compass,
  },
];

export const ABOUT_PRINCIPLES_TITLE = 'What guides every tool';

export const ABOUT_PRINCIPLES: readonly AboutPrinciple[] = [
  {
    id: 'accuracy',
    title: 'Official-source accuracy',
    description: 'Rates are checked against applicable FBR laws and documents.',
    icon: ClipboardCheck,
  },
  {
    id: 'plain-english',
    title: 'Plain-English results',
    description: 'Clear breakdowns help you see how each estimate is calculated.',
    icon: MessagesSquare,
  },
  {
    id: 'privacy',
    title: 'Privacy by design',
    description: 'Calculations run in your browser. Your salary figures are not sent or saved.',
    icon: LockKeyhole,
  },
];

export const ABOUT_SECTORS_COPY = {
  titleLines: ['One platform for the', 'way Pakistan earns'],
  description:
    'From salaries to side incomes, our tools cover the different ways people earn and plan.',
} as const;

/**
 * Appended to each sector card's visible label (screen-reader only) so the link
 * text reads "Salary tax calculator" rather than a bare "Salary" out of context.
 */
export const ABOUT_SECTOR_LINK_SUFFIX = 'tax calculator';

export const ABOUT_SECTORS: readonly AboutSector[] = [
  { id: 'salary', label: 'Salary', href: '/', icon: SquareUser },
  { id: 'freelancer', label: 'Freelancer & IT', href: '/freelancer-tax-calculator', icon: Laptop },
  { id: 'business', label: 'Business & AOP', href: '/business-tax-calculator', icon: Briefcase },
  { id: 'rental', label: 'Rental income', href: '/rental-income-tax-calculator', icon: Home },
];

export const ABOUT_PROCESS_TITLE = 'How we keep calculations trustworthy';

export const ABOUT_PROCESS_STEPS: readonly AboutProcessStep[] = [
  {
    id: 'verify',
    step: '01',
    title: 'Verify official sources',
    description:
      'We review the latest FBR laws, notifications and documents. Only official sources guide our calculations.',
  },
  {
    id: 'encode',
    step: '02',
    title: 'Encode the rules',
    description:
      'Tax rules are carefully translated into calculation logic and tested with real-world scenarios.',
  },
  {
    id: 'explain',
    step: '03',
    title: 'Explain the result',
    description:
      'You get clear, step-by-step breakdowns so you understand how your estimate is arrived at.',
  },
];

export const ABOUT_CTA_COPY = {
  title: 'Start with your numbers.',
  description:
    'Choose the calculator that matches your income and get a clear estimate in minutes.',
  button: { label: 'Choose a calculator', href: `#${ABOUT_SECTORS_ANCHOR}` },
} as const;
