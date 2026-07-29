import { Landmark } from 'lucide-react';

import OfficialSourcesGrid, {
  type OfficialSource,
} from '@/components/calculator/OfficialSourcesGrid';

interface OfficialSourcesSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  sources: readonly OfficialSource[];
  columns?: 2 | 3;
  reviewedLabel: string;
  reviewedDateTime: string;
}

/** Official FBR documents behind every rate on a calculator page, shown above the footer. */
export default function OfficialSourcesSection({
  id,
  eyebrow,
  title,
  description,
  sources,
  columns,
  reviewedLabel,
  reviewedDateTime,
}: OfficialSourcesSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className="mt-16 scroll-mt-24 sm:mt-20" aria-labelledby={headingId}>
      <div className="mb-8 text-center sm:mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-emerald-100 text-sm backdrop-blur-sm">
          <Landmark className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          {eyebrow}
        </span>
        <h2
          id={headingId}
          className="mt-5 font-bold text-3xl text-white tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/80">{description}</p>
      </div>

      <div className="mx-auto max-w-5xl">
        <OfficialSourcesGrid sources={sources} columns={columns} />
        <p className="mt-5 text-center text-emerald-50/70 text-sm">
          <time dateTime={reviewedDateTime}>{reviewedLabel}</time>
        </p>
      </div>
    </section>
  );
}
