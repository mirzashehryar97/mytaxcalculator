import { CheckCircle2, Lightbulb } from 'lucide-react';

interface TaxGuideArticleTakeawaysProps {
  items: readonly string[];
}

export default function TaxGuideArticleTakeaways({ items }: TaxGuideArticleTakeawaysProps) {
  return (
    <section className="rounded-xl border-[#b8c8c1] border-[1.5px] bg-white px-5 py-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white">
          <Lightbulb className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="font-bold text-[#0b1736] text-xl">Key takeaways</h2>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-slate-700 text-sm leading-6 sm:text-[15px]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
