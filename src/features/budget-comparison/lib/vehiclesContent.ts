import {
  BadgeDollarSign,
  Calculator,
  CalendarDays,
  CarFront,
  Gauge,
  Landmark,
  Percent,
  ShieldCheck,
  TableProperties,
  Tag,
} from 'lucide-react';

import { BUDGET_SOURCES } from '@/features/budget-comparison/lib/content';
import type {
  BudgetComparisonRow,
  BudgetDetailMetric,
  BudgetExampleResult,
  BudgetFaqItem,
  BudgetHeroContent,
  BudgetSource,
  BudgetTocItem,
  BudgetTool,
} from '@/features/budget-comparison/types';

export const VEHICLES_ROUTE = '/budget-2025-26-vs-2026-27/vehicles';

export const VEHICLES_HERO = {
  badge: 'Enacted · Finance Act 2026',
  title: 'Vehicles — Budget 2025–26 vs 2026–27',
  description:
    'Verified EV concessions, imported-vehicle excise duties, ICT motor-vehicle tax and Section 231B treatment in Pakistan.',
  meta: [
    {
      id: 'updated',
      label: 'Updated 28 July 2026',
      icon: CalendarDays,
      dateTime: '2026-07-28',
    },
    { id: 'reviewed', label: 'Reviewed against Finance Act 2026', icon: ShieldCheck },
  ],
  statusTitle: 'Enacted 26 June 2026',
  statusDetail: 'Effective 1 July 2026',
} as const satisfies BudgetHeroContent;

export const VEHICLES_TOC = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'comparison', label: 'Vehicle changes', href: '#comparison' },
  { id: 'example', label: 'Imported-EV example', href: '#example' },
  { id: 'levy-note', label: 'Separate levies', href: '#levy-note' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'explore-sectors', label: 'Explore sectors', href: '#explore-sectors' },
  { id: 'official-sources', label: 'Official sources', href: '#official-sources' },
] as const satisfies readonly BudgetTocItem[];

export const VEHICLES_TOOLS = [
  {
    id: 'ev-example',
    label: 'Imported-EV example',
    href: '#example',
    icon: CarFront,
  },
  {
    id: 'vehicle-rates',
    label: 'Vehicle rate table',
    href: '#comparison',
    icon: TableProperties,
  },
  {
    id: 'budget-comparison',
    label: 'Budget comparison',
    href: '/budget-2025-26-vs-2026-27',
    icon: Calculator,
  },
] as const satisfies readonly BudgetTool[];

export const VEHICLES_METRICS = [
  {
    id: 'ev-fed-bands',
    value: '0% / 30% / 40%',
    label: 'basic FED on imported CBU EVs by customs value',
    icon: CarFront,
  },
  {
    id: 'special-fed-mid',
    value: '86%',
    label: 'additional special duty on imported 2000–3000cc vehicles',
    icon: Gauge,
  },
  {
    id: 'special-fed-high',
    value: '92%',
    label: 'additional special duty on imported vehicles above 3000cc',
    icon: BadgeDollarSign,
  },
  {
    id: 'ict-lifetime',
    value: 'PKR 20,000',
    label: 'ICT lifetime motor tax up to 1000cc',
    icon: Landmark,
  },
] as const satisfies readonly BudgetDetailMetric[];

export const VEHICLES_COMPARISON = [
  {
    id: 'local-ev-sales-tax',
    measure: 'Eligible locally made EVs — sales tax',
    previous: '1% through 30 June 2026',
    current: '1% through 30 June 2027',
    impact: 'Extended',
    tone: 'positive',
  },
  {
    id: 'ev-ckd-sales-tax',
    measure: 'Eligible EV CKD kits — sales tax',
    previous: 'Exempt through 30 June 2026',
    current: 'Exempt through 30 June 2027',
    impact: 'Extended',
    tone: 'positive',
  },
  {
    id: 'imported-cbu-ev-fed',
    measure: 'Imported CBU electric cars and SUVs — basic FED',
    previous: 'No standalone customs-value schedule',
    current: '0% ≤ USD 75k; 30% > USD 75k–110k; 40% > USD 110k',
    impact: 'New bands',
    tone: 'info',
  },
  {
    id: 'special-duty-2000-3000',
    measure: 'Imported vehicles 2000–3000cc — Special Excise Duty',
    previous: 'No Special Excise Duty',
    current: '86% ad valorem, in addition to ordinary FED',
    impact: 'New levy',
    tone: 'negative',
  },
  {
    id: 'special-duty-above-3000',
    measure: 'Imported vehicles above 3000cc — Special Excise Duty',
    previous: 'No Special Excise Duty',
    current: '92% ad valorem, in addition to ordinary FED',
    impact: 'New levy',
    tone: 'negative',
  },
  {
    id: 'ict-up-to-1000',
    measure: 'ICT motor-vehicle tax — up to 1000cc',
    previous: 'PKR 10,000 lifetime',
    current: 'PKR 20,000 lifetime',
    impact: 'Higher',
    tone: 'negative',
  },
  {
    id: 'ict-1001-2000',
    measure: 'ICT motor-vehicle tax — 1001–2000cc',
    previous: 'PKR 1,500 / 4,000 / 5,000 per year by cc band',
    current: '0.25% of invoice value per year',
    impact: 'Value-based',
    tone: 'info',
  },
  {
    id: 'ict-above-2000',
    measure: 'ICT motor-vehicle tax — above 2000cc',
    previous: 'PKR 8,000 / 12,000 per year by cc band',
    current: '0.35% of invoice value per year',
    impact: 'Value-based',
    tone: 'info',
  },
  {
    id: 'section-231b',
    measure: 'Section 231B registration and transfer advance tax',
    previous: 'Existing registration and transfer rate tables',
    current: 'Same rate tables; only a housekeeping edit to subsection (6)',
    impact: 'No rate change',
    tone: 'neutral',
  },
] as const satisfies readonly BudgetComparisonRow[];

export const VEHICLES_COMPARISON_NOTE =
  'The 86% and 92% figures are Special Excise Duty under new section 3(3B), expressly charged in addition to ordinary FED. They are not total all-in vehicle tax rates.';

export const VEHICLES_EXAMPLE = {
  title: 'Example: imported CBU EV valued at USD 90,000',
  results: [
    {
      id: 'band',
      label: 'Applicable value band',
      value: '> USD 75k to USD 110k',
      icon: Tag,
    },
    {
      id: 'rate',
      label: 'Basic FED rate',
      value: '30%',
      icon: Percent,
    },
    {
      id: 'duty',
      label: 'Basic FED',
      value: 'USD 27,000 equivalent',
      icon: Calculator,
    },
  ] as const satisfies readonly BudgetExampleResult[],
  note: 'The value band is determined using the customs value under Section 25 of the Customs Act. Rupee liability depends on the customs assessment and applicable exchange rate.',
} as const;

export const VEHICLES_LEVY_NOTE = {
  title: 'Vehicle taxes and duties are separate charges',
  description:
    'Ordinary FED, the new Special Excise Duty, sales tax, customs duties, Section 231B advance tax and ICT or provincial motor-vehicle tax can apply under different rules. Do not treat one displayed percentage as the final all-in tax cost.',
} as const;

export const VEHICLES_SOURCES = [
  ...BUDGET_SOURCES.filter((source) => source.id === 'finance-act'),
  {
    id: 'federal-excise-act',
    title: 'Federal Excise Act 2005 — FBR',
    description: 'Official excise-law library',
    href: 'https://www.fbr.gov.pk/categ/federal-excise-act/302',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
  {
    id: 'sales-tax-act',
    title: 'Sales Tax Act 1990 — FBR',
    description: 'Official sales-tax law library',
    href: 'https://www.fbr.gov.pk/categ/sales-tax-act/301',
    logo: { src: '/images/tax-guides/fbr-logo.png', alt: 'Federal Board of Revenue Pakistan' },
  },
] as const satisfies readonly BudgetSource[];

export const VEHICLES_FAQS = [
  {
    question: 'What is the new tax on imported electric vehicles?',
    answer:
      'Imported CBU electric cars and SUVs now fall under a basic FED schedule based on customs value: 0% up to USD 75,000, 30% above USD 75,000 to USD 110,000, and 40% above USD 110,000. FY 2025–26 had no standalone customs-value schedule.',
  },
  {
    question: 'What is the Special Excise Duty on imported vehicles?',
    answer:
      'New Special Excise Duty under section 3(3B) charges 86% ad valorem on imported vehicles of 2000–3000cc and 92% above 3000cc. It is charged in addition to ordinary FED and is not a total all-in vehicle tax rate.',
  },
  {
    question: 'Are local electric-vehicle concessions still available?',
    answer:
      'Yes, and they run a year longer. Sales tax on eligible locally made EVs stays at 1% and eligible EV CKD kits stay exempt, both extended from 30 June 2026 to 30 June 2027.',
  },
  {
    question: 'How much is Islamabad motor-vehicle tax in FY 2026–27?',
    answer:
      'Vehicles up to 1000cc pay PKR 20,000 lifetime, up from PKR 10,000. Vehicles of 1001–2000cc move to 0.25% of invoice value per year and vehicles above 2000cc to 0.35% per year, replacing the previous fixed per-cc-band amounts.',
  },
  {
    question: 'Did Section 231B registration and transfer tax change?',
    answer:
      'No. The registration and transfer advance-tax rate tables are unchanged. Finance Act 2026 made only a housekeeping edit to subsection (6).',
  },
  {
    question: 'What FED applies to an imported EV worth USD 90,000?',
    answer:
      'It falls in the band above USD 75,000 to USD 110,000, so basic FED is 30%, or roughly USD 27,000 equivalent. The band is set by the customs value under Section 25 of the Customs Act, and the rupee liability depends on the customs assessment and exchange rate.',
  },
] as const satisfies readonly BudgetFaqItem[];

export const VEHICLES_PAGE_LABELS = {
  overviewTitle: 'Vehicle budget changes overview',
  comparisonTitle: 'What changed for vehicles?',
  sourcesTitle: 'Official sources',
  sourceStatusTitle: 'Official sources only',
  sourceStatusDetail: 'Last checked 28 July 2026',
} as const;

export const VEHICLES_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan Budget 2026–27 · Enacted',
  title: 'Vehicle Tax Budget Comparison',
  subtitle: 'EV FED bands · Imported-vehicle special duty · ICT motor tax',
  features: 'FY 2025–26 vs FY 2026–27 · Official FBR sources',
  brand: 'My Tax Calculator',
} as const;
