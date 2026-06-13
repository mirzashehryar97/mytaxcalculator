import type { ReactNode } from 'react';

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group hover:-translate-y-1 rounded-2xl border border-white/60 bg-white p-6 shadow-emerald-950/10 shadow-lg transition-all duration-200 hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 font-bold text-gray-900 text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
