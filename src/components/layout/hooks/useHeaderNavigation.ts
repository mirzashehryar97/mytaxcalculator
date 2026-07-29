'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

export default function useHeaderNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Close the drawer on navigation (covers browser back/forward too).
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // While the drawer is open: lock the page behind it and close on Escape.
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return {
    pathname,
    isMobileMenuOpen,
    toggleMobileMenu: () => setIsMobileMenuOpen((open) => !open),
    closeMobileMenu,
  };
}
