'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';

import BudgetNavLink from './BudgetNavLink';

const BUDGET_PATH = '/budget-2025-26-vs-2026-27';

const standardLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/tax-guides', label: 'Tax Guides' },
] as const;

function navLinkClass(active: boolean, mobile: boolean) {
  const base = mobile
    ? 'block rounded-xl px-4 py-3 font-semibold text-base transition-colors'
    : 'rounded-full px-4 py-2 font-semibold text-sm transition-all duration-200';

  let state: string;
  if (active) {
    state = 'bg-emerald-50 text-emerald-700';
  } else if (mobile) {
    state = 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
  } else {
    state = 'text-gray-600 hover:bg-gray-50 hover:text-emerald-700';
  }

  return `${base} ${state}`;
}

export default function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const closeMenu = () => setIsMenuOpen(false);

  const renderStandardLink = (link: (typeof standardLinks)[number], mobile: boolean) => (
    <Link
      key={link.to}
      href={link.to}
      onClick={mobile ? closeMenu : undefined}
      className={navLinkClass(isActive(link.to), mobile)}
    >
      {link.label}
    </Link>
  );

  return (
    <>
      <nav className="hidden items-center gap-1 min-[950px]:flex">
        {standardLinks.map((link) => renderStandardLink(link, false))}
        <BudgetNavLink active={isActive(BUDGET_PATH)} variant="desktop" />
      </nav>

      <div className="min-[950px]:hidden">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className="inline-flex items-center justify-center rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-emerald-600"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 left-0 animate-fade-in border-gray-100 border-t min-[950px]:hidden">
          <div className="space-y-1 bg-white px-3 py-3 shadow-sm">
            {standardLinks.map((link) => renderStandardLink(link, true))}
            <BudgetNavLink active={isActive(BUDGET_PATH)} variant="mobile" onClick={closeMenu} />
          </div>
        </div>
      )}
    </>
  );
}
