import type { LucideIcon } from 'lucide-react';
import { TrendingUp, UserRoundCheck, UserRoundMinus } from 'lucide-react';

import type { PropertyMode } from '@/features/property-tax/types';

/**
 * Tailwind needs whole class names in the source, so each mode's accent is
 * written out rather than assembled from a colour token at runtime.
 */
interface PropertyModeAccent {
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

export interface PropertyModeConfig {
  mode: PropertyMode;
  href: string;
  /** Label on the tab strip, e.g. "Buy — 236K". */
  tabLabel: string;
  /** Two-word label used in prose and cards. */
  shortLabel: string;
  /** What the mode asks for, shown on the mode-switch cards. */
  inputsSummary: string;
  icon: LucideIcon;
  accent: PropertyModeAccent;
}

export const PROPERTY_PURCHASE_ROUTE = '/property-purchase-tax-calculator';
export const PROPERTY_SALE_ROUTE = '/property-sale-tax-calculator';
export const PROPERTY_CAPITAL_GAINS_ROUTE = '/property-capital-gains-tax-calculator';

export const PROPERTY_MODES = [
  {
    mode: 'purchase',
    href: PROPERTY_PURCHASE_ROUTE,
    tabLabel: 'Buy — 236K',
    shortLabel: 'Buying',
    inputsSummary: 'Declared price, FBR / DC value and the buyer’s filer status.',
    icon: UserRoundCheck,
    accent: {
      activeTab: 'text-emerald-700',
      activeUnderline: 'bg-emerald-600',
      icon: 'text-emerald-600',
      iconWrap: 'bg-emerald-50 text-emerald-600 ring-emerald-200/70',
      link: 'text-emerald-700',
    },
  },
  {
    mode: 'sale',
    href: PROPERTY_SALE_ROUTE,
    tabLabel: 'Sell — 236C',
    shortLabel: 'Selling',
    inputsSummary: 'Declared price, FBR / DC value and the seller’s filer status.',
    icon: UserRoundMinus,
    accent: {
      activeTab: 'text-violet-700',
      activeUnderline: 'bg-violet-600',
      icon: 'text-violet-600',
      iconWrap: 'bg-violet-50 text-violet-600 ring-violet-200/70',
      link: 'text-violet-700',
    },
  },
  {
    mode: 'capital-gains',
    href: PROPERTY_CAPITAL_GAINS_ROUTE,
    tabLabel: 'Capital Gains — CGT',
    shortLabel: 'Capital gains',
    inputsSummary: 'Purchase and sale prices, both dates, property type and filer status.',
    icon: TrendingUp,
    accent: {
      activeTab: 'text-amber-700',
      activeUnderline: 'bg-amber-600',
      icon: 'text-amber-600',
      iconWrap: 'bg-amber-50 text-amber-600 ring-amber-200/70',
      link: 'text-amber-700',
    },
  },
] as const satisfies readonly PropertyModeConfig[];

export function getPropertyMode(mode: PropertyMode): PropertyModeConfig {
  return PROPERTY_MODES.find((config) => config.mode === mode) ?? PROPERTY_MODES[0];
}

/** The other two modes, for the "switch mode to calculate" cards. */
export function getOtherPropertyModes(mode: PropertyMode): readonly PropertyModeConfig[] {
  return PROPERTY_MODES.filter((config) => config.mode !== mode);
}
