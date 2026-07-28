import { forwardRef } from 'react';

import type { LucideProps } from 'lucide-react';

const GuideFilingIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 64, strokeWidth = 3.5, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="10" y="10" width="44" height="49" rx="4" />
      <path d="M23 10V5h18v5" />
      <path d="m18 26 4 4 7-8" />
      <path d="M35 27h11" />
      <path d="m18 41 4 4 7-8" />
      <path d="M35 42h11" />
    </svg>
  ),
);

GuideFilingIcon.displayName = 'GuideFilingIcon';

export default GuideFilingIcon;
