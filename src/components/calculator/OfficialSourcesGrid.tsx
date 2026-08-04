import Image from 'next/image';

import { ExternalLink, type LucideIcon } from 'lucide-react';

export interface SourceLogo {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the file — wrong values distort or clip the logo. */
  width: number;
  height: number;
  /**
   * Let the logo keep its intrinsic width while the slot clips the overflow.
   * Use for very wide wordmarks or artwork with excessive built-in whitespace.
   */
  cropToMark?: boolean;
  /** Give a standalone seal, emblem or detailed brand mark more size in the logo slot. */
  prominent?: boolean;
}

export interface OfficialSource {
  id: string;
  title: string;
  description: string;
  href: string;
  /** Publisher logo, e.g. the FBR wordmark. Takes precedence over `icon`. */
  logo?: SourceLogo;
  icon?: LucideIcon;
}

interface OfficialSourcesGridProps {
  sources: readonly OfficialSource[];
  columns?: 2 | 3;
}

/** Card grid linking out to the official documents a page's figures came from. */
export default function OfficialSourcesGrid({ sources, columns = 3 }: OfficialSourcesGridProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${columns === 3 ? '2xl:grid-cols-3' : ''}`}>
      {sources.map((source) => {
        const Icon = source.icon;

        return (
          <a
            key={source.id}
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:-translate-y-0.5 flex min-h-28 items-center gap-4 rounded-xl border-[1.5px] border-slate-300 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            <span
              className={`flex shrink-0 items-center overflow-hidden text-emerald-800 ${source.logo?.prominent ? 'h-16 w-20 justify-center' : 'h-12'} ${source.logo ? 'w-20' : 'w-16 justify-center'}`}
            >
              {source.logo ? (
                <Image
                  src={source.logo.src}
                  alt={source.logo.alt}
                  width={source.logo.width}
                  height={source.logo.height}
                  className={`${source.logo.cropToMark ? 'w-auto max-w-none shrink-0 object-left' : 'w-full object-contain object-center'} ${source.logo.prominent ? 'h-14' : 'h-9'}`}
                />
              ) : null}
              {Icon ? <Icon className="h-11 w-11" strokeWidth={1.6} aria-hidden="true" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-[#0b1736] text-base leading-6">
                {source.title}
              </span>
              <span className="mt-1 block text-slate-500 text-sm">{source.description}</span>
            </span>
            <ExternalLink
              className="h-5 w-5 shrink-0 self-start text-slate-400 transition-colors group-hover:text-emerald-700"
              aria-hidden="true"
            />
          </a>
        );
      })}
    </div>
  );
}
