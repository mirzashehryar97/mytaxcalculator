import type { ReactNode } from 'react';

export default function SectionHeading({
  icon,
  children,
}: {
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mt-12 mb-4 flex items-center">
      {icon && <span className="mr-2 text-emerald-600">{icon}</span>}
      <h2 className="border-emerald-200 border-l-4 pl-3 font-bold text-2xl text-emerald-700 tracking-tight">
        {children}
      </h2>
    </div>
  );
}
