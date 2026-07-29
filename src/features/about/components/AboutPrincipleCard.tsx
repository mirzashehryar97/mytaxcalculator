import type { AboutPrinciple } from '@/features/about/types';

interface AboutPrincipleCardProps {
  principle: AboutPrinciple;
}

export default function AboutPrincipleCard({ principle }: AboutPrincipleCardProps) {
  const Icon = principle.icon;

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-slate-900/5 shadow-sm sm:p-7">
      <div className="flex items-center gap-4">
        <Icon className="h-9 w-9 shrink-0 text-emerald-800" strokeWidth={1.6} aria-hidden="true" />
        <h3 className="font-bold text-base text-slate-900 sm:text-lg">{principle.title}</h3>
      </div>
      <p className="mt-5 pl-[3.25rem] text-[15px] text-slate-600 leading-relaxed">
        {principle.description}
      </p>
    </article>
  );
}
