import { formatPlainBand, formatUsdBand } from '@/features/pta-tax/lib/formatting';
import { getPtaRates } from '@/features/pta-tax/lib/rates';
import type {
  PtaAmountBand,
  PtaFiscalYear,
  PtaInputs,
  PtaRoute,
  PtaSalesTaxBand,
  PtaTaxLine,
  PtaTaxResult,
  PtaYearRates,
} from '@/features/pta-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * The band a C&F value falls in. Where it falls in one of the levy table's
 * drafting holes — nothing covers US$ 100.50, 200.50, 350.50, 500.50 or
 * 700.50 — it drops to the band below rather than the one above, which is the
 * reading that does not charge tax the statute never imposed.
 */
export function findAmountBand(
  bands: readonly PtaAmountBand[],
  cnfUsd: number,
): { band: PtaAmountBand; usedGapFallback: boolean } | null {
  const exact = bands.find(
    (band) => cnfUsd >= band.minUsd && (band.maxUsd === null || cnfUsd <= band.maxUsd),
  );
  if (exact) {
    return { band: exact, usedGapFallback: false };
  }

  const nearest = bands.filter((band) => band.maxUsd !== null && band.maxUsd < cnfUsd).at(-1);

  return nearest ? { band: nearest, usedGapFallback: true } : null;
}

export function findSalesTaxBand(
  bands: readonly PtaSalesTaxBand[],
  cnfUsd: number,
): PtaSalesTaxBand | null {
  return (
    bands.find((band) => cnfUsd > band.minUsd && (band.maxUsd === null || cnfUsd <= band.maxUsd)) ??
    bands[0] ??
    null
  );
}

function roundRupees(value: number): number {
  return Math.round(value);
}

/** Everything the six line builders read, resolved once per route. */
interface LineContext {
  rates: PtaYearRates;
  route: PtaRoute;
  isSmartphone: boolean;
  cnfUsd: number;
  customsValuePkr: number;
}

/**
 * The Customs Tariff charges Rs 250 per set on all of heading 85.17, but the
 * Fifth Schedule overrides it for a smartphone specifically. An ordinary
 * cellular phone is not in that schedule and still pays.
 */
function buildCustomsDutyLine({ rates, isSmartphone }: LineContext): PtaTaxLine {
  return {
    id: 'customs-duty',
    label: 'Customs duty',
    amountPkr: isSmartphone ? 0 : rates.featurePhoneCustomsDutyPkr,
    exemptReason: isSmartphone ? 'Smartphones are free of customs duty' : undefined,
    basis: isSmartphone
      ? 'Smartphones are free of customs duty entirely, whatever the handset is worth.'
      : 'A flat Rs 250 per set on a basic phone. The exemption covers smartphones only.',
    reference: isSmartphone
      ? 'Fifth Schedule to the Customs Act 1969, Part-III serial 99'
      : 'Pakistan Customs Tariff, heading 8517.1419',
  };
}

/**
 * Nil on both routes, and shown rather than dropped: "we forgot ACD" and "ACD
 * is nil here" look identical in a total.
 */
function buildAdditionalCustomsDutyLine({ route }: LineContext): PtaTaxLine {
  return {
    id: 'additional-customs-duty',
    label: 'Additional customs duty',
    amountPkr: 0,
    exemptReason: 'Not levied on this import',
    basis:
      route === 'passport'
        ? 'Charged on most imports, but not on a handset arriving in personal baggage.'
        : 'Charged on most imports, but handsets are exempt. Shown so you can see it was accounted for.',
    reference:
      route === 'passport'
        ? 'SRO 1063(I)/2026 paragraph 3(iv)'
        : 'SRO 1063(I)/2026 paragraph 3(iii)',
  };
}

function buildRegulatoryDutyLine({ rates, cnfUsd }: LineContext): PtaTaxLine {
  const match = findAmountBand(rates.regulatoryDuty, cnfUsd);

  return {
    id: 'regulatory-duty',
    label: 'Regulatory duty',
    amountPkr: match?.band.amountPkr ?? 0,
    basis: match
      ? `A fixed amount set by the C&F band your handset falls in (${formatPlainBand(match.band)}). Every handset in the band pays the same.`
      : 'A fixed amount set by the C&F band your handset falls in.',
    reference: `${rates.sources.regulatoryDuty}${match ? `, ${formatUsdBand(match.band)}` : ''}`,
  };
}

/** The only percentage component, and the only place the 500-dollar cliff bites. */
function buildSalesTaxLine({ rates, cnfUsd, customsValuePkr }: LineContext): PtaTaxLine {
  const band = findSalesTaxBand(rates.salesTax, cnfUsd);

  return {
    id: 'sales-tax',
    label: 'Sales tax',
    amountPkr: band ? roundRupees((customsValuePkr * band.percent) / PERCENT) : 0,
    basis: band
      ? `${band.percent}% of the customs value — the rate for handsets ${formatPlainBand(band)}. The only charge here that is a percentage, so the only one that moves with the rupee.`
      : 'A percentage of the customs value.',
    reference: `Sales Tax Act 1990, Ninth Schedule Table-II${band ? `, ${formatUsdBand(band)}` : ''}`,
  };
}

/** The whole computable gap between the two routes — clause (60E). */
function buildIncomeTaxLine({ rates, route, cnfUsd }: LineContext): PtaTaxLine {
  const match = findAmountBand(rates.incomeTax148, cnfUsd);
  const isExempt = route === 'passport';

  return {
    id: 'income-tax-148',
    label: 'Income tax (section 148)',
    amountPkr: isExempt ? 0 : (match?.band.amountPkr ?? 0),
    exemptReason: isExempt ? 'Exempt on the passport route' : undefined,
    basis: isExempt
      ? 'Not charged on a handset in your own baggage — the only difference between the two routes.'
      : `A fixed amount for handsets ${formatPlainBand(match?.band ?? rates.incomeTax148[0])}. It counts towards your income tax for the year, so it is claimed back on your return.`,
    reference: isExempt
      ? 'Income Tax Ordinance 2001, Second Schedule Part IV clause (60E)'
      : `Income Tax Ordinance 2001, section 148, First Schedule Part II, ${formatUsdBand(match?.band ?? rates.incomeTax148[0])}`,
  };
}

function buildHandsetLevyLine({ rates, cnfUsd }: LineContext): PtaTaxLine {
  const match = findAmountBand(rates.handsetLevy, cnfUsd);

  return {
    id: 'handset-levy',
    label: 'Mobile handset levy',
    amountPkr: match?.band.amountPkr ?? 0,
    basis: match
      ? `A one-off charge on registering any handset, set by C&F band (${formatPlainBand(match.band)}).`
      : 'A one-off charge on registering any handset, set by C&F band.',
    reference: `${rates.sources.handsetLevy}${match ? `, ${formatUsdBand(match.band)}` : ''}`,
  };
}

const LINE_BUILDERS = [
  buildCustomsDutyLine,
  buildAdditionalCustomsDutyLine,
  buildRegulatoryDutyLine,
  buildSalesTaxLine,
  buildIncomeTaxLine,
  buildHandsetLevyLine,
] as const;

function sum(lines: readonly PtaTaxLine[]): number {
  return lines.reduce((total, line) => total + line.amountPkr, 0);
}

/**
 * The six federal charges behind one DIRBS PSID: the five import levies of the
 * doc's §1 table, plus advance income tax under section 148, which is exempt on
 * the passport route and is the whole computable gap between the two. PTA
 * collects none of them — it runs the registration and blocks the IMEI; FBR
 * assesses and takes the money.
 *
 * None of the six is progressive, so the shared `calcSlabTax` engine does not
 * apply: each is a banded table where the band sets one amount for the whole
 * value, and the four tables do not share thresholds.
 */
export function calcPtaTax(inputs: PtaInputs, fiscalYear: PtaFiscalYear): PtaTaxResult {
  const rates = getPtaRates(fiscalYear);
  const cnfUsd = toNonNegative(inputs.cnfUsd);
  const exchangeRate = toNonNegative(inputs.exchangeRate);
  const customsValuePkr = roundRupees(cnfUsd * exchangeRate);

  /**
   * Both figures have to be present before any of this is chargeable. Every
   * band starts at US$ 0, so a blank value otherwise lands in the cheapest one
   * and returns a confident Rs 340; and with no exchange rate the three fixed
   * rupee lines would still add up while sales tax silently came to nothing.
   * The lines are still built so callers get the same shape either way.
   */
  const isPriceable = cnfUsd > 0 && exchangeRate > 0;

  const buildLines = (route: PtaRoute): PtaTaxLine[] => {
    const context: LineContext = {
      rates,
      route,
      isSmartphone: inputs.deviceKind === 'smartphone',
      cnfUsd,
      customsValuePkr,
    };
    const built = LINE_BUILDERS.map((build) => build(context));
    return isPriceable ? built : built.map((line) => ({ ...line, amountPkr: 0 }));
  };

  const lines = buildLines(inputs.route);
  const otherRoute: PtaRoute = inputs.route === 'passport' ? 'cnic' : 'passport';

  return {
    cnfUsd,
    customsValuePkr,
    lines,
    totalPkr: sum(lines),
    otherRouteTotalPkr: sum(buildLines(otherRoute)),
    usedLevyGapFallback:
      isPriceable && (findAmountBand(rates.handsetLevy, cnfUsd)?.usedGapFallback ?? false),
    salesTaxPercent: isPriceable ? (findSalesTaxBand(rates.salesTax, cnfUsd)?.percent ?? 0) : 0,
  };
}
