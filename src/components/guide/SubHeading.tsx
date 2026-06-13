import type { ReactNode } from 'react';

export default function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 mb-2 font-semibold text-emerald-800 text-lg">{children}</h3>;
}
