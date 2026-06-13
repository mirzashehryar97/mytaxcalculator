import type { ReactNode } from 'react';

export default function GuideCard({
  children,
  color = 'emerald',
}: {
  children: ReactNode;
  color?: 'emerald' | 'amber' | 'blue';
}) {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-800',
    blue: 'bg-blue-50 text-blue-800',
  };
  return (
    <div className={`my-6 flex items-start rounded-lg p-6 ${colorMap[color]}`}>{children}</div>
  );
}
