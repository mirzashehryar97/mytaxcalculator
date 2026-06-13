export type BudgetImpact =
  | 'relief'
  | 'unchanged'
  | 'increase'
  | 'new'
  | 'abolished'
  | 'restructured';

export interface BudgetMeasureRow {
  measure: string;
  fy2025_26: string;
  fy2026_27: string;
  impact: BudgetImpact;
  impactLabel: string;
}

export interface BudgetSector {
  id: string;
  title: string;
  summary: string;
  rows: BudgetMeasureRow[];
  notes?: string[];
}

export const BUDGET_OVERVIEW_ROWS: BudgetMeasureRow[] = [
  {
    measure: 'Total federal budget outlay',
    fy2025_26: 'Rs. 18.42 trillion (FY 2025-26 budget)',
    fy2026_27: 'Rs. 18.77 trillion (proposed)',
    impact: 'increase',
    impactLabel: '+1.9% outlay',
  },
  {
    measure: 'FBR revenue target',
    fy2025_26: 'Rs. 12,983 billion',
    fy2026_27: 'Rs. 15,264 billion (+17.6%)',
    impact: 'increase',
    impactLabel: 'Higher collection target',
  },
  {
    measure: 'Fiscal deficit target',
    fy2025_26: '~4.2% of GDP (outgoing year)',
    fy2026_27: '3.6% of GDP (proposed)',
    impact: 'relief',
    impactLabel: 'Tighter consolidation',
  },
  {
    measure: 'GDP growth target',
    fy2025_26: '3.7% (achieved, per FM speech)',
    fy2026_27: '4.0% (proposed)',
    impact: 'increase',
    impactLabel: 'Higher growth aim',
  },
  {
    measure: 'Inflation projection',
    fy2025_26: '~5.5% (outgoing)',
    fy2026_27: '8.2% average (projected)',
    impact: 'increase',
    impactLabel: 'Higher inflation forecast',
  },
  {
    measure: 'Debt servicing',
    fy2025_26: 'Largest expenditure head (outgoing)',
    fy2026_27: 'Rs. 8,054 billion allocated',
    impact: 'unchanged',
    impactLabel: 'Still dominant outlay',
  },
];

export const BUDGET_SECTORS: BudgetSector[] = [
  {
    id: 'salaried',
    title: 'Salaried individuals & employees',
    summary:
      'The headline relief package targets salaried workers: restructured income tax slabs from six to eight bands, lower marginal rates between Rs. 2.2M and Rs. 7M annually, and abolition of the 9% surcharge above Rs. 10M. Federal civil servants also receive a 7% salary increase and 7% pension hike.',
    rows: [
      {
        measure: 'Income tax slabs (salaried)',
        fy2025_26: '6 progressive slabs under Finance Act 2025',
        fy2026_27: '8 slabs with new 25%, 29% and 32% bands (proposed)',
        impact: 'restructured',
        impactLabel: 'Restructured',
      },
      {
        measure: 'Tax-free annual threshold',
        fy2025_26: 'Rs. 600,000',
        fy2026_27: 'Rs. 600,000',
        impact: 'unchanged',
        impactLabel: 'No change',
      },
      {
        measure: 'PKR 2.2M–3.2M marginal rate',
        fy2025_26: '23%',
        fy2026_27: '20%',
        impact: 'relief',
        impactLabel: '−3 pp',
      },
      {
        measure: 'PKR 3.2M–4.1M marginal rate',
        fy2025_26: '30%',
        fy2026_27: '25%',
        impact: 'relief',
        impactLabel: '−5 pp',
      },
      {
        measure: '35% top rate threshold',
        fy2025_26: 'Above Rs. 4.1 million',
        fy2026_27: 'Above Rs. 7 million',
        impact: 'relief',
        impactLabel: 'Threshold raised',
      },
      {
        measure: 'Surcharge on income tax',
        fy2025_26: '9% when annual income exceeds Rs. 10M',
        fy2026_27: 'Proposed abolished for salaried class',
        impact: 'abolished',
        impactLabel: 'Abolished',
      },
      {
        measure: 'Federal government salaries',
        fy2025_26: 'Existing pay scales',
        fy2026_27: '7% ad-hoc increase proposed',
        impact: 'relief',
        impactLabel: '+7% salaries',
      },
      {
        measure: 'Federal pensions',
        fy2025_26: 'Existing pension rates',
        fy2026_27: '7% increase proposed',
        impact: 'relief',
        impactLabel: '+7% pensions',
      },
      {
        measure: 'Minimum monthly wage',
        fy2025_26: 'Previous minimum wage level',
        fy2026_27: '10% increase proposed',
        impact: 'relief',
        impactLabel: '+10% minimum wage',
      },
    ],
    notes: [
      'Employees earning up to roughly Rs. 183,000/month see no income tax change — only the lower three slabs are unchanged.',
      'Use our salary tax calculator to model your exact take-home under both fiscal years.',
    ],
  },
  {
    id: 'freelancers-it',
    title: 'Freelancers, IT sector & digital exports',
    summary:
      'PSEB-registered IT exporters and freelancers retain the concessional 0.25% Final Tax Regime (FTR) for three more years. International card payments face sharply lower withholding tax. New levies target social media earnings and foreign digital services.',
    rows: [
      {
        measure: 'PSEB IT export FTR (Section 154A)',
        fy2025_26: '0.25% final tax; due to expire 30 June 2026',
        fy2026_27: '0.25% extended to 30 June 2029 (proposed)',
        impact: 'relief',
        impactLabel: 'Extended 3 years',
      },
      {
        measure: 'Combined export tax on proceeds',
        fy2025_26: '2% (1% WHT + 1% advance tax)',
        fy2026_27: '1.25% (proposed)',
        impact: 'relief',
        impactLabel: 'Reduced',
      },
      {
        measure: 'International credit/debit card WHT',
        fy2025_26: '5% on overseas transactions (filers)',
        fy2026_27: '0.5% (proposed)',
        impact: 'relief',
        impactLabel: '5% → 0.5%',
      },
      {
        measure: 'Non-PSEB freelance / business income',
        fy2025_26: 'Non-salaried progressive slabs (15%–45%) + 10% surcharge above Rs. 10M',
        fy2026_27:
          'Same slab structure; salaried surcharge abolition does not apply to business income',
        impact: 'unchanged',
        impactLabel: 'Slabs unchanged',
      },
      {
        measure: 'Social media / influencer earnings',
        fy2025_26: 'Taxed under general income rules',
        fy2026_27: '5% withholding tax proposed on platform payments',
        impact: 'new',
        impactLabel: 'New 5% WHT',
      },
      {
        measure: 'Foreign digital services vendors',
        fy2025_26: 'Digital Presence Proceeds Tax (5% on certain foreign vendors)',
        fy2026_27: '5% digital services tax on significant digital presence (proposed)',
        impact: 'new',
        impactLabel: 'New digital levy',
      },
      {
        measure: 'EV manufacturing plant & machinery',
        fy2025_26: 'Concessional duties under EV policy',
        fy2026_27: '0% customs duty on one-time plant imports for new EV projects (proposed)',
        impact: 'relief',
        impactLabel: 'New incentive',
      },
    ],
    notes: [
      'Freelancers remitting through Pakistani banks with PSEB registration benefit most from the extended 0.25% FTR.',
      'Without PSEB registration, foreign receipts fall under non-salaried slabs — significantly higher above Rs. 2.2M annually.',
    ],
  },
  {
    id: 'business-corporate',
    title: 'Business, companies & AOPs',
    summary:
      'Corporate super tax is abolished for firms earning up to Rs. 500 million and cut for larger companies (except banks, E&P and fertiliser). Small retailers get a simplified 1% turnover tax replacing the Tajir Dost scheme.',
    rows: [
      {
        measure: 'Super tax (Section 4C) up to Rs. 500M',
        fy2025_26: 'Progressive 1%–7.5% on Rs. 150M–500M income',
        fy2026_27: 'Abolished for income up to Rs. 500M (proposed)',
        impact: 'abolished',
        impactLabel: 'Abolished',
      },
      {
        measure: 'Super tax above Rs. 500M',
        fy2025_26: '10% of income',
        fy2026_27: '8% (proposed); banks, E&P & fertiliser exempt from cut',
        impact: 'relief',
        impactLabel: '10% → 8%',
      },
      {
        measure: 'Small retailer fixed tax',
        fy2025_26: 'Tajir Dost Scheme (location-based advance tax)',
        fy2026_27: '1% of annual turnover up to Rs. 200M; min Rs. 25,000/year (proposed)',
        impact: 'restructured',
        impactLabel: 'New fixed-tax scheme',
      },
      {
        measure: 'Retailer scheme benefits',
        fy2025_26: 'POS integration and audits under Tajir Dost',
        fy2026_27: 'Simplified return, POS exemption, limited audits (proposed)',
        impact: 'relief',
        impactLabel: 'Easier compliance',
      },
      {
        measure: 'Distributor / wholesaler minimum tax',
        fy2025_26: '0.25% of turnover',
        fy2026_27: '0.5% (proposed)',
        impact: 'increase',
        impactLabel: 'Doubled',
      },
      {
        measure: 'Company income tax (general)',
        fy2025_26: '29% standard corporate rate',
        fy2026_27: '29% (unchanged)',
        impact: 'unchanged',
        impactLabel: 'No change',
      },
      {
        measure: 'Small company rate',
        fy2025_26: '20% (qualifying companies)',
        fy2026_27: '20% (unchanged)',
        impact: 'unchanged',
        impactLabel: 'No change',
      },
      {
        measure: 'AOP / sole proprietor surcharge',
        fy2025_26: '10% surcharge on tax when income exceeds Rs. 10M',
        fy2026_27:
          'Status under Finance Bill 2026 unclear for non-salaried; salaried surcharge abolished',
        impact: 'unchanged',
        impactLabel: 'Verify for AOPs',
      },
    ],
  },
  {
    id: 'property',
    title: 'Property & real estate',
    summary:
      'Major relief for the property sector: Section 7E deemed income tax abolished, Capital Value Tax on foreign assets removed, and flat lower withholding taxes on property transfers for filers.',
    rows: [
      {
        measure: 'Section 7E deemed income tax',
        fy2025_26: '1% of fair market value on non-earning property (contested in courts)',
        fy2026_27: 'Completely abolished (proposed)',
        impact: 'abolished',
        impactLabel: 'Abolished',
      },
      {
        measure: 'Capital Value Tax (foreign assets)',
        fy2025_26: 'CVT on declared foreign movable/immovable assets',
        fy2026_27: 'Abolished (proposed)',
        impact: 'abolished',
        impactLabel: 'Abolished',
      },
      {
        measure: 'Advance tax on property sale (filers, S. 236C)',
        fy2025_26: '4.5%–5.5% sliding scale by value',
        fy2026_27: 'Flat 2.75% (proposed)',
        impact: 'relief',
        impactLabel: 'Roughly halved',
      },
      {
        measure: 'Advance tax on property purchase (filers, S. 236K)',
        fy2025_26: '1.5%–2.5% sliding scale',
        fy2026_27: 'Flat 1.25% (proposed)',
        impact: 'relief',
        impactLabel: 'Reduced',
      },
      {
        measure: 'Combined filer transaction cost',
        fy2025_26: 'Up to ~8% combined buyer + seller WHT',
        fy2026_27: '~4% combined (2.75% + 1.25%) (proposed)',
        impact: 'relief',
        impactLabel: '~50% lower',
      },
      {
        measure: 'Inherited property cost basis',
        fy2025_26: 'Historical acquisition cost of deceased',
        fy2026_27: 'Stepped-up basis at FMV on date of death (proposed)',
        impact: 'relief',
        impactLabel: 'CGT relief',
      },
      {
        measure: 'Non-filer property WHT',
        fy2025_26: 'Higher penal rates for late/non-filers',
        fy2026_27: 'Sale WHT 2.75%; Category A penal multipliers proposed abolished',
        impact: 'relief',
        impactLabel: 'Simplified',
      },
    ],
  },
  {
    id: 'vehicles',
    title: 'Cars, vehicles & automobiles',
    summary:
      'Locally assembled EVs and hybrids keep concessional sales tax. Imported luxury EVs face new tiered FED. Islamabad token taxes rise and shift to invoice-value basis for larger engines. New FED on imported petrol vehicles 2000cc–3000cc.',
    rows: [
      {
        measure: 'Locally manufactured EV sales tax',
        fy2025_26: '1% (Eighth Schedule)',
        fy2026_27: '1% extended to 30 June 2027',
        impact: 'unchanged',
        impactLabel: 'Extended',
      },
      {
        measure: 'Locally manufactured HEV (up to 1800cc)',
        fy2025_26: '8.5% sales tax',
        fy2026_27: '8.5% extended to 30 June 2027',
        impact: 'unchanged',
        impactLabel: 'Extended',
      },
      {
        measure: 'EV CKD component customs duty',
        fy2025_26: '1% on EV-specific parts',
        fy2026_27: '1% extended to 30 June 2027',
        impact: 'unchanged',
        impactLabel: 'Extended',
      },
      {
        measure: 'Imported CBU electric vehicles',
        fy2025_26: '25% customs concession below $50,000; limited FED structure',
        fy2026_27: 'Tiered FED: 0% up to Rs. 20M; 30% for Rs. 20–30M; 40% above Rs. 30M',
        impact: 'restructured',
        impactLabel: 'Luxury EVs taxed more',
      },
      {
        measure: 'Imported petrol vehicles (2000cc–3000cc)',
        fy2025_26: 'Existing customs + FED structure',
        fy2026_27: 'New FED proposed on imported 2000cc–3000cc vehicles',
        impact: 'new',
        impactLabel: 'New FED',
      },
      {
        measure: 'Imported vehicles above 2000cc',
        fy2025_26: 'Up to ~40% FED on luxury imports',
        fy2026_27: '40%–41% FED; luxury EVs also covered',
        impact: 'increase',
        impactLabel: 'Higher luxury tax',
      },
      {
        measure: 'ICT token tax (up to 1000cc)',
        fy2025_26: 'Previous flat token rates',
        fy2026_27: 'Rs. 20,000 annual token tax (proposed)',
        impact: 'increase',
        impactLabel: 'Increased',
      },
      {
        measure: 'ICT token tax (above 1000cc)',
        fy2025_26: 'Engine-capacity based flat rates',
        fy2026_27: 'Based on invoice / import value (proposed)',
        impact: 'restructured',
        impactLabel: 'Value-based',
      },
    ],
  },
  {
    id: 'solar',
    title: 'Solar panels & renewable energy',
    summary:
      'Despite IMF pressure to raise GST to 18%, the government maintained solar tax stability. No fresh taxes on panels were introduced — a relief for households and businesses switching to renewable power.',
    rows: [
      {
        measure: 'Sales tax on imported solar panels',
        fy2025_26: '10% GST (after reduction from proposed 18%)',
        fy2026_27: 'No increase; existing structure maintained (proposed)',
        impact: 'unchanged',
        impactLabel: 'Stability',
      },
      {
        measure: 'Proposed 18% GST on solar',
        fy2025_26: 'Debated under IMF programme',
        fy2026_27: 'Rejected; not included in Finance Bill 2026',
        impact: 'relief',
        impactLabel: 'Hike avoided',
      },
      {
        measure: 'Solar panels & photovoltaic cells',
        fy2025_26: 'Listed among major tax-exempt / concessional items',
        fy2026_27: 'Continue as tax-exempt / stable treatment (proposed)',
        impact: 'unchanged',
        impactLabel: 'No fresh tax',
      },
      {
        measure: 'FBR official position',
        fy2025_26: '10% GST on imports in place',
        fy2026_27: 'FBR confirms no new solar panel taxes in Budget 2026-27',
        impact: 'unchanged',
        impactLabel: 'Confirmed',
      },
    ],
    notes: [
      'Industry stakeholders had feared an 18% GST — the budget maintains affordability for solar adoption.',
    ],
  },
  {
    id: 'defence',
    title: 'Defence, military & national security',
    summary:
      'Defence allocation rises 17.65% to Rs. 3 trillion amid regional security pressures. Military pensions are budgeted separately at Rs. 822 billion. Procurement and physical assets see the largest jump (+39.6%).',
    rows: [
      {
        measure: 'Defence services allocation',
        fy2025_26: 'Rs. 2.558 trillion (budgeted)',
        fy2026_27: 'Rs. 3.000 trillion (proposed, +17.65%)',
        impact: 'increase',
        impactLabel: '+Rs. 442B',
      },
      {
        measure: 'Share of federal budget',
        fy2025_26: '~14% of federal outlay',
        fy2026_27: '~16% of Rs. 18.77T outlay',
        impact: 'increase',
        impactLabel: 'Larger share',
      },
      {
        measure: 'Defence as % of GDP',
        fy2025_26: 'Slightly below 2%',
        fy2026_27: '~2.08% of projected GDP',
        impact: 'increase',
        impactLabel: 'Above 2% again',
      },
      {
        measure: 'Salaries & allowances (serving personnel)',
        fy2025_26: 'Rs. 846 billion',
        fy2026_27: 'Rs. 968 billion (+14.36%) (proposed)',
        impact: 'increase',
        impactLabel: '+Rs. 122B',
      },
      {
        measure: 'Physical assets / procurement',
        fy2025_26: 'Rs. 663 billion',
        fy2026_27: 'Rs. 926 billion (+39.6%) (proposed)',
        impact: 'increase',
        impactLabel: 'Largest hike',
      },
      {
        measure: 'Operating expenses',
        fy2025_26: 'Rs. 635 billion (approx.)',
        fy2026_27: 'Rs. 743 billion (proposed)',
        impact: 'increase',
        impactLabel: 'Increased',
      },
      {
        measure: 'Civil works',
        fy2025_26: 'Rs. 261 billion (approx.)',
        fy2026_27: 'Rs. 363 billion (proposed)',
        impact: 'increase',
        impactLabel: 'Increased',
      },
      {
        measure: 'Military pensions (separate head)',
        fy2025_26: 'Rs. 742 billion',
        fy2026_27: 'Rs. 822 billion (+10.8%) (proposed)',
        impact: 'increase',
        impactLabel: 'Not in defence total',
      },
      {
        measure: 'Civil pensions (separate head)',
        fy2025_26: 'Part of Rs. 1,169T total pensions',
        fy2026_27: 'Rs. 272 billion civil pensions (proposed)',
        impact: 'increase',
        impactLabel: 'Separate allocation',
      },
    ],
    notes: [
      'Military pensions are excluded from the Rs. 3 trillion defence services figure — total security-related spending is higher.',
      'FM cited Operation Bunyan-un-Marsoos and regional tensions as context for the increase.',
    ],
  },
  {
    id: 'retail-consumer',
    title: 'Retail, consumers & other measures',
    summary:
      'Additional budget measures cover consumer goods, sin taxes, travel, exports and customs duty reforms affecting everyday prices and business costs.',
    rows: [
      {
        measure: "Women's sanitary products & contraceptives",
        fy2025_26: 'Subject to sales tax / duties',
        fy2026_27: 'Tax abolished (proposed)',
        impact: 'abolished',
        impactLabel: 'Tax removed',
      },
      {
        measure: 'E-cigarette / vape e-liquid FED',
        fy2025_26: 'Rs. 10,000 per kg',
        fy2026_27: 'Rs. 16,500 per kg (proposed)',
        impact: 'increase',
        impactLabel: '+65%',
      },
      {
        measure: 'Business-class international air travel FED',
        fy2025_26: 'FED applicable',
        fy2026_27: 'Abolished (proposed)',
        impact: 'abolished',
        impactLabel: 'Abolished',
      },
      {
        measure: 'Export tax on proceeds',
        fy2025_26: '2%',
        fy2026_27: '1.25% (proposed)',
        impact: 'relief',
        impactLabel: 'Reduced',
      },
      {
        measure: 'Industrial raw materials customs duty',
        fy2025_26: 'Various rates on 100+ categories',
        fy2026_27: 'Eliminated on 100+ industrial raw material categories (proposed)',
        impact: 'relief',
        impactLabel: 'Duty-free inputs',
      },
      {
        measure: 'White spirit / mineral turpentine',
        fy2025_26: 'No specific FED',
        fy2026_27: 'Rs. 80/litre FED (proposed, anti-adulteration)',
        impact: 'new',
        impactLabel: 'New FED',
      },
      {
        measure: 'Petroleum relief (FY 2025-26)',
        fy2025_26: 'Rs. 128 billion absorbed by government (per FM)',
        fy2026_27: 'Not a permanent tax change; one-off relief referenced',
        impact: 'unchanged',
        impactLabel: 'Separate measure',
      },
    ],
  },
];

export const BUDGET_SECTOR_NAV = BUDGET_SECTORS.map((sector) => ({
  id: sector.id,
  title: sector.title,
}));

export function impactBadgeClass(impact: BudgetImpact): string {
  switch (impact) {
    case 'relief':
    case 'abolished':
      return 'bg-emerald-100 text-emerald-800';
    case 'unchanged':
      return 'bg-gray-100 text-gray-700';
    case 'increase':
      return 'bg-red-100 text-red-800';
    case 'new':
      return 'bg-amber-100 text-amber-900';
    case 'restructured':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
