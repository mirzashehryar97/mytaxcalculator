import EmbedCodeButton from '@/features/embed-salary-tax/components/EmbedCodeButton';
import EmbedSalaryTaxCalculator from '@/features/embed-salary-tax/components/EmbedSalaryTaxCalculator';

export default function EmbedSalaryTaxView() {
  return (
    <div className="mx-auto flex min-h-screen w-full min-w-0 max-w-7xl flex-col justify-center gap-5 overflow-x-hidden p-3 sm:p-6 lg:p-10">
      <EmbedSalaryTaxCalculator />
      <EmbedCodeButton />
    </div>
  );
}
