'use client';

import Link from 'next/link';

import { Menu, X } from 'lucide-react';

import BudgetNavLink from '@/components/layout/BudgetNavLink';
import CalculatorMenu from '@/components/layout/CalculatorMenu';
import useHeaderNavigation from '@/components/layout/hooks/useHeaderNavigation';
import MobileNavDrawer from '@/components/layout/MobileNavDrawer';
import {
  BUDGET_PATH,
  getNavLinkClass,
  NEW_NAV_BADGE_LABEL,
  STANDARD_NAV_LINKS,
} from '@/components/layout/navigation';

export default function HeaderNav() {
  const { pathname, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeaderNavigation();

  return (
    <>
      <nav
        className="hidden shrink-0 items-center gap-1.5 md:flex xl:gap-3"
        aria-label="Main navigation"
      >
        <Link href="/" className={getNavLinkClass(pathname === '/', false)}>
          Home
        </Link>
        <CalculatorMenu pathname={pathname} />
        {STANDARD_NAV_LINKS.filter((link) => link.href !== '/').map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={getNavLinkClass(pathname === link.href, false)}
          >
            {link.label}
          </Link>
        ))}
        <BudgetNavLink active={pathname === BUDGET_PATH} />
      </nav>

      <div className="md:hidden">
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={
            isMobileMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu — new calculator available'
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          className="relative inline-flex items-center justify-center rounded-xl bg-emerald-50 p-2 text-emerald-800 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span
            aria-hidden="true"
            className="-top-1.5 -right-2 absolute inline-flex animate-badge-pop items-center rounded-full bg-emerald-600 px-1.5 py-0.5 font-bold text-[8px] text-white uppercase leading-none tracking-wide ring-2 ring-white"
          >
            {NEW_NAV_BADGE_LABEL}
          </span>
        </button>
      </div>

      {isMobileMenuOpen ? <MobileNavDrawer pathname={pathname} onClose={closeMobileMenu} /> : null}
    </>
  );
}
