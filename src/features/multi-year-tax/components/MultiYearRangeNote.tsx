import { Info } from 'lucide-react';

import { getMultiYearNotes } from '@/features/multi-year-tax/lib/presentation';

/** The three rules that shape every entry, kept in view above the periods. */
export default function MultiYearRangeNote() {
  const notes = getMultiYearNotes();

  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
      <ul className="flex flex-col gap-1.5 text-gray-600 text-sm">
        {notes.map((note) => (
          <li key={note.id}>
            <span className="font-semibold text-gray-900">{note.label}:</span> {note.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
