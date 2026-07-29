import AboutSection from '@/features/about/components/AboutSection';
import AboutStoryCard from '@/features/about/components/AboutStoryCard';
import { ABOUT_STORY_CARDS, ABOUT_STORY_COPY } from '@/features/about/lib/content';

export default function AboutStory() {
  return (
    <AboutSection className="bg-[#fafaf8]" labelledBy="about-story-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div>
          <h2
            id="about-story-heading"
            className="font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl"
          >
            {ABOUT_STORY_COPY.title}
          </h2>
          <p className="mt-5 max-w-md font-semibold text-emerald-700 text-lg leading-relaxed sm:text-xl">
            {ABOUT_STORY_COPY.lead}
          </p>
          <p className="mt-6 max-w-lg text-[15px] text-slate-600 leading-relaxed">
            {ABOUT_STORY_COPY.body}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {ABOUT_STORY_CARDS.map((card) => (
            <AboutStoryCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
