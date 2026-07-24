import type { ReactNode } from 'react';

interface CalculatorLayoutProps {
  form: ReactNode;
  result: ReactNode;
  children?: ReactNode;
  ariaLabel?: string;
}

export default function CalculatorLayout({
  form,
  result,
  children,
  ariaLabel = 'Tax calculator',
}: CalculatorLayoutProps) {
  return (
    <section
      className="surface-card mx-auto max-w-6xl animate-fade-up overflow-hidden p-4 sm:p-6"
      aria-label={ariaLabel}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">{form}</div>
        <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          {result}
        </div>
      </div>
      {children ? <div className="mt-5 space-y-5">{children}</div> : null}
    </section>
  );
}
