import {
  CASH_WITHDRAWAL_ROUTE,
  ELECTRICITY_ROUTE,
  PHONE_INTERNET_ROUTE,
} from '@/features/withholding-tax/lib/modes';
import type {
  CashWithdrawalFormState,
  ElectricityFormState,
  TelecomFormState,
} from '@/features/withholding-tax/types';

export const WITHHOLDING_ANALYTICS_EVENTS = {
  cashWithdrawalPageView: 'cash_withdrawal_calculator_view',
  cashWithdrawalUse: 'cash_withdrawal_calculator_use',
  electricityPageView: 'electricity_bill_calculator_view',
  electricityUse: 'electricity_bill_calculator_use',
  phoneInternetPageView: 'phone_internet_calculator_view',
  phoneInternetUse: 'phone_internet_calculator_use',
} as const;

export const CASH_WITHDRAWAL_ANALYTICS_CONTEXT = {
  calculator: 'cash-withdrawal',
  page_path: CASH_WITHDRAWAL_ROUTE,
} as const;

export const ELECTRICITY_ANALYTICS_CONTEXT = {
  calculator: 'electricity-bill',
  page_path: ELECTRICITY_ROUTE,
} as const;

export const PHONE_INTERNET_ANALYTICS_CONTEXT = {
  calculator: 'phone-internet',
  page_path: PHONE_INTERNET_ROUTE,
} as const;

export function buildCashWithdrawalUseParameters(formState: CashWithdrawalFormState) {
  return {
    ...CASH_WITHDRAWAL_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
    filer: formState.filer,
  } as const;
}

export function buildElectricityUseParameters(formState: ElectricityFormState) {
  return {
    ...ELECTRICITY_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
    connection: formState.connection,
    filer: formState.filer,
  } as const;
}

export function buildTelecomUseParameters(formState: TelecomFormState) {
  return {
    ...PHONE_INTERNET_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
    service: formState.service,
    payment: formState.payment,
  } as const;
}
