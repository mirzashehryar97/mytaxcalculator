interface CapitalGainsFormulaStripProps {
  /** What the money coming in is called on this market. */
  proceedsLabel: string;
  /** What the money that went out is called. */
  costLabel: string;
}

/**
 * The two sums the page performs, spelled out. It exists to answer the single
 * most common misunderstanding — that the tax is charged on the whole sale rather
 * than on the profit. Wraps onto two lines on a narrow screen.
 */
export default function CapitalGainsFormulaStrip({
  proceedsLabel,
  costLabel,
}: CapitalGainsFormulaStripProps) {
  return (
    <section
      className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
      aria-labelledby="capital-gains-formula-heading"
    >
      <h3 id="capital-gains-formula-heading" className="font-bold text-gray-900 text-lg">
        How this is worked out
      </h3>

      <ol className="mt-4 space-y-3">
        <li className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-lg bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-800 ring-1 ring-emerald-200">
            Your profit
          </span>
          <span className="text-gray-400" aria-hidden="true">
            =
          </span>
          <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-gray-700 ring-1 ring-gray-200">
            {proceedsLabel}
          </span>
          <span className="text-gray-400" aria-hidden="true">
            −
          </span>
          <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-gray-700 ring-1 ring-gray-200">
            {costLabel}
          </span>
        </li>
        <li className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-lg bg-red-50 px-3 py-1.5 font-semibold text-red-700 ring-1 ring-red-200">
            Tax
          </span>
          <span className="text-gray-400" aria-hidden="true">
            =
          </span>
          <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-gray-700 ring-1 ring-gray-200">
            Your profit
          </span>
          <span className="text-gray-400" aria-hidden="true">
            ×
          </span>
          <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-gray-700 ring-1 ring-gray-200">
            Your rate
          </span>
        </li>
      </ol>

      <p className="mt-4 text-gray-500 text-sm leading-relaxed">
        The tax is never charged on the full sale amount — only on what you made above what you
        paid.
      </p>
    </section>
  );
}
