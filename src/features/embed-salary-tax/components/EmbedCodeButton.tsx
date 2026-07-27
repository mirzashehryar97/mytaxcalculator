'use client';

import { useEffect, useState } from 'react';

import { Check, Code2 } from 'lucide-react';

import {
  EMBED_SALARY_TAX_COPY,
  EMBED_SALARY_TAX_SNIPPET,
} from '@/features/embed-salary-tax/lib/content';

export default function EmbedCodeButton() {
  const [isTopLevel, setIsTopLevel] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsTopLevel(window.self === window.top);
  }, []);

  return (
    <div id="embed-code" className={isTopLevel ? 'self-end' : 'hidden'}>
      {isTopLevel && (
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(EMBED_SALARY_TAX_SNIPPET);
            setCopied(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 font-semibold text-emerald-800 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-950"
        >
          {copied ? (
            <Check className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Code2 className="h-5 w-5" aria-hidden="true" />
          )}
          <span aria-live="polite">
            {copied ? EMBED_SALARY_TAX_COPY.copiedButton : EMBED_SALARY_TAX_COPY.embedButton}
          </span>
        </button>
      )}
    </div>
  );
}
