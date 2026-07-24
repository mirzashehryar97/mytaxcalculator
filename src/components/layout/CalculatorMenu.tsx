'use client';

import Link from 'next/link';

import { ChevronDown } from 'lucide-react';

import useDropdownMenu from '@/components/layout/hooks/useDropdownMenu';
import {
  CALCULATOR_NAV_LINKS,
  getCalculatorTriggerClass,
  NEW_CALCULATOR_MOBILE_NOTICE,
  NEW_NAV_BADGE_LABEL,
} from '@/components/layout/navigation';

interface CalculatorMenuProps {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function CalculatorMenu({
  pathname,
  mobile = false,
  onNavigate,
}: CalculatorMenuProps) {
  const { isOpen, containerRef, toggle, close } = useDropdownMenu(mobile);
  const menuId = mobile ? 'mobile-calculator-menu' : 'desktop-calculator-menu';
  const isCalculatorRoute = CALCULATOR_NAV_LINKS.some(
    (link) => link.href !== '/' && link.href === pathname,
  );

  return (
    <div ref={containerRef} className={mobile ? 'w-full' : 'relative'}>
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={getCalculatorTriggerClass(isCalculatorRoute, mobile)}
      >
        <span className="text-left">
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span
              className={
                isCalculatorRoute
                  ? 'underline decoration-2 decoration-emerald-600 underline-offset-8'
                  : undefined
              }
            >
              Calculators
            </span>
            <span
              className={`inline-flex animate-badge-pop items-center rounded-full px-1.5 py-0.5 font-bold text-[10px] uppercase leading-none tracking-wide shadow-sm ${
                isCalculatorRoute ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-600 text-white'
              }`}
            >
              {NEW_NAV_BADGE_LABEL}
            </span>
          </span>
          {mobile ? (
            <span className="mt-1 block font-medium text-emerald-700 text-xs">
              {NEW_CALCULATOR_MOBILE_NOTICE}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          className={
            mobile
              ? 'mt-1 space-y-1 rounded-xl bg-gray-50 p-2'
              : '-translate-x-1/2 absolute top-full left-1/2 z-50 mt-3 w-72 rounded-2xl border border-gray-100 bg-white p-2 shadow-emerald-950/10 shadow-xl'
          }
        >
          {CALCULATOR_NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => {
                  close();
                  onNavigate?.();
                }}
                className={`block rounded-xl px-3 py-3 transition-colors ${
                  active
                    ? 'text-emerald-700 hover:bg-emerald-50'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`font-semibold text-sm ${
                      active
                        ? 'underline decoration-2 decoration-emerald-600 underline-offset-4'
                        : ''
                    }`}
                  >
                    {link.label}
                  </span>
                  {link.isNew ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-1.5 py-0.5 font-bold text-[9px] text-emerald-900 uppercase leading-none tracking-wide">
                      {NEW_NAV_BADGE_LABEL}
                    </span>
                  ) : null}
                </span>
                <span
                  className={`mt-0.5 block text-xs ${
                    active ? 'text-emerald-700/80' : 'text-gray-500'
                  }`}
                >
                  {link.description}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
