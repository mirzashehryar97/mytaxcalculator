import type { BudgetSector } from '@/lib/budgetSectors';
import { impactBadgeClass } from '@/lib/budgetSectors';

export default function BudgetSectorSection({ sector }: { sector: BudgetSector }) {
  return (
    <section id={sector.id} aria-labelledby={`${sector.id}-heading`} className="scroll-mt-24">
      <h2 id={`${sector.id}-heading`} className="mb-3 font-bold text-2xl text-gray-900">
        {sector.title}
      </h2>
      <p className="mb-5 text-gray-600 leading-relaxed">{sector.summary}</p>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="bg-emerald-50 text-emerald-900">
              <th scope="col" className="w-[28%] px-4 py-3 font-semibold">
                Measure
              </th>
              <th scope="col" className="w-[28%] px-4 py-3 font-semibold">
                FY 2025-26
              </th>
              <th scope="col" className="w-[28%] px-4 py-3 font-semibold">
                FY 2026-27 (proposed)
              </th>
              <th scope="col" className="w-[16%] px-4 py-3 font-semibold">
                Impact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sector.rows.map((row) => (
              <tr key={row.measure} className="even:bg-gray-50/60">
                <td className="px-4 py-3 font-medium text-gray-900">{row.measure}</td>
                <td className="px-4 py-3 text-gray-700">{row.fy2025_26}</td>
                <td className="px-4 py-3 text-gray-900">{row.fy2026_27}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 font-medium text-xs ${impactBadgeClass(row.impact)}`}
                  >
                    {row.impactLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sector.notes && sector.notes.length > 0 && (
        <ul className="mt-4 space-y-2 text-gray-600 text-sm">
          {sector.notes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-emerald-600" aria-hidden="true">
                •
              </span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
