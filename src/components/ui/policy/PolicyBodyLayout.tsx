import type { ReactNode } from 'react';

import type { PolicyBodyCopy, PolicySectionContent } from '@/components/ui/policy/types';

interface PolicyBodyLayoutProps {
  headingId: string;
  copy: PolicyBodyCopy;
  sections: readonly PolicySectionContent[];
  children: ReactNode;
}

export default function PolicyBodyLayout({
  headingId,
  copy,
  sections,
  children,
}: PolicyBodyLayoutProps) {
  return (
    <section className="bg-white" aria-labelledby={headingId}>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.5rem]">
        <div className="max-w-3xl">
          <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.16em]">
            {copy.eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-3 font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 text-[15px] text-slate-600 leading-relaxed sm:text-base">
            {copy.introduction}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <nav
              className="sticky top-24 rounded-2xl border border-slate-200 bg-[#fafaf8] p-5"
              aria-label={copy.navigationLabel}
            >
              <p className="font-bold text-slate-900 text-sm">{copy.navigationLabel}</p>
              <ol className="mt-4 space-y-1.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-2 rounded-lg px-2 py-2 text-slate-600 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <span className="font-semibold text-emerald-700">{section.number}</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
