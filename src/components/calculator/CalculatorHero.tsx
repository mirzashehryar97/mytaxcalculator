import { Sparkles } from 'lucide-react';

interface CalculatorHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function CalculatorHero({ eyebrow, title, subtitle }: CalculatorHeroProps) {
  return (
    <header className="mx-auto mb-8 max-w-4xl animate-fade-up text-center sm:mb-10">
      <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-emerald-100 text-sm backdrop-blur-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
        {eyebrow}
      </span>
      <h1 className="mt-5 text-balance font-bold text-4xl text-white leading-snug tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-emerald-50/80 text-lg leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
}
