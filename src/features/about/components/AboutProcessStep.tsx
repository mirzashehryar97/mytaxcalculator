import { getProcessRailClass } from '@/features/about/lib/presentation';
import type { AboutProcessStep as AboutProcessStepContent } from '@/features/about/types';

interface AboutProcessStepProps {
  step: AboutProcessStepContent;
  isFirst: boolean;
  isLast: boolean;
}

export default function AboutProcessStep({ step, isFirst, isLast }: AboutProcessStepProps) {
  return (
    <li className="flex flex-col items-center text-center">
      <div className="relative flex h-11 w-full items-center justify-center">
        <span className={getProcessRailClass(isFirst, isLast)} aria-hidden="true" />
        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#064e3b] font-bold text-sm text-white ring-[10px] ring-white">
          {step.step}
        </span>
      </div>

      <h3 className="mt-6 font-bold text-base text-slate-900 sm:text-lg">{step.title}</h3>
      <p className="mx-auto mt-3 max-w-[17rem] text-[15px] text-slate-600 leading-relaxed">
        {step.description}
      </p>
    </li>
  );
}
