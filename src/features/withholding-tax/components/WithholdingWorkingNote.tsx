interface WithholdingWorkingNoteProps {
  title: string;
  body: string;
}

/** Spells out, in a sentence, how the figure above it was arrived at. */
export default function WithholdingWorkingNote({ title, body }: WithholdingWorkingNoteProps) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
      <h3 className="font-semibold text-emerald-900 text-sm">{title}</h3>
      <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
