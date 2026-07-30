import type { ReactNode } from 'react';

interface CalculatorLayoutProps {
  form: ReactNode;
  result: ReactNode;
  /** Optional strip rendered flush against the top edge of the card, above the padded body. */
  header?: ReactNode;
  children?: ReactNode;
  ariaLabel?: string;
}

export default function CalculatorLayout({
  form,
  result,
  header,
  children,
  ariaLabel = 'Tax calculator',
}: CalculatorLayoutProps) {
  return (
    <section className="surface-card mx-auto max-w-6xl animate-fade-up" aria-label={ariaLabel}>
      {/* Only the header strip is clipped to the card's radius — clipping the whole
          card would slice tooltips that hang past the body's edges. */}
      {header ? <div className="overflow-hidden rounded-t-3xl">{header}</div> : null}
      <div className="p-4 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
            {form}
          </div>
          <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
            {result}
          </div>
        </div>
        {children ? <div className="mt-5 space-y-5">{children}</div> : null}
      </div>
    </section>
  );
}
