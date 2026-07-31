import type { LucideIcon } from 'lucide-react';
import { LineChart, PieChart } from 'lucide-react';

import type { CapitalGainsMode } from '@/features/capital-gains-tax/types';

/**
 * Tailwind needs whole class names in the source, so each mode writes its accent
 * out rather than assembling one from a colour token at runtime.
 */
interface CapitalGainsModeAccent {
  /** Label colour of the active tab. */
  activeTab: string;
  /** Bar drawn under the active tab. */
  activeUnderline: string;
  /** Tab icon colour — each mode keeps its colour whether or not it is active. */
  icon: string;
  /** Rounded icon holder used on the cards. */
  iconWrap: string;
  /** Link colour on the cards. */
  link: string;
}

export interface CapitalGainsModeConfig {
  mode: CapitalGainsMode;
  href: string;
  /** Label on the tab strip. */
  tabLabel: string;
  /** Short label used in prose and cards. */
  shortLabel: string;
  /** What this calculator works out. */
  summary: string;
  /** What it asks for. */
  inputsSummary: string;
  /** Who works the tax out and hands it to the FBR. */
  collectorLabel: string;
  icon: LucideIcon;
  accent: CapitalGainsModeAccent;
}

export const LISTED_SECURITIES_ROUTE = '/capital-gains-tax-calculator';
export const MUTUAL_FUND_ROUTE = '/mutual-fund-tax-calculator';

export const CAPITAL_GAINS_MODES = [
  {
    mode: 'listed-securities',
    href: LISTED_SECURITIES_ROUTE,
    tabLabel: 'Shares',
    shortLabel: 'Shares on the stock exchange',
    summary: 'Tax on the profit when you sell shares listed on the Pakistan Stock Exchange.',
    inputsSummary: 'What you paid, what you sold for, and the two dates.',
    collectorLabel: 'NCCPL',
    icon: LineChart,
    accent: {
      activeTab: 'text-emerald-700',
      activeUnderline: 'bg-emerald-600',
      icon: 'text-emerald-600',
      iconWrap: 'bg-emerald-50 text-emerald-600 ring-emerald-200/70',
      link: 'text-emerald-700',
    },
  },
  {
    mode: 'mutual-funds',
    href: MUTUAL_FUND_ROUTE,
    tabLabel: 'Mutual funds',
    shortLabel: 'Mutual fund units',
    summary: 'Tax on the profit when you cash in units of a mutual fund.',
    inputsSummary: 'What the units cost, what you got back, and the type of fund.',
    collectorLabel: 'Your fund company',
    icon: PieChart,
    accent: {
      activeTab: 'text-violet-700',
      activeUnderline: 'bg-violet-600',
      icon: 'text-violet-600',
      iconWrap: 'bg-violet-50 text-violet-600 ring-violet-200/70',
      link: 'text-violet-700',
    },
  },
] as const satisfies readonly CapitalGainsModeConfig[];

export function getCapitalGainsMode(mode: CapitalGainsMode): CapitalGainsModeConfig {
  return CAPITAL_GAINS_MODES.find((config) => config.mode === mode) ?? CAPITAL_GAINS_MODES[0];
}

/** The other calculator, for the "switch to calculate" cards. */
export function getOtherCapitalGainsModes(
  mode: CapitalGainsMode,
): readonly CapitalGainsModeConfig[] {
  return CAPITAL_GAINS_MODES.filter((config) => config.mode !== mode);
}
