import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import GuideSearch from '@/features/tax-guides/components/GuideSearch';
import { TAX_GUIDES_PAGE_COPY, TAX_GUIDES_TRUST_ITEMS } from '@/features/tax-guides/lib/content';

export default function TaxGuidesHero() {
  return (
    <header className="relative z-10 overflow-visible bg-[#064e3b]">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-[55px] sm:px-10 lg:px-12">
        <nav
          className="flex items-center gap-2 text-emerald-100/80 text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span aria-current="page" className="text-white">
            Tax Guides
          </span>
        </nav>

        <p className="mt-5 font-bold text-emerald-300 text-xs uppercase tracking-[0.16em] sm:text-sm">
          {TAX_GUIDES_PAGE_COPY.eyebrow}
        </p>
        <h1 className="mt-3 text-balance font-bold text-4xl text-white tracking-tight sm:text-5xl lg:text-6xl">
          {TAX_GUIDES_PAGE_COPY.title}
        </h1>
        <p className="mt-4 max-w-2xl text-emerald-50/85 text-lg leading-relaxed">
          {TAX_GUIDES_PAGE_COPY.description}
        </p>

        <GuideSearch />

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-9">
          {TAX_GUIDES_TRUST_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id} className="flex items-center gap-2 text-emerald-50/85 text-sm">
                <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
