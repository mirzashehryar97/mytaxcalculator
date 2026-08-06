import {
  AlertCircle,
  AlertTriangle,
  BadgeCheck,
  Calculator,
  Copyright,
  FileText,
  RefreshCw,
  Scale,
  ShieldCheck,
} from 'lucide-react';

import type {
  PolicyHeroFact,
  PolicyHighlight,
  PolicySectionContent,
  PolicyTrustBadge,
} from '@/components/ui/policy/types';

import { CONTACT_EMAIL } from '@/lib/contact';

export const TERMS_LAST_UPDATED = 'June 12, 2026';

export const TERMS_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Terms · My Tax Calculator',
  title: 'Simple tools. Clear boundaries.',
  subtitle: 'Free Pakistan tax estimates with terms written in plain language.',
  features: 'Estimates only · Verify before filing · Fair use',
  brand: 'My Tax Calculator',
} as const;

export const TERMS_HERO_COPY = {
  breadcrumb: 'Terms of Service',
  eyebrow: 'Terms, without the fine-print fog',
  titleLines: ['Simple tools.', 'Clear boundaries.'],
  description:
    'These terms explain how you may use My Tax Calculator, what the estimates are designed for, and where your own responsibility begins.',
  reviewedLabel: `Last updated ${TERMS_LAST_UPDATED}`,
  summaryNote: 'A quick summary only—the full terms below apply.',
} as const;

export const TERMS_HERO_FACTS: readonly PolicyHeroFact[] = [
  { id: 'access', label: 'Access', value: 'Free', tone: 'positive' },
  { id: 'account', label: 'Account required', value: 'No', tone: 'positive' },
  { id: 'purpose', label: 'Purpose', value: 'Tax estimates', tone: 'neutral' },
  { id: 'affiliation', label: 'FBR affiliation', value: 'Independent', tone: 'neutral' },
];

export const TERMS_TRUST_BADGES: readonly PolicyTrustBadge[] = [
  { id: 'plain', label: 'Plain-language terms', icon: FileText },
  { id: 'guidance', label: 'Estimation guidance', icon: Calculator },
  { id: 'fair', label: 'Fair-use expectations', icon: ShieldCheck },
];

export const TERMS_HIGHLIGHTS_COPY = {
  eyebrow: 'Terms at a glance',
  title: 'What matters most',
  description:
    'Use the calculators as a helpful starting point, then confirm the result for your own circumstances.',
} as const;

export const TERMS_HIGHLIGHTS: readonly PolicyHighlight[] = [
  {
    id: 'estimate',
    title: 'Estimates, not professional advice',
    description:
      'Calculations and guides provide general information and do not replace advice for your individual situation.',
    icon: AlertCircle,
  },
  {
    id: 'verify',
    title: 'Verify before you act',
    description:
      'Tax rules and personal circumstances vary, so check figures with FBR or a qualified tax professional before filing.',
    icon: BadgeCheck,
  },
  {
    id: 'fair-use',
    title: 'Use the site fairly',
    description:
      'Use the service lawfully, do not disrupt it, and do not reproduce substantial portions without permission.',
    icon: ShieldCheck,
  },
];

export const TERMS_POLICY_COPY = {
  eyebrow: 'Full terms',
  title: 'Rules for using the site',
  introduction:
    'Welcome to My Tax Calculator. By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the site.',
  navigationLabel: 'On this page',
} as const;

export const TERMS_SECTIONS: readonly PolicySectionContent[] = [
  {
    id: 'use-of-service',
    number: '01',
    title: 'Use of the service',
    paragraphs: [
      'My Tax Calculator provides a free online tool to estimate income tax in Pakistan based on FBR tax slabs, along with informational guides. You may use the service for personal, non-commercial purposes. You agree not to misuse the site, attempt to disrupt its operation, or use it for any unlawful purpose.',
    ],
    icon: Calculator,
  },
  {
    id: 'no-professional-advice',
    number: '02',
    title: 'No professional advice',
    paragraphs: [
      'The calculations and information provided are for general guidance and estimation purposes only and do not constitute professional tax, legal, or financial advice. Tax laws change frequently and individual circumstances vary. Always verify figures with the Federal Board of Revenue (FBR) and consult a qualified tax professional before making decisions or filing your return.',
    ],
    icon: AlertTriangle,
  },
  {
    id: 'accuracy-availability',
    number: '03',
    title: 'Accuracy and availability',
    paragraphs: [
      'We make reasonable efforts to keep tax slabs and content up to date, but we do not warrant that the information is complete, accurate, or current at all times. The service is provided “as is” and “as available” without warranties of any kind, and we may modify or discontinue features without notice.',
    ],
    icon: BadgeCheck,
  },
  {
    id: 'limitation-of-liability',
    number: '04',
    title: 'Limitation of liability',
    paragraphs: [
      'To the fullest extent permitted by law, My Tax Calculator and its operators shall not be liable for any loss or damage arising from your reliance on calculations or information provided by the site, including penalties, surcharges, or miscalculated tax liabilities.',
    ],
    icon: Scale,
  },
  {
    id: 'intellectual-property',
    number: '05',
    title: 'Intellectual property',
    paragraphs: [
      'The design, text, and original content of this website are the property of My Tax Calculator. You may not reproduce or redistribute substantial portions of the site without permission. Tax slab figures and statutory references are public information sourced from the FBR.',
    ],
    icon: Copyright,
  },
  {
    id: 'changes',
    number: '06',
    title: 'Changes to these terms',
    paragraphs: [
      'We may revise these Terms of Service at any time. Continued use of the site after changes are posted constitutes your acceptance of the updated terms.',
    ],
    icon: RefreshCw,
  },
];

export const TERMS_CONTACT_COPY = {
  eyebrow: 'Questions about these terms',
  title: 'Need something clarified?',
  description:
    'If any part of these terms is unclear, email us and we will help explain how it applies to the site.',
  email: CONTACT_EMAIL,
  buttonLabel: 'Email us',
  note: 'My Tax Calculator is an independent service and is not operated by FBR or the Government of Pakistan.',
} as const;
