import { Car } from 'lucide-react';

interface VehicleAwaitingInputProps {
  title: string;
  body: string;
  /** The specific answer we are still waiting for. */
  missing: string;
}

/**
 * Stands in for the result while an answer the figure depends on is missing.
 * Every rate band starts at 0 cc, so without this a blank engine size lands in
 * the smallest band and prints a complete, confident bill.
 */
export default function VehicleAwaitingInput({ title, body, missing }: VehicleAwaitingInputProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-gray-200 border-dashed bg-gray-50 p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
        <Car className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-bold text-gray-900 text-lg">{title}</h2>
      <p className="mt-2 max-w-sm text-gray-600 text-sm leading-relaxed">{missing}</p>
      <p className="mt-3 max-w-sm text-gray-500 text-xs leading-relaxed">{body}</p>
    </div>
  );
}
