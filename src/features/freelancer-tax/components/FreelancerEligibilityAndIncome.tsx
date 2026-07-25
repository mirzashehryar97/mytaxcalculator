import Link from 'next/link';

import { ArrowRight, CheckCircle2, Info } from 'lucide-react';

import {
  FREELANCER_ELIGIBILITY_REQUIREMENTS,
  FREELANCER_PAGE_COPY,
  FREELANCER_SECTION_COPY,
} from '@/features/freelancer-tax/lib/content';

export default function FreelancerEligibilityAndIncome() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
        <h2 className="font-bold text-emerald-950 text-lg">
          {FREELANCER_SECTION_COPY.eligibilityTitle}
        </h2>
        <p className="mt-2 text-emerald-900/70 text-sm leading-relaxed">
          {FREELANCER_SECTION_COPY.eligibilityDescription}
        </p>
        <ul className="mt-5 space-y-3">
          {FREELANCER_ELIGIBILITY_REQUIREMENTS.map((requirement) => (
            <li key={requirement.id} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                aria-hidden="true"
              />
              <span>{requirement.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:p-6">
        <h2 className="font-bold text-blue-950 text-lg">{FREELANCER_PAGE_COPY.localIncomeTitle}</h2>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          {FREELANCER_PAGE_COPY.localIncomeBody}
        </p>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-white/70 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-blue-800 text-sm">
              {FREELANCER_PAGE_COPY.localIncomeLinkLabel}
            </p>
            <Link
              href={FREELANCER_PAGE_COPY.localIncomeLinkHref}
              className="mt-1 inline-flex items-center gap-1 font-semibold text-blue-600 text-xs hover:text-blue-700"
            >
              {FREELANCER_PAGE_COPY.localIncomeLinkCta}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
