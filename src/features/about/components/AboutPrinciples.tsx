import AboutPrincipleCard from '@/features/about/components/AboutPrincipleCard';
import AboutSection from '@/features/about/components/AboutSection';
import { ABOUT_PRINCIPLES, ABOUT_PRINCIPLES_TITLE } from '@/features/about/lib/content';

export default function AboutPrinciples() {
  return (
    <AboutSection className="bg-white" labelledBy="about-principles-heading">
      <h2
        id="about-principles-heading"
        className="font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl"
      >
        {ABOUT_PRINCIPLES_TITLE}
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        {ABOUT_PRINCIPLES.map((principle) => (
          <AboutPrincipleCard key={principle.id} principle={principle} />
        ))}
      </div>
    </AboutSection>
  );
}
