import type { LucideIcon } from 'lucide-react';
import {
  Banknote,
  Briefcase,
  Building,
  Building2,
  CalendarClock,
  Car,
  Coins,
  Handshake,
  Home,
  KeyRound,
  Laptop,
  Layers,
  LineChart,
  PieChart,
  Scale,
  Smartphone,
  Sprout,
  Target,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';

export const BUDGET_PATH = '/budget-2025-26-vs-2026-27';
export const NEW_NAV_BADGE_LABEL = 'New';
export const NEW_CALCULATOR_MOBILE_NOTICE = 'New salary-planning calculators now available';

export const STANDARD_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/tax-guides', label: 'Tax Guides' },
] as const;

export const RELATED_CALCULATORS_COPY = {
  eyebrow: 'Trusted. Accurate. Updated.',
  title: 'More Pakistan tax calculators',
  description:
    'Pick the calculator for your income or salary decision — each one uses current FBR rates.',
} as const;

/** Section a calculator is filed under in the "More Pakistan tax calculators" panel. */
export type CalculatorCategory =
  | 'salary'
  | 'business'
  | 'corporate'
  | 'property'
  | 'vehicle'
  | 'investments'
  | 'withholding';

/** Header shown above each group of rows. Also fixes the order the groups render in. */
export const CALCULATOR_CATEGORY_LABELS: Record<CalculatorCategory, string> = {
  salary: 'Salary & income',
  business: 'Business & self-employed',
  corporate: 'Company & corporate',
  property: 'Property',
  vehicle: 'Vehicle',
  investments: 'Investments',
  withholding: 'Everyday withholding',
};

export interface CalculatorNavLink {
  href: string;
  label: string;
  description: string;
  /** Row icon shown in the "More Pakistan tax calculators" panel. */
  icon: LucideIcon;
  category: CalculatorCategory;
}

export interface CalculatorNavGroup {
  category: CalculatorCategory;
  label: string;
  links: CalculatorNavLink[];
}

export const CALCULATOR_NAV_LINKS: readonly CalculatorNavLink[] = [
  {
    href: '/',
    label: 'Salary Tax Calculator',
    description: 'Salary tax and take-home pay',
    icon: Wallet,
    category: 'salary',
  },
  {
    href: '/salary-increment-calculator',
    label: 'Salary Increment Calculator',
    description: 'See how much of your raise you keep',
    icon: TrendingUp,
    category: 'salary',
  },
  {
    href: '/rental-income-tax-calculator',
    label: 'Rental Income Tax Calculator',
    description: 'Tax on rent under Section 155',
    icon: Home,
    category: 'property',
  },
  {
    href: '/property-purchase-tax-calculator',
    label: 'Property Purchase Tax Calculator',
    description: 'Buyer advance tax under Section 236K',
    icon: KeyRound,
    category: 'property',
  },
  {
    href: '/vehicle-token-tax-calculator',
    label: 'Vehicle Token Tax Calculator',
    description: 'Yearly token tax, province by province',
    icon: CalendarClock,
    category: 'vehicle',
  },
  {
    href: '/freelancer-tax-calculator',
    label: 'Freelancer Tax Calculator',
    description: 'IT export tax under Section 154A',
    icon: Laptop,
    category: 'business',
  },
  {
    href: '/business-tax-calculator',
    label: 'Business Tax Calculator',
    description: 'Business, self-employed & AOP tax',
    icon: Building2,
    category: 'business',
  },
  {
    href: '/property-sale-tax-calculator',
    label: 'Property Sale Tax Calculator',
    description: 'Seller advance tax under Section 236C',
    icon: Handshake,
    category: 'property',
  },
  {
    href: '/property-capital-gains-tax-calculator',
    label: 'Property Capital Gains Tax',
    description: 'Tax on the profit from a property sale',
    icon: LineChart,
    category: 'property',
  },
  {
    href: '/vehicle-tax-calculator',
    label: 'Vehicle Tax Calculator',
    description: 'Registration & transfer tax under Section 231B',
    icon: Car,
    category: 'vehicle',
  },
  {
    href: '/agricultural-income-tax-calculator',
    label: 'Agricultural Income Tax Calculator',
    description: 'Provincial tax on farm income',
    icon: Sprout,
    category: 'business',
  },
  {
    href: '/capital-gains-tax-calculator',
    label: 'Capital Gains Tax Calculator',
    description: 'Tax on profit from selling shares',
    icon: Coins,
    category: 'investments',
  },
  {
    href: '/mutual-fund-tax-calculator',
    label: 'Mutual Fund Tax Calculator',
    description: 'Tax when you cash in fund units',
    icon: PieChart,
    category: 'investments',
  },
  {
    href: '/cash-withdrawal-tax-calculator',
    label: 'Cash Withdrawal Tax Calculator',
    description: 'Bank deduction on cash under Section 231AB',
    icon: Banknote,
    category: 'withholding',
  },
  {
    href: '/electricity-bill-tax-calculator',
    label: 'Electricity Bill Tax Calculator',
    description: 'Income tax on your bill under Section 235',
    icon: Zap,
    category: 'withholding',
  },
  {
    href: '/mobile-internet-tax-calculator',
    label: 'Mobile & Internet Tax Calculator',
    description: 'Tax on loads and phone bills under Section 236',
    icon: Smartphone,
    category: 'withholding',
  },
  {
    href: '/job-offer-comparison-calculator',
    label: 'Job Offer Comparison',
    description: 'Compare two roles by take-home pay',
    icon: Briefcase,
    category: 'salary',
  },
  {
    href: '/reverse-salary-calculator',
    label: 'Reverse Salary Calculator',
    description: 'Gross salary from your target take-home',
    icon: Target,
    category: 'salary',
  },
  {
    href: '/corporate-tax-calculator',
    label: 'Corporate Tax Calculator',
    description: 'Company income tax on yearly profit',
    icon: Building,
    category: 'corporate',
  },
  {
    href: '/minimum-turnover-tax-calculator',
    label: 'Minimum Turnover Tax Calculator',
    description: 'The Section 113 tax floor on sales',
    icon: Scale,
    category: 'corporate',
  },
  {
    href: '/super-tax-calculator',
    label: 'Super Tax Calculator',
    description: 'Section 4C extra tax on high income',
    icon: Layers,
    category: 'corporate',
  },
];

/**
 * Buckets the calculator links into the ordered category groups rendered by
 * `RelatedCalculators`. Categories with no links left (the current page is filtered out
 * before grouping) are dropped so an empty header never renders.
 */
export function groupCalculatorLinks(links: readonly CalculatorNavLink[]): CalculatorNavGroup[] {
  const categories = Object.keys(CALCULATOR_CATEGORY_LABELS) as CalculatorCategory[];

  return categories
    .map((category) => ({
      category,
      label: CALCULATOR_CATEGORY_LABELS[category],
      links: links.filter((link) => link.category === category),
    }))
    .filter((group) => group.links.length > 0);
}

export function formatCalculatorCount(count: number): string {
  return count === 1 ? '1 calculator' : `${count} calculators`;
}

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
