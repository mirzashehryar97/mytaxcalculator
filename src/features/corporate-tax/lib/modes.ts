import type { LucideIcon } from 'lucide-react';
import { Building2, Receipt, TrendingUp } from 'lucide-react';

import type { CorporateMode } from '@/features/corporate-tax/types';

/**
 * Tailwind needs whole class names in the source, so each mode's accent is
 * written out rather than assembled from a colour token at runtime.
 */
interface CorporateModeAccent {
  /** Label colour of the active tab. */
  activeTab: string;
  /** Bar drawn under the active tab. */
  activeUnderline: string;
  /** Tab icon colour — each mode keeps its colour whether or not its tab is active. */
  icon: string;
  /** Circular icon holder used on the mode-switch cards. */
  iconWrap: string;
  /** Link colour on the mode-switch cards. */
  link: string;
}

export interface CorporateModeConfig {
  mode: CorporateMode;
  href: string;
  /** Label on the tab strip, e.g. "Minimum tax — 113". */
  tabLabel: string;
  /** Two-word label used in prose and cards. */
  shortLabel: string;
  /** What the mode asks for, shown on the mode-switch cards. */
  inputsSummary: string;
  icon: LucideIcon;
  accent: CorporateModeAccent;
}

export const CORPORATE_TAX_ROUTE = '/corporate-tax-calculator';
export const MINIMUM_TURNOVER_TAX_ROUTE = '/minimum-turnover-tax-calculator';
export const SUPER_TAX_ROUTE = '/super-tax-calculator';

export const CORPORATE_MODES = [
  {
    mode: 'company-tax',
    href: CORPORATE_TAX_ROUTE,
    tabLabel: 'Company tax',
    shortLabel: 'Company tax',
    inputsSummary: 'Yearly profit, the kind of company, and any tax already paid.',
    icon: Building2,
    accent: {
      activeTab: 'text-emerald-700',
      activeUnderline: 'bg-emerald-600',
      icon: 'text-emerald-600',
      iconWrap: 'bg-emerald-50 text-emerald-600 ring-emerald-200/70',
      link: 'text-emerald-700',
    },
  },
  {
    mode: 'minimum-tax',
    href: MINIMUM_TURNOVER_TAX_ROUTE,
    tabLabel: 'Minimum tax — 113',
    shortLabel: 'Minimum tax',
    inputsSummary: 'Yearly sales, what the business sells, and the normal tax figure.',
    icon: Receipt,
    accent: {
      activeTab: 'text-violet-700',
      activeUnderline: 'bg-violet-600',
      icon: 'text-violet-600',
      iconWrap: 'bg-violet-50 text-violet-600 ring-violet-200/70',
      link: 'text-violet-700',
    },
  },
  {
    mode: 'super-tax',
    href: SUPER_TAX_ROUTE,
    tabLabel: 'Super tax — 4C',
    shortLabel: 'Super tax',
    inputsSummary: 'Income counted for super tax and the kind of business.',
    icon: TrendingUp,
    accent: {
      activeTab: 'text-amber-700',
      activeUnderline: 'bg-amber-600',
      icon: 'text-amber-600',
      iconWrap: 'bg-amber-50 text-amber-600 ring-amber-200/70',
      link: 'text-amber-700',
    },
  },
] as const satisfies readonly CorporateModeConfig[];

export function getCorporateMode(mode: CorporateMode): CorporateModeConfig {
  return CORPORATE_MODES.find((config) => config.mode === mode) ?? CORPORATE_MODES[0];
}

/** The other two modes, for the "switch to calculate" cards. */
export function getOtherCorporateModes(mode: CorporateMode): readonly CorporateModeConfig[] {
  return CORPORATE_MODES.filter((config) => config.mode !== mode);
}
