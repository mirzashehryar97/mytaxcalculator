'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

export default function useHeaderNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return {
    pathname,
    isMobileMenuOpen,
    toggleMobileMenu: () => setIsMobileMenuOpen((open) => !open),
    closeMobileMenu: () => setIsMobileMenuOpen(false),
  };
}
