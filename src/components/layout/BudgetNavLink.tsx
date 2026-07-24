import Link from 'next/link';

import { BUDGET_PATH, getNavLinkClass } from '@/components/layout/navigation';

interface BudgetNavLinkProps {
  active: boolean;
  onClick?: () => void;
  variant?: 'desktop' | 'mobile';
}

export default function BudgetNavLink({
  active,
  onClick,
  variant = 'desktop',
}: BudgetNavLinkProps) {
  const mobile = variant === 'mobile';

  return (
    <Link
      href={BUDGET_PATH}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={getNavLinkClass(active, mobile)}
    >
      Budget Comparison
    </Link>
  );
}
