import { forwardRef } from 'react';

import type { LucideProps } from 'lucide-react';

const GuideUnderstandingIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 64, strokeWidth = 3.8, ...props }, ref) => (
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
      <path d="M4 9h19c5 0 9 4 9 9v39c0-5-4-9-9-9H4V9Z" />
      <path d="M60 9H41c-5 0-9 4-9 9v39c0-5 4-9 9-9h19V9Z" />
      <path d="M32 57v3" />
    </svg>
  ),
);

GuideUnderstandingIcon.displayName = 'GuideUnderstandingIcon';

export default GuideUnderstandingIcon;
