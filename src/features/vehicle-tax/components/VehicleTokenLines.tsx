import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { VEHICLE_TERMS, VEHICLE_TOKEN_RESULT_COPY } from '@/features/vehicle-tax/lib/content';
import { formatPercent, formatPkr } from '@/features/vehicle-tax/lib/formatting';
import { getFederalLabel } from '@/features/vehicle-tax/lib/presentation';
import type { VehicleTokenResult } from '@/features/vehicle-tax/types';

interface VehicleTokenLinesProps {
  result: VehicleTokenResult;
}

/** The provincial token lines, shown only when we have a checked schedule. */
export default function VehicleTokenLines({ result }: VehicleTokenLinesProps) {
  // Without a discount the subtotal would just restate the line above it, so the
  // provincial charge is the amount to pay and stands on its own.
  const showDiscount = result.discountAmount > 0;
  const isLifetime = result.tokenFrequency === 'lifetime';

  return (
    <div>
      <ResultCard
        label={`${VEHICLE_TOKEN_RESULT_COPY.provincialLabel}${
          result.tokenTierLabel ? ` (${result.tokenTierLabel})` : ''
        }`}
        value={formatPkr(result.tokenBeforeDiscount)}
        tone="negative"
        weight={showDiscount ? 'semibold' : 'bold'}
        labelAdornment={
          isLifetime ? (
            <InfoTooltip
              label={VEHICLE_TERMS.lifetimeToken.label}
              text={VEHICLE_TERMS.lifetimeToken.text}
            />
          ) : (
            <InfoTooltip label={VEHICLE_TERMS.tokenTax.label} text={VEHICLE_TERMS.tokenTax.text} />
          )
        }
      />
      {showDiscount ? (
        <>
          <ResultCard
            label={`${VEHICLE_TOKEN_RESULT_COPY.discountLabel} (${formatPercent(
              result.earlyPaymentDiscount,
            )})`}
            value={`− ${formatPkr(result.discountAmount)}`}
            tone="positive"
            weight="semibold"
            labelAdornment={
              <InfoTooltip
                label={VEHICLE_TERMS.earlyPayment.label}
                text={VEHICLE_TERMS.earlyPayment.text}
              />
            }
          />
          <ResultCard
            label={VEHICLE_TOKEN_RESULT_COPY.netProvincialLabel}
            value={formatPkr(result.tokenTax)}
            tone="negative"
          />
        </>
      ) : null}
      <ResultCard
        label={getFederalLabel(result)}
        value={formatPkr(result.federalTax)}
        tone="negative"
        last
        labelAdornment={
          <InfoTooltip
            label={VEHICLE_TERMS.federalYearlyTax.label}
            text={VEHICLE_TERMS.federalYearlyTax.text}
          />
        }
      />
    </div>
  );
}
