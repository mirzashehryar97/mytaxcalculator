import type { AboutStoryCard as AboutStoryCardContent } from '@/features/about/types';

interface AboutStoryCardProps {
  card: AboutStoryCardContent;
}

export default function AboutStoryCard({ card }: AboutStoryCardProps) {
  const Icon = card.icon;

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-slate-900/5 shadow-sm sm:p-7">
      <Icon className="h-9 w-9 text-emerald-800" strokeWidth={1.6} aria-hidden="true" />
      <h3 className="mt-7 font-bold text-base text-slate-900 sm:text-lg">{card.title}</h3>
      <p className="mt-4 text-[15px] text-slate-600 leading-relaxed">{card.description}</p>
    </article>
  );
}
