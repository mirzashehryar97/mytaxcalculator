import { calcPtaTax, findAmountBand, findSalesTaxBand } from '@/features/pta-tax/lib/calculation';
import { PTA_RESULT_COPY } from '@/features/pta-tax/lib/content';
import {
  formatPhoneName,
  formatPkr,
  formatUsd,
  formatUsdBand,
} from '@/features/pta-tax/lib/formatting';
import { findPhone } from '@/features/pta-tax/lib/phoneLookup';
import {
  DEFAULT_PTA_FISCAL_YEAR,
  getPtaRates,
  PTA_DEFAULT_EXCHANGE_RATE,
} from '@/features/pta-tax/lib/rates';
import type {
  PtaFiscalYear,
  PtaPopularPhoneRef,
  PtaPopularPhoneRow,
  PtaRateGuideRow,
  PtaRoute,
  PtaTaxLine,
} from '@/features/pta-tax/types';

/** What each route means, shown under the segmented control that picks it. */
export function getRouteHelp(route: PtaRoute): string {
  return route === 'passport'
    ? 'For a phone you carried in with your own luggage and are registering within 60 days of landing.'
    : 'For a phone bought here, or one you brought in but did not register in time. Income tax is charged too, and a fine is added.';
}

/** Identifies the opening figure as a default and directs the visitor to their assessment. */
export function getExchangeRateHelp(): string {
  return `Default: Rs ${PTA_DEFAULT_EXCHANGE_RATE}/US$. Use the rate on your assessment.`;
}

/** Explains that model filtering follows the customs test, not the handset shape. */
export function getDeviceKindHelp(): string {
  return 'Phones are sorted by what they can do, not by whether they have a keypad. A few KaiOS, Sea Shark and X Tell models are hard to place, so if your assessment puts yours in the other type, go with that.';
}

/** Label for the other route in the side-by-side comparison. */
export function getOtherRouteLabel(route: PtaRoute): string {
  return route === 'passport' ? 'CNIC' : 'Passport';
}

export function getRouteLabel(route: PtaRoute): string {
  return route === 'passport' ? 'Passport' : 'CNIC';
}

export function getRouteTotalCaption(route: PtaRoute, hasUnknownCharge = false): string {
  if (route === 'passport') {
    return PTA_RESULT_COPY.passportCaption;
  }
  return hasUnknownCharge ? PTA_RESULT_COPY.cnicUnknownCaption : PTA_RESULT_COPY.cnicCaption;
}

/**
 * A CNIC total omits a fine that FBR sets by assessment procedure and publishes
 * nowhere. A basic-phone CNIC result can also omit unquantified additional
 * customs duty, so that case is explicitly labelled as a minimum.
 */
export function formatRouteTotal(total: number, route: PtaRoute, hasUnknownCharge = false): string {
  if (route !== 'cnic') {
    return formatPkr(total);
  }
  return hasUnknownCharge ? `${formatPkr(total)} minimum + fine` : `${formatPkr(total)} + fine`;
}

/** Whether the route shown carries the unpublished fine. */
export function hasUnpublishedFine(route: PtaRoute): boolean {
  return route === 'cnic';
}

export interface PtaTaxLineDisplay {
  value: string;
  tone: 'negative' | 'positive' | 'warning';
  textClassName: string;
}

/** Keep an unquantified charge visually and verbally distinct from an exemption. */
export function getPtaTaxLineDisplay(line: PtaTaxLine): PtaTaxLineDisplay {
  if (line.status === 'unknown') {
    return {
      value: PTA_RESULT_COPY.unknownCharge,
      tone: 'warning',
      textClassName: 'text-amber-600',
    };
  }
  if (line.status === 'exempt') {
    return {
      value: PTA_RESULT_COPY.nothingToPay,
      tone: 'positive',
      textClassName: 'text-emerald-600',
    };
  }
  return {
    value: formatPkr(line.amountPkr),
    tone: 'negative',
    textClassName: 'text-red-600',
  };
}

/**
 * The printed rate table is built from the same `PTA_RATES` the calculator
 * charges from, so the two cannot drift apart — a rate guide that disagrees
 * with the engine behind it is a published claim that is simply wrong.
 *
 * Rows follow the handset levy's bands because it has the finest split: the
 * levy separates US$ 501–700 from above 700 where regulatory duty and section
 * 148 both stop at 500. Looking the coarser tables up at the top of each levy
 * band therefore reproduces them exactly rather than merging them away.
 *
 * The section 148 column is the smartphone table. The only row where the two
 * differ is the lowest, where a basic phone pays Rs 70 against a smartphone's
 * Rs 100, and `incomeTaxNote` says so under the table.
 */
export function buildPtaRateGuideRows(fiscalYear: PtaFiscalYear): PtaRateGuideRow[] {
  const rates = getPtaRates(fiscalYear);

  return rates.handsetLevy.map((levyBand) => {
    const probeUsd = levyBand.maxUsd ?? levyBand.minUsd;
    const regulatoryDuty = findAmountBand(rates.regulatoryDuty, probeUsd)?.band;
    const incomeTax148 = findAmountBand(rates.incomeTax148.smartphone, probeUsd)?.band;
    const salesTax = findSalesTaxBand(rates.salesTax, probeUsd);

    return {
      id: `${fiscalYear}-${levyBand.minUsd}`,
      band: formatUsdBand(levyBand),
      regulatoryDuty: regulatoryDuty ? formatPkr(regulatoryDuty.amountPkr) : '—',
      salesTax: salesTax ? `${salesTax.percent}%` : '—',
      incomeTax148: incomeTax148 ? formatPkr(incomeTax148.amountPkr) : '—',
      handsetLevy: formatPkr(levyBand.amountPkr),
    };
  });
}

/** The documents a printed year's figures were read from, as one line. */
export function getRateGuideSourceLine(fiscalYear: PtaFiscalYear): string {
  const { sources } = getPtaRates(fiscalYear);
  return `${sources.regulatoryDuty} · ${sources.incomeTax148} · ${sources.handsetLevy}`;
}

/**
 * Worked examples for handsets people actually search for, priced by
 * `calcPtaTax` itself rather than typed in, so the table cannot quote a figure
 * the calculator above would contradict. Sales tax is a percentage, so every
 * total here holds only at the exchange rate the page opens with — the section
 * around the table says so.
 */
export function buildPopularPhoneRows(phones: readonly PtaPopularPhoneRef[]): PtaPopularPhoneRow[] {
  const rows: PtaPopularPhoneRow[] = [];

  for (const ref of phones) {
    const phone = findPhone('smartphone', ref.brand, ref.model, ref.variant);
    if (!phone) {
      continue;
    }

    const inputs = {
      deviceKind: 'smartphone' as const,
      cnfUsd: phone.cnfUsd,
      exchangeRate: PTA_DEFAULT_EXCHANGE_RATE,
    };
    const passport = calcPtaTax({ ...inputs, route: 'passport' }, DEFAULT_PTA_FISCAL_YEAR);
    const cnic = calcPtaTax({ ...inputs, route: 'cnic' }, DEFAULT_PTA_FISCAL_YEAR);

    rows.push({
      id: `${ref.brand}-${ref.model}-${ref.variant}`,
      name: `${ref.brand} ${formatPhoneName(ref.model, ref.variant)}`,
      cnfUsd: formatUsd(phone.cnfUsd),
      salesTaxPercent: `${passport.salesTaxPercent}%`,
      passportTotal: formatPkr(passport.totalPkr),
      cnicTotal: `${formatPkr(cnic.totalPkr)} + fine`,
    });
  }

  return rows;
}

export function getRouteFacts(route: PtaRoute, hasUnknownCharge = false): readonly string[] {
  return route === 'passport'
    ? [
        'Phone came in with your own luggage',
        'Registered within 60 days of arrival',
        'Income tax under section 148 is exempt',
        'No fine',
      ]
    : [
        'Bought here, or past the 60 days',
        'Income tax under section 148 is payable',
        ...(hasUnknownCharge ? ['Extra customs duty on basic phones is not included'] : []),
        'A fine applies',
        'The fine amount is not published by FBR',
      ];
}
