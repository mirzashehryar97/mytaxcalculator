import { forwardRef } from 'react';

import type { LucideProps } from 'lucide-react';

const GuideDeductionsIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      <path d="M9 4h29l13 13v18" />
      <path d="M38 4v13h13" />
      <path d="M9 4v53h25" />
      <path d="M18 24h17M18 33h12" />
      <circle cx="46" cy="47" r="12" />
      <path d="m41 53 10-12" />
      <circle cx="41" cy="42" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="51" cy="52" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
);

GuideDeductionsIcon.displayName = 'GuideDeductionsIcon';

export default GuideDeductionsIcon;
