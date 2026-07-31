interface CapitalGainsWorkingNoteProps {
  title: string;
  body: string;
  /** Optional second line, e.g. the caveat about who works out the official figure. */
  footnote?: string;
}

/** Spells out, in a sentence, how the figure above it was arrived at. */
export default function CapitalGainsWorkingNote({
  title,
  body,
  footnote,
}: CapitalGainsWorkingNoteProps) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
      <h3 className="font-semibold text-emerald-900 text-sm">{title}</h3>
      <p className="mt-2 text-emerald-950/80 text-sm leading-relaxed">{body}</p>
      {footnote ? (
        <p className="mt-3 border-emerald-200/70 border-t pt-3 text-emerald-950/65 text-xs leading-relaxed">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
