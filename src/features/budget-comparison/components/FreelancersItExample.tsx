import { FREELANCERS_IT_EXAMPLE } from '@/features/budget-comparison/lib/freelancersItContent';

export default function FreelancersItExample() {
  return (
    <section
      id="example"
      aria-labelledby="freelancers-it-example-heading"
      className="scroll-mt-24 rounded-xl border-[1.5px] border-emerald-200 bg-emerald-50/35 p-5 shadow-sm sm:p-6"
    >
      <h2
        id="freelancers-it-example-heading"
        className="font-bold text-[#0b1736] text-xl sm:text-2xl"
      >
        {FREELANCERS_IT_EXAMPLE.title}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {FREELANCERS_IT_EXAMPLE.results.map((result) => {
          const Icon = result.icon;

          return (
            <article
              key={result.id}
              className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Icon
                className="h-11 w-11 shrink-0 text-emerald-800"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-[#0b1736] text-base">{result.label}</h3>
                <p className="mt-1 font-bold text-lg text-red-600 sm:text-xl">{result.value}</p>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-base text-slate-700 leading-6">{FREELANCERS_IT_EXAMPLE.note}</p>
    </section>
  );
}
