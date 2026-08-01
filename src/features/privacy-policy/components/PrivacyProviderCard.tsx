import { ExternalLink } from 'lucide-react';

import type { PrivacyProvider } from '@/features/privacy-policy/types';

interface PrivacyProviderCardProps {
  provider: PrivacyProvider;
}

export default function PrivacyProviderCard({ provider }: PrivacyProviderCardProps) {
  const Icon = provider.icon;

  return (
    <article className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-100">
          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <h4 className="font-bold text-slate-900">{provider.name}</h4>
          <p className="mt-1 font-semibold text-emerald-800 text-sm">{provider.description}</p>
        </div>
      </div>
      <p className="mt-4 text-slate-600 text-sm leading-relaxed">{provider.detail}</p>
      <a
        href={provider.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 font-semibold text-emerald-800 text-sm underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
      >
        {provider.linkLabel}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </article>
  );
}
