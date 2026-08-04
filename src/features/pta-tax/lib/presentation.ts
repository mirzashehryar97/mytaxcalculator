import { calcPtaTax, findAmountBand, findSalesTaxBand } from '@/features/pta-tax/lib/calculation';
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
} from '@/features/pta-tax/types';

/** What each route means, shown under the segmented control that picks it. */
export function getRouteHelp(route: PtaRoute): string {
  return route === 'passport'
    ? 'A traveller registering a handset from their own accompanied baggage, within 60 days of arriving.'
    : 'A local applicant, or a traveller past the 60 days. Section 148 applies and a fine is added.';
}

/** Label for the other route in the side-by-side comparison. */
export function getOtherRouteLabel(route: PtaRoute): string {
  return route === 'passport' ? 'CNIC' : 'Passport';
}

export function getRouteLabel(route: PtaRoute): string {
  return route === 'passport' ? 'Passport' : 'CNIC';
}

/**
 * A CNIC total omits a fine that FBR sets by assessment procedure and publishes
 * nowhere, so it is never a final figure — the suffix says so wherever the
 * amount appears.
 */
export function formatRouteTotal(total: number, route: PtaRoute): string {
  return route === 'cnic' ? `${formatPkr(total)} + fine` : formatPkr(total);
}

/** Whether the route shown carries the unpublished fine. */
export function hasUnpublishedFine(route: PtaRoute): boolean {
  return route === 'cnic';
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
 */
export function buildPtaRateGuideRows(fiscalYear: PtaFiscalYear): PtaRateGuideRow[] {
  const rates = getPtaRates(fiscalYear);

  return rates.handsetLevy.map((levyBand) => {
    const probeUsd = levyBand.maxUsd ?? levyBand.minUsd;
    const regulatoryDuty = findAmountBand(rates.regulatoryDuty, probeUsd)?.band;
    const incomeTax148 = findAmountBand(rates.incomeTax148, probeUsd)?.band;
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
    const phone = findPhone(ref.brand, ref.model, ref.variant);
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

export function getRouteFacts(route: PtaRoute): readonly string[] {
  return route === 'passport'
    ? [
        'Handset in your own accompanied baggage',
        'Registered within 60 days of arrival',
        'Income tax under section 148 is exempt',
        'No fine',
      ]
    : [
        'Local applicant, or past the 60 days',
        'Income tax under section 148 is payable',
        'A prescribed fine applies',
        'The fine amount is not published by FBR',
      ];
}
