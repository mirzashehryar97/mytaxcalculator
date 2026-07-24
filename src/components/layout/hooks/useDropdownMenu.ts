'use client';

import { useEffect, useRef, useState } from 'react';

export default function useDropdownMenu(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return {
    isOpen,
    containerRef,
    toggle: () => setIsOpen((open) => !open),
    close: () => setIsOpen(false),
  };
}
