'use client';

import { useEffect, useState } from 'react';

/** Matches Tailwind's `sm` breakpoint: true below 640px. */
const COMPACT_QUERY = '(max-width: 639px)';

/**
 * Tracks whether the viewport is phone-sized, so the results can swap a chart
 * for the layout that actually reads well at that width instead of squeezing
 * the same one. Starts false and settles after mount, which is safe here
 * because results only ever render after the user calculates.
 */
export default function useIsCompactViewport(): boolean {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(COMPACT_QUERY);
    const update = (event: MediaQueryList | MediaQueryListEvent) => setIsCompact(event.matches);

    update(media);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isCompact;
}
