import { ChevronDown } from 'lucide-react';

import SlabsAnswer from './SlabsAnswer';

export default function FaqSlabsItem({ question }: { question: string }) {
  return (
    <details className="group rounded-2xl border border-white/60 bg-white/95 shadow-emerald-950/10 shadow-lg backdrop-blur-sm transition-all duration-200 open:shadow-xl open:ring-1 open:ring-emerald-100 hover:border-emerald-200">
      <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 p-5 font-semibold text-base text-gray-900 transition-colors group-open:text-emerald-700 group-hover:text-emerald-700 sm:p-6 sm:text-lg">
        <span>{question}</span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform duration-300 group-open:rotate-180">
          <ChevronDown className="h-5 w-5" />
        </span>
      </summary>
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="border-gray-100 border-t pt-4 text-gray-600 text-sm leading-relaxed sm:text-base">
          <SlabsAnswer />
        </div>
      </div>
    </details>
  );
}
