import { AlertTriangle } from 'lucide-react';

interface MultiYearValidationAlertProps {
  message: string;
}

export default function MultiYearValidationAlert({ message }: MultiYearValidationAlertProps) {
  return (
    <div
      className="flex animate-fade-in items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700"
      role="alert"
    >
      <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
