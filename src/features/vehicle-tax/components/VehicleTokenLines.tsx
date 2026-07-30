import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { VEHICLE_TERMS, VEHICLE_TOKEN_RESULT_COPY } from '@/features/vehicle-tax/lib/content';
import { formatPercent, formatPkr } from '@/features/vehicle-tax/lib/formatting';
import type { VehicleTokenResult } from '@/features/vehicle-tax/types';

interface VehicleTokenLinesProps {
  result: VehicleTokenResult;
}

/** The provincial token lines, shown only when we have a checked schedule. */
export default function VehicleTokenLines({ result }: VehicleTokenLinesProps) {
  return (
    <div>
      <ResultCard
        label={`${VEHICLE_TOKEN_RESULT_COPY.provincialLabel}${
          result.tokenTierLabel ? ` (${result.tokenTierLabel})` : ''
        }`}
        value={formatPkr(result.tokenBeforeDiscount)}
        tone="negative"
        weight="semibold"
        labelAdornment={
          <InfoTooltip label={VEHICLE_TERMS.tokenTax.label} text={VEHICLE_TERMS.tokenTax.text} />
        }
      />
      {result.discountAmount > 0 ? (
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
      ) : null}
      <ResultCard
        label={VEHICLE_TOKEN_RESULT_COPY.netProvincialLabel}
        value={formatPkr(result.tokenTax)}
        tone="negative"
        labelAdornment={
          result.tokenFrequency === 'lifetime' ? (
            <InfoTooltip
              label={VEHICLE_TERMS.lifetimeToken.label}
              text={VEHICLE_TERMS.lifetimeToken.text}
            />
          ) : undefined
        }
      />
      <ResultCard
        label={`${VEHICLE_TOKEN_RESULT_COPY.federalLabel}${
          result.federalTierLabel ? ` (${result.federalTierLabel})` : ''
        }`}
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
