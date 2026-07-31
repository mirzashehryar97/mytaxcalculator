import { DEFAULT_WITHHOLDING_FISCAL_YEAR } from '@/features/withholding-tax/lib/rates';
import type {
  CashWithdrawalFormState,
  CashWithdrawalInputs,
  ElectricityConnection,
  ElectricityFormState,
  ElectricityInputs,
  TelecomFormState,
  TelecomInputs,
  TelecomPayment,
  TelecomService,
} from '@/features/withholding-tax/types';

export const DEFAULT_CASH_WITHDRAWAL_FORM_STATE = {
  fiscalYear: DEFAULT_WITHHOLDING_FISCAL_YEAR,
  dailyWithdrawal: '200000',
  filer: false,
} satisfies CashWithdrawalFormState;

export const DEFAULT_ELECTRICITY_FORM_STATE = {
  fiscalYear: DEFAULT_WITHHOLDING_FISCAL_YEAR,
  billAmount: '35000',
  connection: 'domestic',
  filer: false,
} satisfies ElectricityFormState;

export const DEFAULT_TELECOM_FORM_STATE = {
  fiscalYear: DEFAULT_WITHHOLDING_FISCAL_YEAR,
  amount: '1000',
  service: 'mobile-internet',
  payment: 'top-up',
} satisfies TelecomFormState;

export function parseWithholdingNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function buildCashWithdrawalInputs(
  formState: CashWithdrawalFormState,
): CashWithdrawalInputs {
  return {
    dailyWithdrawal: parseWithholdingNumberInput(formState.dailyWithdrawal),
    filer: formState.filer,
  };
}

export function buildElectricityInputs(formState: ElectricityFormState): ElectricityInputs {
  return {
    billAmount: parseWithholdingNumberInput(formState.billAmount),
    connection: formState.connection,
    filer: formState.filer,
  };
}

export function buildTelecomInputs(formState: TelecomFormState): TelecomInputs {
  return {
    amount: parseWithholdingNumberInput(formState.amount),
    service: formState.service,
    payment: formState.payment,
  };
}

export function isAmountValid(amount: number): boolean {
  return amount > 0;
}

export function resolveElectricityConnection(value: string): ElectricityConnection {
  return value === 'commercial' || value === 'industrial' ? value : 'domestic';
}

export function resolveTelecomService(value: string): TelecomService {
  return value === 'landline' ? 'landline' : 'mobile-internet';
}

export function resolveTelecomPayment(value: string): TelecomPayment {
  return value === 'bill' ? 'bill' : 'top-up';
}
