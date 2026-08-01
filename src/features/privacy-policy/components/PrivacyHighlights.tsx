import PrivacyHighlightCard from '@/features/privacy-policy/components/PrivacyHighlightCard';
import { PRIVACY_HIGHLIGHTS, PRIVACY_HIGHLIGHTS_COPY } from '@/features/privacy-policy/lib/content';

export default function PrivacyHighlights() {
  return (
    <section className="bg-[#fafaf8]" aria-labelledby="privacy-highlights-heading">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.5rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.8fr)] lg:items-start lg:gap-12">
          <div>
            <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.16em]">
              {PRIVACY_HIGHLIGHTS_COPY.eyebrow}
            </p>
            <h2
              id="privacy-highlights-heading"
              className="mt-3 font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl"
            >
              {PRIVACY_HIGHLIGHTS_COPY.title}
            </h2>
            <p className="mt-5 max-w-md text-[15px] text-slate-600 leading-relaxed">
              {PRIVACY_HIGHLIGHTS_COPY.description}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PRIVACY_HIGHLIGHTS.map((highlight) => (
              <PrivacyHighlightCard key={highlight.id} highlight={highlight} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
