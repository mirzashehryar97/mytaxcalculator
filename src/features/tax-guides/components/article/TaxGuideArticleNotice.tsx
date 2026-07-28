import { AlertCircle } from 'lucide-react';

interface TaxGuideArticleNoticeProps {
  children: React.ReactNode;
  tone?: 'amber' | 'emerald' | 'blue';
  title?: string;
}

const toneClasses = {
  amber: 'border-amber-300 bg-amber-50 text-amber-950',
  emerald: 'border-emerald-300 bg-emerald-50 text-emerald-950',
  blue: 'border-blue-300 bg-blue-50 text-blue-950',
} as const;

export default function TaxGuideArticleNotice({
  children,
  tone = 'amber',
  title,
}: TaxGuideArticleNoticeProps) {
  return (
    <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${toneClasses[tone]}`}>
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        {title ? <h3 className="font-bold text-base">{title}</h3> : null}
        <p className={`${title ? 'mt-1' : ''} text-sm leading-5 sm:text-[15px]`}>{children}</p>
      </div>
    </div>
  );
}
