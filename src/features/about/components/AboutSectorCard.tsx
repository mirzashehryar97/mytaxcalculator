import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { ABOUT_SECTOR_LINK_SUFFIX } from '@/features/about/lib/content';
import type { AboutSector } from '@/features/about/types';

interface AboutSectorCardProps {
  sector: AboutSector;
}

export default function AboutSectorCard({ sector }: AboutSectorCardProps) {
  const Icon = sector.icon;

  return (
    <Link
      href={sector.href}
      className="group hover:-translate-y-0.5 flex min-h-[9.5rem] flex-col justify-between rounded-2xl bg-white p-5 shadow-slate-900/5 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md hover:ring-emerald-200"
    >
      <Icon className="h-8 w-8 text-emerald-800" strokeWidth={1.6} aria-hidden="true" />

      <div className="mt-6">
        <span className="block font-bold text-[15px] text-slate-900 group-hover:text-emerald-800">
          {sector.label}
          <span className="sr-only"> {ABOUT_SECTOR_LINK_SUFFIX}</span>
        </span>
        <span className="mt-2 flex justify-end">
          <ArrowRight
            className="h-4 w-4 text-emerald-800 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
