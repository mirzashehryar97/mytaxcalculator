import type { Metadata } from 'next';
import Link from 'next/link';

import { BookOpen, Calculator, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="font-bold text-6xl text-white/90">404</p>
      <h1 className="mt-4 font-bold text-2xl text-white sm:text-3xl">Page not found</h1>
      <p className="mt-3 text-emerald-50/80">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-800 text-sm shadow-lg transition-colors hover:bg-emerald-50"
        >
          <Home className="h-4 w-4" />
          Tax Calculator
        </Link>
        <Link
          href="/tax-guides"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-sm text-white transition-colors hover:bg-white/20"
        >
          <BookOpen className="h-4 w-4" />
          Tax Guides
        </Link>
      </div>
      <p className="mt-6 text-emerald-100/60 text-sm">
        <Calculator className="-mt-0.5 mr-1 inline h-4 w-4" />
        Use our{' '}
        <Link href="/" className="underline hover:text-white">
          Pakistan income tax calculator
        </Link>{' '}
        to estimate salary tax for FY 2026-2027.
      </p>
    </div>
  );
}
