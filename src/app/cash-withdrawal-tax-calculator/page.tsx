import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';

import { getMetadata } from '@/lib/seo';

import CashWithdrawalTaxView from '@/features/withholding-tax/CashWithdrawalTaxView';
import { CASH_WITHDRAWAL_ROUTE } from '@/features/withholding-tax/lib/modes';
import { buildWithholdingStructuredData } from '@/features/withholding-tax/lib/structuredData';

export const metadata: Metadata = getMetadata(CASH_WITHDRAWAL_ROUTE);

export default function CashWithdrawalTaxPage() {
  return (
    <>
      <JsonLd data={buildWithholdingStructuredData('cash-withdrawal')} />
      <CashWithdrawalTaxView />
    </>
  );
}
