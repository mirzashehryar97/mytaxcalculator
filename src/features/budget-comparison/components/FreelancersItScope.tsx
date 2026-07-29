import Link from 'next/link';

import { AlertCircle, ArrowRight } from 'lucide-react';

import { FREELANCERS_IT_SCOPE } from '@/features/budget-comparison/lib/freelancersItContent';

export default function FreelancersItScope() {
  return (
    <aside
      id="scope"
      aria-labelledby="freelancers-it-scope-heading"
      className="scroll-mt-24 rounded-xl border-[1.5px] border-amber-300 bg-amber-50/70 p-5 text-amber-950 shadow-sm"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
        <div>
          <h2 id="freelancers-it-scope-heading" className="font-bold text-lg">
            {FREELANCERS_IT_SCOPE.title}
          </h2>
          <p className="mt-2 text-base leading-7">{FREELANCERS_IT_SCOPE.description}</p>
          <Link
            href={FREELANCERS_IT_SCOPE.linkHref}
            className="group mt-3 inline-flex items-center gap-2 font-semibold text-amber-900 hover:underline"
          >
            {FREELANCERS_IT_SCOPE.linkLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </aside>
  );
}
