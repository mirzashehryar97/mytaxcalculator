import type { LucideIcon } from 'lucide-react';
import { CalendarClock, ReceiptText } from 'lucide-react';

/** Which of the two vehicle calculators a page is. */
export type VehicleCalculatorMode = 'registration' | 'token';

/**
 * Tailwind needs whole class names in the source, so each mode writes its accent
 * out rather than assembling one from a colour token at runtime.
 */
interface VehicleModeAccent {
  /** Label colour of the active tab. */
  activeTab: string;
  /** Bar drawn under the active tab. */
  activeUnderline: string;
  /** Icon colour when the tab is active. */
  activeIcon: string;
  /** Circular icon holder used on the mode-switch card. */
  iconWrap: string;
  /** Link colour on the mode-switch card. */
  link: string;
}

export interface VehicleModeConfig {
  mode: VehicleCalculatorMode;
  href: string;
  /** Label on the tab strip. */
  tabLabel: string;
  /** Short label used in prose and cards. */
  shortLabel: string;
  /** What this calculator works out, for the mode-switch card. */
  summary: string;
  /** What it asks for, for the mode-switch card. */
  inputsSummary: string;
  icon: LucideIcon;
  accent: VehicleModeAccent;
}

export const VEHICLE_REGISTRATION_ROUTE = '/vehicle-tax-calculator';
export const VEHICLE_TOKEN_ROUTE = '/vehicle-token-tax-calculator';

export const VEHICLE_MODES = [
  {
    mode: 'registration',
    href: VEHICLE_REGISTRATION_ROUTE,
    tabLabel: 'Buying or transferring',
    shortLabel: 'Buying a vehicle',
    summary: 'The one-off tax the excise office collects when a vehicle is registered to you.',
    inputsSummary: 'Engine size, price paid, taxpayer-list status and, for a used car, its age.',
    icon: ReceiptText,
    accent: {
      activeTab: 'text-emerald-700',
      activeUnderline: 'bg-emerald-600',
      activeIcon: 'text-emerald-600',
      iconWrap: 'bg-emerald-50 text-emerald-600 ring-emerald-200/70',
      link: 'text-emerald-700',
    },
  },
  {
    mode: 'token',
    href: VEHICLE_TOKEN_ROUTE,
    tabLabel: 'Yearly token tax',
    shortLabel: 'Keeping it on the road',
    summary: 'What a vehicle costs to keep registered for a year, province by province.',
    inputsSummary: 'Province, engine size, invoice price and taxpayer-list status.',
    icon: CalendarClock,
    accent: {
      activeTab: 'text-teal-700',
      activeUnderline: 'bg-teal-600',
      activeIcon: 'text-teal-600',
      iconWrap: 'bg-teal-50 text-teal-600 ring-teal-200/70',
      link: 'text-teal-700',
    },
  },
] as const satisfies readonly VehicleModeConfig[];

export function getVehicleMode(mode: VehicleCalculatorMode): VehicleModeConfig {
  return VEHICLE_MODES.find((config) => config.mode === mode) ?? VEHICLE_MODES[0];
}

/** The other calculator, for the "switch to calculate" card. */
export function getOtherVehicleMode(mode: VehicleCalculatorMode): VehicleModeConfig {
  return VEHICLE_MODES.find((config) => config.mode !== mode) ?? VEHICLE_MODES[1];
}
