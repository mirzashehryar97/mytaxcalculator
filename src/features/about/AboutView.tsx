import AboutCta from '@/features/about/components/AboutCta';
import AboutHero from '@/features/about/components/AboutHero';
import AboutPrinciples from '@/features/about/components/AboutPrinciples';
import AboutProcess from '@/features/about/components/AboutProcess';
import AboutSectors from '@/features/about/components/AboutSectors';
import AboutStory from '@/features/about/components/AboutStory';

export default function AboutView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-white text-slate-800">
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutSectors />
      <AboutProcess />
      <AboutCta />
    </div>
  );
}
