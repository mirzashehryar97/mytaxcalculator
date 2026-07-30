import { Layers } from 'lucide-react';

interface VehicleWorkingNoteProps {
  title: string;
  body: string;
  /** Optional headline figure, e.g. the rate for the reader's band. */
  figure?: string;
}

/** The "how this was worked out" panel, shared by both vehicle calculators. */
export default function VehicleWorkingNote({ title, body, figure }: VehicleWorkingNoteProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
        {figure ? (
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 text-lg tabular-nums">
            <Layers className="h-4 w-4" aria-hidden="true" />
            {figure}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
