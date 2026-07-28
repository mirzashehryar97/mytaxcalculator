import type { TaxGuideArticleTocItem } from '@/features/tax-guides/types';

interface TaxGuideArticleTableOfContentsProps {
  items: readonly TaxGuideArticleTocItem[];
}

export default function TaxGuideArticleTableOfContents({
  items,
}: TaxGuideArticleTableOfContentsProps) {
  return (
    <nav
      aria-labelledby="article-table-of-contents-heading"
      className="rounded-xl border-[1.5px] border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 id="article-table-of-contents-heading" className="font-bold text-[#0b1736] text-xl">
        On this page
      </h2>
      <ol className="mt-4">
        {items.map((item, index) => (
          <li key={item.id} className="relative flex min-h-9 gap-3 pb-2 last:min-h-0 last:pb-0">
            <span
              className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-emerald-800"
              aria-hidden="true"
            />
            {index < items.length - 1 ? (
              <span
                className="absolute top-[15px] bottom-[-7px] left-[3px] w-px bg-emerald-200"
                aria-hidden="true"
              />
            ) : null}
            <a
              href={item.href}
              className="text-slate-700 text-sm leading-5 hover:text-emerald-800 hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
