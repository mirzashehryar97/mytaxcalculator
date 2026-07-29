import TaxGuidesSectionHeading from '@/features/tax-guides/components/TaxGuidesSectionHeading';
import { TAX_GUIDE_TOPICS, TAX_GUIDES_PAGE_COPY } from '@/features/tax-guides/lib/content';

export default function BrowseTopics() {
  return (
    <section aria-labelledby="tax-guide-topics-heading">
      <TaxGuidesSectionHeading
        id="tax-guide-topics-heading"
        title={TAX_GUIDES_PAGE_COPY.topicsTitle}
        status={TAX_GUIDES_PAGE_COPY.topicsStatus}
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {TAX_GUIDE_TOPICS.map((topic) => {
          const Icon = topic.icon;

          return (
            <li
              key={topic.id}
              className="flex min-h-28 cursor-default select-none flex-col items-center justify-center gap-3 rounded-2xl border-[1.5px] border-slate-200 bg-white px-3 py-5 text-center shadow-sm"
            >
              <Icon className="h-9 w-9 text-emerald-800" strokeWidth={1.7} aria-hidden="true" />
              <span className="font-semibold text-emerald-900 text-sm">{topic.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
