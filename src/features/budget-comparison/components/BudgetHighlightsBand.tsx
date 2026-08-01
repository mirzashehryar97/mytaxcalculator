import type { ReactNode } from 'react';

interface BudgetHighlightsBandProps {
  children: ReactNode;
}

export default function BudgetHighlightsBand({ children }: BudgetHighlightsBandProps) {
  return (
    <div className="bg-[#fafaf8]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.5rem]">
        {children}
      </div>
    </div>
  );
}
