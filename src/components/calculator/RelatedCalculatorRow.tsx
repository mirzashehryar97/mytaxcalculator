import Link from 'next/link';

import { ArrowRight, ChevronRight } from 'lucide-react';

import type { CalculatorNavLink } from '@/components/layout/navigation';

interface RelatedCalculatorRowProps {
  link: CalculatorNavLink;
}

/**
 * One calculator inside the grouped panel: icon tile, name, one-line description and a
 * chevron that turns into an arrow on hover/focus.
 */
export default function RelatedCalculatorRow({ link }: RelatedCalculatorRowProps) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className="group flex items-center gap-3.5 rounded-xl border border-gray-200 bg-white p-3.5 transition-colors hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:border-emerald-300 focus-visible:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/40 transition-colors group-hover:bg-emerald-700 group-hover:text-white group-hover:ring-emerald-700 group-focus-visible:bg-emerald-700 group-focus-visible:text-white group-focus-visible:ring-emerald-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-balance font-bold text-gray-900 text-sm leading-snug">
          {link.label}
        </span>
        <span className="text-gray-500 text-xs leading-relaxed">{link.description}</span>
      </span>

      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <ChevronRight
          className="h-[18px] w-[18px] text-gray-300 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0"
          aria-hidden="true"
        />
        <ArrowRight
          className="absolute h-[18px] w-[18px] text-emerald-700 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
