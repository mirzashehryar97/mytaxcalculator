import Link from 'next/link';

import { ArrowRight, ChevronRight } from 'lucide-react';

import type { CalculatorNavLink } from '@/components/layout/navigation';

interface RelatedCalculatorRowProps {
  link: CalculatorNavLink;
}

/**
 * One calculator inside the grouped panel: icon tile, name, one-line description and a
 * directional action that responds on hover/focus.
 */
export default function RelatedCalculatorRow({ link }: RelatedCalculatorRowProps) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className="group relative flex min-h-[88px] items-center gap-3.5 overflow-hidden rounded-2xl border border-gray-200/90 bg-white/90 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors duration-75 hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:border-emerald-300 focus-visible:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 shadow-[0_8px_20px_-12px_rgba(5,150,105,0.8)] ring-1 ring-emerald-600/25 transition-colors duration-75 group-hover:bg-emerald-700 group-hover:bg-none group-hover:text-white group-hover:ring-emerald-700 group-focus-visible:bg-emerald-700 group-focus-visible:bg-none group-focus-visible:text-white group-focus-visible:ring-emerald-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <span className="relative flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-balance font-bold text-[15px] text-gray-900 leading-snug">
          {link.label}
        </span>
        <span className="text-gray-500 text-xs leading-relaxed sm:text-[13px]">
          {link.description}
        </span>
      </span>

      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <ChevronRight
          className="h-[18px] w-[18px] text-gray-300 transition-opacity duration-75 group-hover:opacity-0 group-focus-visible:opacity-0"
          aria-hidden="true"
        />
        <ArrowRight
          className="absolute h-[18px] w-[18px] text-emerald-700 opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
