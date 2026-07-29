import AboutProcessStep from '@/features/about/components/AboutProcessStep';
import AboutSection from '@/features/about/components/AboutSection';
import { ABOUT_PROCESS_STEPS, ABOUT_PROCESS_TITLE } from '@/features/about/lib/content';

export default function AboutProcess() {
  return (
    <AboutSection className="bg-white" labelledBy="about-process-heading">
      <h2
        id="about-process-heading"
        className="text-balance text-center font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl"
      >
        {ABOUT_PROCESS_TITLE}
      </h2>

      <ol className="mx-auto mt-10 grid max-w-5xl gap-10 sm:grid-cols-3 sm:gap-6 lg:mt-12">
        {ABOUT_PROCESS_STEPS.map((step, index) => (
          <AboutProcessStep
            key={step.id}
            step={step}
            isFirst={index === 0}
            isLast={index === ABOUT_PROCESS_STEPS.length - 1}
          />
        ))}
      </ol>
    </AboutSection>
  );
}
