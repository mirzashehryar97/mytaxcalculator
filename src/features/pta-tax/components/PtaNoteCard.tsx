import { AlertTriangle, Info, Scale } from 'lucide-react';

type PtaNoteTone = 'info' | 'warning' | 'neutral';

const TONE_STYLE: Record<PtaNoteTone, { box: string; title: string; body: string; icon: string }> =
  {
    info: {
      box: 'border-blue-200 bg-blue-50',
      title: 'text-blue-900',
      body: 'text-blue-900/80',
      icon: 'text-blue-600',
    },
    warning: {
      box: 'border-amber-200 bg-amber-50',
      title: 'text-amber-900',
      body: 'text-amber-900/80',
      icon: 'text-amber-600',
    },
    neutral: {
      box: 'border-gray-200 bg-gray-50',
      title: 'text-gray-900',
      body: 'text-gray-600',
      icon: 'text-gray-500',
    },
  };

const TONE_ICON: Record<PtaNoteTone, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  neutral: Scale,
};

interface PtaNoteCardProps {
  title: string;
  body: string;
  tone?: PtaNoteTone;
}

/** A caveat the page states out loud rather than burying — see CLAUDE.md. */
export default function PtaNoteCard({ title, body, tone = 'neutral' }: PtaNoteCardProps) {
  const style = TONE_STYLE[tone];
  const Icon = TONE_ICON[tone];

  return (
    <div className={`rounded-2xl border p-4 ${style.box}`}>
      <h3 className={`flex items-start gap-2 font-semibold text-sm ${style.title}`}>
        <Icon aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${style.icon}`} />
        {title}
      </h3>
      <p className={`mt-2 text-xs leading-relaxed ${style.body}`}>{body}</p>
    </div>
  );
}
