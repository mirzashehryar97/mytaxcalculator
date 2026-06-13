import Link from 'next/link';

import { Sparkles } from 'lucide-react';

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
  const isMobile = variant === 'mobile';

  const baseClass = isMobile
    ? 'block rounded-xl px-4 py-3 font-semibold text-base transition-colors'
    : 'relative rounded-full px-4 py-2 font-semibold text-sm transition-all duration-200';

  let activeClass: string;
  if (active) {
    activeClass = 'bg-amber-100 text-amber-950 ring-2 ring-amber-400';
  } else if (isMobile) {
    activeClass =
      'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-950 ring-2 ring-amber-300/80 animate-hot-pulse hover:from-amber-100 hover:to-orange-100';
  } else {
    activeClass =
      'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-950 ring-2 ring-amber-300/80 animate-hot-pulse hover:from-amber-100 hover:to-orange-100 hover:ring-amber-400';
  }

  return (
    <Link
      href="/budget-2025-26-vs-2026-27"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`${baseClass} ${activeClass}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Sparkles className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
        <span>Budget Comparison</span>
        {!active && (
          <span className="inline-flex animate-badge-pop items-center rounded-full bg-amber-500 px-1.5 py-0.5 font-bold text-[10px] text-white uppercase leading-none tracking-wide">
            New
          </span>
        )}
      </span>
    </Link>
  );
}
