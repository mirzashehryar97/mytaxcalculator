import { ChevronDown, HelpCircle } from 'lucide-react';

interface CalculatorFaqItem {
  id: string;
  question: string;
  answer: string;
}

interface CalculatorFaqProps {
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
  disclaimer: string;
  items: readonly CalculatorFaqItem[];
}

export default function CalculatorFaq({
  headingId,
  eyebrow,
  title,
  description,
  disclaimer,
  items,
}: CalculatorFaqProps) {
  return (
    <section className="mt-16 sm:mt-20" aria-labelledby={headingId}>
      <div className="mb-8 text-center sm:mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-emerald-100 text-sm backdrop-blur-sm">
          <HelpCircle className="h-4 w-4 text-emerald-300" aria-hidden="true" />
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

      <div className="mx-auto max-w-4xl space-y-3">
        {items.map((item) => (
          <details
            key={item.id}
            className="group rounded-2xl border border-white/60 bg-white/95 shadow-emerald-950/10 shadow-lg backdrop-blur-sm transition-all open:ring-1 open:ring-emerald-100 hover:border-emerald-200"
          >
            <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 p-5 font-semibold text-gray-900 transition-colors group-open:text-emerald-700 group-hover:text-emerald-700">
              <span>{item.question}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform group-open:rotate-180">
                <ChevronDown className="h-5 w-5" aria-hidden="true" />
              </span>
            </summary>
            <div className="px-5 pb-5">
              <p className="border-gray-100 border-t pt-4 text-gray-600 text-sm leading-relaxed sm:text-base">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-emerald-50/65 text-xs leading-relaxed">
        {disclaimer}
      </p>
    </section>
  );
}
