import Image from 'next/image';
import Link from 'next/link';

import { Linkedin, Twitter } from 'lucide-react';

const guideLinks = [
  { href: '/tax-guides/understanding-tax-system', label: 'Income Tax Slabs & System' },
  { href: '/tax-guides/deductions-credits', label: 'Tax Deductions & Credits' },
  { href: '/tax-guides/filing-tax-return', label: 'Filing Your Tax Return' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkClass = 'text-emerald-100/70 hover:text-white text-sm transition-colors';

  return (
    <footer className="relative z-10 mt-8 border-white/10 border-t bg-emerald-950/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center">
              <Image
                src="/main-logo.png"
                alt="My Tax Calculator — Pakistan income tax calculator"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="ml-2.5 font-extrabold text-white text-xl tracking-tight">
                My Tax Calculator
              </span>
            </div>
            <p className="mt-4 max-w-md text-emerald-100/70 text-sm leading-relaxed">
              A comprehensive income tax calculator for Pakistani taxpayers. Calculate your tax
              accurately using the latest FBR tax slabs for FY 2026-2027.
            </p>
            <div className="mt-5 flex space-x-3">
              <button
                type="button"
                aria-label="Twitter"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-emerald-100 transition-colors hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="LinkedIn"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-emerald-100 transition-colors hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/tax-guides" className={linkClass}>
                  Tax Guides
                </Link>
              </li>
              <li>
                <Link href="/budget-2025-26-vs-2026-27" className={linkClass}>
                  Budget 2025-26 vs 2026-27
                </Link>
              </li>
              <li>
                <Link href="/tax-news" className={linkClass}>
                  Tax News
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className={linkClass}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Tax Guides */}
          <div>
            <h3 className="mb-4 font-bold text-sm text-white uppercase tracking-wider">
              Tax Guides
            </h3>
            <ul className="space-y-3">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.fbr.gov.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  FBR Website
                </a>
              </li>
              <li>
                <a
                  href="https://iris.fbr.gov.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  IRIS Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-white/10 border-t pt-8 md:flex-row">
          <p className="text-emerald-100/60 text-sm">
            &copy; {currentYear} My Tax Calculator. All rights reserved.
          </p>
          <p className="text-emerald-100/60 text-sm">Designed with ❤️ in Pakistan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
