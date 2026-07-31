import type { LucideIcon } from 'lucide-react';
import { Banknote, Smartphone, Zap } from 'lucide-react';

import type { WithholdingMode } from '@/features/withholding-tax/types';

/**
 * Tailwind needs whole class names in the source, so each mode writes its accent
 * out rather than assembling one from a colour token at runtime.
 */
interface WithholdingModeAccent {
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

export interface WithholdingModeConfig {
  mode: WithholdingMode;
  href: string;
  /** Label on the tab strip. */
  tabLabel: string;
  /** Short label used in prose and cards. */
  shortLabel: string;
  /** What this calculator works out. */
  summary: string;
  /** What it asks for. */
  inputsSummary: string;
  /** The part of the law it comes from, for readers who want to look it up. */
  sectionLabel: string;
  icon: LucideIcon;
  accent: WithholdingModeAccent;
}

export const CASH_WITHDRAWAL_ROUTE = '/cash-withdrawal-tax-calculator';
export const ELECTRICITY_ROUTE = '/electricity-bill-tax-calculator';
export const PHONE_INTERNET_ROUTE = '/mobile-internet-tax-calculator';

export const WITHHOLDING_MODES = [
  {
    mode: 'cash-withdrawal',
    href: CASH_WITHDRAWAL_ROUTE,
    tabLabel: 'Bank cash',
    shortLabel: 'Taking out cash',
    summary: 'What a bank keeps back when a non-filer takes cash out.',
    inputsSummary: 'The day’s total cash and whether you are a filer.',
    sectionLabel: 'Section 231AB',
    icon: Banknote,
    accent: {
      activeTab: 'text-emerald-700',
      activeUnderline: 'bg-emerald-600',
      icon: 'text-emerald-600',
      iconWrap: 'bg-emerald-50 text-emerald-600 ring-emerald-200/70',
      link: 'text-emerald-700',
    },
  },
  {
    mode: 'electricity',
    href: ELECTRICITY_ROUTE,
    tabLabel: 'Electricity bill',
    shortLabel: 'Your electricity bill',
    summary: 'The income tax added to an electricity bill, for homes and for businesses.',
    inputsSummary: 'Your monthly bill, the type of meter and your filer status.',
    sectionLabel: 'Section 235',
    icon: Zap,
    accent: {
      activeTab: 'text-amber-700',
      activeUnderline: 'bg-amber-500',
      icon: 'text-amber-500',
      iconWrap: 'bg-amber-50 text-amber-600 ring-amber-200/70',
      link: 'text-amber-700',
    },
  },
  {
    mode: 'phone-internet',
    href: PHONE_INTERNET_ROUTE,
    tabLabel: 'Phone & internet',
    shortLabel: 'Phone and internet',
    summary: 'The tax inside a mobile load, an internet bill or a landline bill.',
    inputsSummary: 'The amount, and whether it is a bill or a prepaid load.',
    sectionLabel: 'Section 236',
    icon: Smartphone,
    accent: {
      activeTab: 'text-blue-700',
      activeUnderline: 'bg-blue-600',
      icon: 'text-blue-600',
      iconWrap: 'bg-blue-50 text-blue-600 ring-blue-200/70',
      link: 'text-blue-700',
    },
  },
] as const satisfies readonly WithholdingModeConfig[];

export function getWithholdingMode(mode: WithholdingMode): WithholdingModeConfig {
  return WITHHOLDING_MODES.find((config) => config.mode === mode) ?? WITHHOLDING_MODES[0];
}

/** The other two calculators, for the "switch to calculate" cards. */
export function getOtherWithholdingModes(mode: WithholdingMode): readonly WithholdingModeConfig[] {
  return WITHHOLDING_MODES.filter((config) => config.mode !== mode);
}
