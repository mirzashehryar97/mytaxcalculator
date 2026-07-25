import Link from 'next/link';

import { ArrowRight, Calculator, CheckCircle2, Users } from 'lucide-react';

import { BUSINESS_CLASSIFICATION_CARDS } from '@/features/business-tax/lib/content';
import type { BusinessClassificationCard } from '@/features/business-tax/types';

function CardIcon({ id }: { id: BusinessClassificationCard['id'] }) {
  if (id === 'net-income') {
    return <Calculator className="h-5 w-5" aria-hidden="true" />;
  }
  return <Users className="h-5 w-5" aria-hidden="true" />;
}

export default function BusinessClassificationCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {BUSINESS_CLASSIFICATION_CARDS.map((card) => (
        <section
          key={card.id}
          className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <CardIcon id={card.id} />
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 text-lg">{card.title}</h3>
              <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">{card.intro}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2.5">
            {card.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-gray-700 text-sm leading-relaxed">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          {card.linkHref && card.linkLabel ? (
            <Link
              href={card.linkHref}
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-emerald-700 text-sm hover:text-emerald-800"
            >
              {card.linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </section>
      ))}
    </div>
  );
}
