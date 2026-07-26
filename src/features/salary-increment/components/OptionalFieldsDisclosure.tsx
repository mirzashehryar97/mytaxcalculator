import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface OptionalFieldsDisclosureProps {
  label: string;
  children: React.ReactNode;
}

export default function OptionalFieldsDisclosure({
  label,
  children,
}: OptionalFieldsDisclosureProps) {
  return (
    <details className="group rounded-2xl border border-gray-200 bg-gray-50/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 font-semibold text-gray-700 text-sm [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          {label}
        </span>
        <ChevronDown
          className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="border-gray-200 border-t p-5">{children}</div>
    </details>
  );
}
