'use client';

import Image from 'next/image';
import Link from 'next/link';

import { X } from 'lucide-react';

import BudgetNavLink from '@/components/layout/BudgetNavLink';
import CalculatorMenu from '@/components/layout/CalculatorMenu';
import { BUDGET_PATH, getNavLinkClass, STANDARD_NAV_LINKS } from '@/components/layout/navigation';

interface MobileNavDrawerProps {
  pathname: string;
  onClose: () => void;
}

export default function MobileNavDrawer({ pathname, onClose }: MobileNavDrawerProps) {
  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 animate-backdrop-in bg-gray-900/40 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="absolute inset-y-0 right-0 flex w-[min(86vw,22rem)] animate-drawer-in flex-col bg-white shadow-2xl shadow-gray-900/20"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-gray-100 border-b px-4">
          <Link href="/" onClick={onClose} className="flex items-center whitespace-nowrap">
            <Image
              src="/main-logo.png"
              alt="My Tax Calculator — Pakistan income tax calculator logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="ml-2 font-bold text-base text-gray-900 tracking-tight">
              My Tax Calculator
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-50 p-2 text-emerald-800 ring-1 ring-emerald-200 transition-colors hover:bg-emerald-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-3 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        >
          <Link href="/" onClick={onClose} className={getNavLinkClass(pathname === '/', true)}>
            Home
          </Link>
          <CalculatorMenu pathname={pathname} mobile onNavigate={onClose} />
          {STANDARD_NAV_LINKS.filter((link) => link.href !== '/').map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={getNavLinkClass(pathname === link.href, true)}
            >
              {link.label}
            </Link>
          ))}
          <BudgetNavLink active={pathname === BUDGET_PATH} variant="mobile" onClick={onClose} />
        </nav>
      </div>
    </div>
  );
}
