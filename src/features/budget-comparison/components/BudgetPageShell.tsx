import type { ReactNode } from 'react';

interface BudgetPageShellProps {
  children: ReactNode;
}

export default function BudgetPageShell({ children }: BudgetPageShellProps) {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-white text-slate-800">
      {children}
    </div>
  );
}
