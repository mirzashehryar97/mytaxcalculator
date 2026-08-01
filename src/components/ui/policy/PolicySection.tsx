import type { ReactNode } from 'react';

import type { PolicySectionContent } from '@/components/ui/policy/types';

interface PolicySectionProps {
  section: PolicySectionContent;
  children?: ReactNode;
}

export default function PolicySection({ section, children }: PolicySectionProps) {
  const Icon = section.icon;

  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-slate-200 border-b pb-10 last:border-b-0 last:pb-0"
      aria-labelledby={`${section.id}-heading`}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.14em]">
            Section {section.number}
          </p>
          <h3
            id={`${section.id}-heading`}
            className="mt-1 font-bold text-slate-900 text-xl tracking-tight sm:text-2xl"
          >
            {section.title}
          </h3>
        </div>
      </div>

      <div className="mt-5 space-y-4 text-[15px] text-slate-600 leading-relaxed sm:pl-[3.75rem]">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {section.bullets ? (
          <ul className="list-disc space-y-2 pl-5 marker:text-emerald-700">
            {section.bullets.map((bullet) => (
              <li key={bullet.label}>
                {bullet.href ? (
                  <a
                    href={bullet.href}
                    target={bullet.href.startsWith('http') ? '_blank' : undefined}
                    rel={bullet.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
                  >
                    {bullet.label}
                  </a>
                ) : (
                  bullet.label
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {children}
    </section>
  );
}
