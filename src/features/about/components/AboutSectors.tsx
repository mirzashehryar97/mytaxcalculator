import AboutSection from '@/features/about/components/AboutSection';
import AboutSectorCard from '@/features/about/components/AboutSectorCard';
import {
  ABOUT_SECTORS,
  ABOUT_SECTORS_ANCHOR,
  ABOUT_SECTORS_COPY,
} from '@/features/about/lib/content';

export default function AboutSectors() {
  return (
    <AboutSection
      id={ABOUT_SECTORS_ANCHOR}
      className="scroll-mt-16 bg-[#f1f9f5]"
      labelledBy="about-sectors-heading"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.85fr)] lg:items-center lg:gap-12">
        <div>
          <h2
            id="about-sectors-heading"
            className="font-bold text-2xl text-slate-900 leading-snug tracking-tight sm:text-3xl"
          >
            {ABOUT_SECTORS_COPY.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-md text-[15px] text-slate-600 leading-relaxed">
            {ABOUT_SECTORS_COPY.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ABOUT_SECTORS.map((sector) => (
            <AboutSectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      </div>
    </AboutSection>
  );
}
