'use client';

import { useState } from 'react';

export default function useBudgetHeroActions() {
  const [shareStatus, setShareStatus] = useState('');

  const printPage = () => window.print();

  const sharePage = async () => {
    const shareData = { title: document.title, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setShareStatus('Link copied');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareStatus('Copy the page link from your browser address bar');
    }
  };

  return { printPage, sharePage, shareStatus };
}
