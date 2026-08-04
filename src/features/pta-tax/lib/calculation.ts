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
 * The band a C&F value falls in.
 *
 * Every one of these tables states its lower bound exclusively — "Up to 30",
 * then "Above 30 and up to 100" — so the bound is compared with `>`, and the
 * only inclusive floor is the zero the first band starts from. On the
 * contiguous tables that merely puts a value sitting exactly on a threshold in
 * the lower band, where the statute puts it. On the levy table, whose serials
 * read "Above 101", "Above 201" and so on, it is what makes the drafting hole
 * visible: nothing covers a value above 100 and up to 101, and three catalogue
 * handsets are valued at exactly 101.
 *
 * A value in one of those holes drops to the band below rather than the one
 * above, which is the reading that does not charge tax the statute never
 * imposed.
 */
export function findAmountBand(
  bands: readonly PtaAmountBand[],
  cnfUsd: number,
): { band: PtaAmountBand; usedGapFallback: boolean } | null {
  const exact = bands.find(
    (band) =>
      (band.minUsd === 0 ? cnfUsd >= 0 : cnfUsd > band.minUsd) &&
      (band.maxUsd === null || cnfUsd <= band.maxUsd),
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
    status: isSmartphone ? 'exempt' : 'charged',
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
 *
 * The two exemptions are not the same width. Paragraph 3(iv) covers anything
 * arriving under the Baggage Rules, so the passport route escapes whatever the
 * handset is. Paragraph 3(iii) covers imports under the Fifth Schedule, and the
 * Fifth Schedule entry is *smartphones* — a basic phone is assessed on the
 * tariff's own Rs 250/set, which is a specific duty and not one of the slabs
 * the notification sets ACD against. Nothing published says which rate attaches
 * there, so that one case says so rather than claiming an exemption it has not
 * got. See §9 of the calculator doc.
 */
function buildAdditionalCustomsDutyLine({ rates, route, isSmartphone }: LineContext): PtaTaxLine {
  const sro = rates.sources.additionalCustomsDuty;

  if (route === 'passport') {
    return {
      id: 'additional-customs-duty',
      label: 'Additional customs duty',
      amountPkr: 0,
      status: 'exempt',
      basis: 'Charged on most imports, but not on a handset arriving in personal baggage.',
      reference: `${sro} paragraph 3(iv)`,
    };
  }

  if (!isSmartphone) {
    return {
      id: 'additional-customs-duty',
      label: 'Additional customs duty',
      amountPkr: 0,
      status: 'unknown',
      basis:
        'The exemption that zeroes this line covers smartphones. For a basic phone registered on a CNIC, no published notification says whether anything is due — so nothing is added here and the total below is a floor.',
      reference: `${sro} paragraph 3(iii), which reaches smartphones only`,
    };
  }

  return {
    id: 'additional-customs-duty',
    label: 'Additional customs duty',
    amountPkr: 0,
    status: 'exempt',
    basis:
      'Charged on most imports, but smartphones are exempt. Shown so you can see it was accounted for.',
    reference: `${sro} paragraph 3(iii)`,
  };
}

function buildRegulatoryDutyLine({ rates, cnfUsd }: LineContext): PtaTaxLine {
  const match = findAmountBand(rates.regulatoryDuty, cnfUsd);

  return {
    id: 'regulatory-duty',
    label: 'Regulatory duty',
    amountPkr: match?.band.amountPkr ?? 0,
    status: 'charged',
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
    status: 'charged',
    basis: band
      ? `${band.percent}% of the customs value — the rate for handsets ${formatPlainBand(band)}. The only charge here that is a percentage, so the only one that moves with the rupee.`
      : 'A percentage of the customs value.',
    reference: `Sales Tax Act 1990, Ninth Schedule Table-II${band ? `, ${formatUsdBand(band)}` : ''}`,
  };
}

/**
 * The whole computable gap between the two routes — clause (60E). Device type
 * moves it only at the bottom of the table, where serial 1 excludes smartphones
 * and serial 2 sweeps them in; see `PtaIncomeTax148Bands`.
 *
 * The basis stops at what §148 is — an advance collection — and does not
 * promise it comes back. Whether a traveller with no import business can adjust
 * it against a return is not settled by anything read for this page.
 */
function buildIncomeTaxLine({ rates, route, isSmartphone, cnfUsd }: LineContext): PtaTaxLine {
  const bands = isSmartphone ? rates.incomeTax148.smartphone : rates.incomeTax148.featurePhone;
  const band = findAmountBand(bands, cnfUsd)?.band ?? bands[0];
  const isExempt = route === 'passport';

  return {
    id: 'income-tax-148',
    label: 'Income tax (section 148)',
    amountPkr: isExempt ? 0 : (band?.amountPkr ?? 0),
    status: isExempt ? 'exempt' : 'charged',
    basis: isExempt
      ? 'Not charged on a handset in your own baggage — the only difference between the two routes.'
      : `A fixed amount for handsets ${band ? formatPlainBand(band) : 'in your value band'}. It is collected in advance of the tax year rather than as a charge on the phone itself.`,
    reference: isExempt
      ? 'Income Tax Ordinance 2001, Second Schedule Part IV clause (60E)'
      : `Income Tax Ordinance 2001, section 148, First Schedule Part II${band ? `, ${formatUsdBand(band)}` : ''}`,
  };
}

function buildHandsetLevyLine({ rates, cnfUsd }: LineContext): PtaTaxLine {
  const match = findAmountBand(rates.handsetLevy, cnfUsd);

  return {
    id: 'handset-levy',
    label: 'Mobile handset levy',
    amountPkr: match?.band.amountPkr ?? 0,
    status: 'charged',
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

function hasUnknownCharge(lines: readonly PtaTaxLine[]): boolean {
  return lines.some((line) => line.status === 'unknown');
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
  const otherRouteLines = buildLines(otherRoute);

  return {
    cnfUsd,
    customsValuePkr,
    lines,
    totalPkr: sum(lines),
    hasUnknownCharge: hasUnknownCharge(lines),
    otherRouteTotalPkr: sum(otherRouteLines),
    otherRouteHasUnknownCharge: hasUnknownCharge(otherRouteLines),
    usedLevyGapFallback:
      isPriceable && (findAmountBand(rates.handsetLevy, cnfUsd)?.usedGapFallback ?? false),
    salesTaxPercent: isPriceable ? (findSalesTaxBand(rates.salesTax, cnfUsd)?.percent ?? 0) : 0,
  };
}
