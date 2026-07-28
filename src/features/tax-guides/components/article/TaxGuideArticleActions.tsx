'use client';

import { useState } from 'react';

import { ExternalLink, Printer, Share2 } from 'lucide-react';

import type { TaxGuideArticleHeroAction } from '@/features/tax-guides/types';

interface TaxGuideArticleActionsProps {
  printLabel?: string;
  primaryAction?: TaxGuideArticleHeroAction;
}

export default function TaxGuideArticleActions({
  printLabel = 'Print',
  primaryAction,
}: TaxGuideArticleActionsProps) {
  const [shareStatus, setShareStatus] = useState('');

  const handleShare = async () => {
    const shareData = { title: document.title, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setShareStatus('Link copied');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setShareStatus('Use your browser address bar to copy this link');
    }
  };

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5">
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-800 bg-white/75 px-4 font-semibold text-emerald-900 text-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          {printLabel}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-800 bg-white/75 px-4 font-semibold text-emerald-900 text-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </button>
      </div>
      {primaryAction ? (
        <a
          href={primaryAction.href}
          target={primaryAction.external ? '_blank' : undefined}
          rel={primaryAction.external ? 'noopener noreferrer' : undefined}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 font-semibold text-sm text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 sm:ml-auto"
        >
          {primaryAction.label}
          {primaryAction.external ? <ExternalLink className="h-4 w-4" aria-hidden="true" /> : null}
        </a>
      ) : null}
      <span className="w-full text-emerald-800 text-xs" aria-live="polite">
        {shareStatus}
      </span>
    </div>
  );
}
