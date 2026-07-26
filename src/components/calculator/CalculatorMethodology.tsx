import { ListChecks } from 'lucide-react';

interface CalculatorMethodologyItem {
  title: string;
  description: string;
}

interface CalculatorMethodologyProps {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  items: readonly CalculatorMethodologyItem[];
}

export default function CalculatorMethodology({
  headingId,
  eyebrow,
  title,
  description,
  items,
}: CalculatorMethodologyProps) {
  return (
    <section className="mt-16 sm:mt-20" aria-labelledby={headingId}>
      <div className="surface-card mx-auto max-w-5xl p-6 sm:p-8 lg:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700 text-xs ring-1 ring-emerald-100">
          <ListChecks className="h-4 w-4" aria-hidden="true" />
          {eyebrow}
        </span>
        <h2 id={headingId} className="mt-5 font-bold text-3xl text-gray-900 tracking-tight">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-gray-600 leading-relaxed">{description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <article key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 text-sm">
                {index + 1}
              </span>
              <h3 className="mt-4 font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
