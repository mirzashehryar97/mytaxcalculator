import { CALCULATOR_NAV_LINKS } from '@/components/layout/navigation';

export interface FooterLink {
  href: string;
  label: string;
}

export const FOOTER_QUICK_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/tax-guides', label: 'Tax Guides' },
  { href: '/budget-2025-26-vs-2026-27', label: 'Budget 2025-26 vs 2026-27' },
  { href: '/tax-news', label: 'Tax News' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
] as const satisfies readonly FooterLink[];

export const FOOTER_CALCULATOR_LINKS = CALCULATOR_NAV_LINKS satisfies readonly FooterLink[];

export const FOOTER_GUIDE_LINKS = [
  { href: '/tax-guides/understanding-tax-system', label: 'Income Tax Slabs & System' },
  { href: '/tax-guides/deductions-credits', label: 'Tax Deductions & Credits' },
  { href: '/tax-guides/filing-tax-return', label: 'Filing Your Tax Return' },
] as const satisfies readonly FooterLink[];

export const FOOTER_EXTERNAL_LINKS = [
  { href: 'https://www.fbr.gov.pk/', label: 'FBR Website' },
  { href: 'https://iris.fbr.gov.pk/', label: 'IRIS Portal' },
] as const satisfies readonly FooterLink[];

export const FOOTER_COPY = {
  description:
    'Free Pakistan tax and salary-planning calculators, updated with FY 2026-2027 FBR rates.',
  quickLinksTitle: 'Quick Links',
  calculatorsTitle: 'Calculators',
  guidesTitle: 'Tax Guides',
  copyrightYear: new Date().getFullYear(),
  copyrightLabel: 'My Tax Calculator. All rights reserved.',
  locationLabel: 'Designed with ❤️ in Pakistan',
} as const;
