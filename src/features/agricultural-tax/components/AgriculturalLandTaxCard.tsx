import { LandPlot } from 'lucide-react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  AGRICULTURAL_LAND_TAX_COPY,
  AGRICULTURAL_TERMS,
} from '@/features/agricultural-tax/lib/content';
import { formatAcres, formatPkrRange } from '@/features/agricultural-tax/lib/formatting';
import type { AgriculturalLandTaxResult } from '@/features/agricultural-tax/types';

interface AgriculturalLandTaxCardProps {
  land: AgriculturalLandTaxResult;
}

/** The message under the figures, which depends on how the province charges. */
function getFootnote(land: AgriculturalLandTaxResult): string {
  if (land.status === 'none') {
    return AGRICULTURAL_LAND_TAX_COPY.noneBody;
  }
  if (land.status === 'unconfirmed') {
    return AGRICULTURAL_LAND_TAX_COPY.unconfirmedBody;
  }
  if (land.status === 'not-entered') {
    return AGRICULTURAL_LAND_TAX_COPY.enterAcresBody;
  }
  if (land.status === 'exempt') {
    return AGRICULTURAL_LAND_TAX_COPY.exemptBody;
  }
  return land.isMinimumTax
    ? AGRICULTURAL_LAND_TAX_COPY.minimumTaxBody
    : AGRICULTURAL_LAND_TAX_COPY.besideBody;
}

/**
 * The per-acre tax that sits under the income tax in Punjab, KP and
 * Balochistan. It is its own card rather than a line in the breakdown because
 * it is a separate charge, is often a range, and in two provinces replaces the
 * income tax rather than adding to it.
 */
export default function AgriculturalLandTaxCard({ land }: AgriculturalLandTaxCardProps) {
  const isCharged = land.status === 'charged';
  const hasCultivated = land.cultivated.amountHigh > 0;
  const hasOrchard = land.orchard.amountHigh > 0;

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5">
      <h3 className="flex items-center gap-2 font-bold text-amber-900 text-sm uppercase tracking-wider">
        <LandPlot className="h-4 w-4 shrink-0" aria-hidden="true" />
        {AGRICULTURAL_LAND_TAX_COPY.title}
        <InfoTooltip
          label={AGRICULTURAL_TERMS.landTax.label}
          text={AGRICULTURAL_TERMS.landTax.text}
        />
      </h3>

      {isCharged ? (
        <div className="mt-1">
          {hasCultivated ? (
            <>
              <ResultCard
                label={AGRICULTURAL_LAND_TAX_COPY.landArea}
                value={formatAcres(land.cultivated.acres)}
                tone="neutral"
                weight="semibold"
              />
              <ResultCard
                label={AGRICULTURAL_LAND_TAX_COPY.perAcre}
                value={formatPkrRange(land.cultivated.perAcreLow, land.cultivated.perAcreHigh)}
                tone="neutral"
                weight="semibold"
              />
            </>
          ) : null}

          {hasOrchard ? (
            <>
              <ResultCard
                label={AGRICULTURAL_LAND_TAX_COPY.orchardArea}
                value={formatAcres(land.orchard.acres)}
                tone="neutral"
                weight="semibold"
              />
              <ResultCard
                label={AGRICULTURAL_LAND_TAX_COPY.orchardPerAcre}
                value={formatPkrRange(land.orchard.perAcreLow, land.orchard.perAcreHigh)}
                tone="neutral"
                weight="semibold"
              />
            </>
          ) : null}

          {/* Only worth splitting the total when both charges are in play. */}
          {hasCultivated && hasOrchard ? (
            <>
              <ResultCard
                label={AGRICULTURAL_LAND_TAX_COPY.cultivatedAmount}
                value={formatPkrRange(land.cultivated.amountLow, land.cultivated.amountHigh)}
                tone="negative"
                weight="semibold"
              />
              <ResultCard
                label={AGRICULTURAL_LAND_TAX_COPY.orchardAmount}
                value={formatPkrRange(land.orchard.amountLow, land.orchard.amountHigh)}
                tone="negative"
                weight="semibold"
              />
            </>
          ) : null}

          <ResultCard
            label={AGRICULTURAL_LAND_TAX_COPY.amount}
            value={formatPkrRange(land.amountLow, land.amountHigh)}
            tone="negative"
            weight="semibold"
          />
          {land.isMinimumTax ? (
            <ResultCard
              label={AGRICULTURAL_LAND_TAX_COPY.payable}
              value={formatPkrRange(land.payableLow, land.payableHigh)}
              tone="negative"
              weight="semibold"
              highlight
              last
            />
          ) : null}
        </div>
      ) : null}

      {isCharged && hasOrchard ? (
        <p className="mt-3 text-amber-950/80 text-sm leading-relaxed">
          {AGRICULTURAL_LAND_TAX_COPY.orchardBody}
        </p>
      ) : null}

      {isCharged && land.isRange ? (
        <p className="mt-3 text-amber-950/80 text-sm leading-relaxed">
          {AGRICULTURAL_LAND_TAX_COPY.rangeBody}
        </p>
      ) : null}

      <p className="mt-2 text-amber-950/80 text-sm leading-relaxed">{getFootnote(land)}</p>
    </section>
  );
}
