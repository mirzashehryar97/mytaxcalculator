export const BUDGET_PATH = '/budget-2025-26-vs-2026-27';
export const NEW_NAV_BADGE_LABEL = 'New';
export const NEW_CALCULATOR_MOBILE_NOTICE = 'Business tax calculator now available';

export const STANDARD_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/tax-guides', label: 'Tax Guides' },
] as const;

export const RELATED_CALCULATORS_COPY = {
  title: 'More Pakistan tax calculators',
  description:
    'Pick the calculator that matches how you earn — every one uses the latest FBR rates.',
} as const;

export const CALCULATOR_NAV_LINKS = [
  {
    href: '/',
    label: 'Salary Tax Calculator',
    description: 'Salary tax and take-home pay',
    isNew: false,
  },
  {
    href: '/freelancer-tax-calculator',
    label: 'Freelancer Tax Calculator',
    description: 'IT export tax under Section 154A',
    isNew: true,
  },
  {
    href: '/business-tax-calculator',
    label: 'Business Tax Calculator',
    description: 'Business, self-employed & AOP tax',
    isNew: true,
  },
] as const;

export function getNavLinkClass(active: boolean, mobile: boolean): string {
  const base = mobile
    ? 'block rounded-xl px-4 py-3 font-semibold text-base transition-colors'
    : 'rounded-full px-2 py-2 font-semibold text-xs transition-all duration-200 lg:text-sm xl:px-3';

  if (active) {
    return `${base} text-emerald-700 underline decoration-2 decoration-emerald-600 underline-offset-8`;
  }
  if (mobile) {
    return `${base} text-gray-600 hover:bg-emerald-50 hover:text-emerald-800`;
  }
  return `${base} text-gray-600 hover:bg-emerald-50 hover:text-emerald-700`;
}

export function getCalculatorTriggerClass(active: boolean, mobile: boolean): string {
  const base = mobile
    ? 'flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-base transition-colors'
    : 'inline-flex items-center gap-1 rounded-full px-2 py-2 font-semibold text-xs transition-all duration-200 lg:text-sm xl:px-3';

  if (active) {
    return `${base} animate-calculator-pulse text-emerald-700 hover:bg-emerald-50`;
  }
  return mobile
    ? `${base} animate-calculator-pulse bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 ring-1 ring-emerald-300/80 hover:from-emerald-100 hover:to-teal-100`
    : `${base} animate-calculator-pulse bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 ring-1 ring-emerald-300/80 hover:from-emerald-100 hover:to-teal-100 hover:ring-emerald-400`;
}
