import { ShieldAlert } from 'lucide-react';

interface VehicleUnratedNoticeProps {
  title: string;
  body: string;
}

/** Shown when the law sets no charge for the combination the reader picked. */
export default function VehicleUnratedNotice({ title, body }: VehicleUnratedNoticeProps) {
  return (
    <p className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950 text-sm leading-relaxed">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
      <span>
        <strong className="block font-bold text-base">{title}</strong>
        <span className="mt-1 block">{body}</span>
      </span>
    </p>
  );
}
