import TaxGuideArticleHero from '@/features/tax-guides/components/article/TaxGuideArticleHero';
import TaxGuideArticleSectionGroup from '@/features/tax-guides/components/article/TaxGuideArticleSectionGroup';
import TaxGuideArticleSidebar from '@/features/tax-guides/components/article/TaxGuideArticleSidebar';
import TaxGuideArticleTakeaways from '@/features/tax-guides/components/article/TaxGuideArticleTakeaways';
import type {
  TaxGuideArticleHeroContent,
  TaxGuideArticleSource,
  TaxGuideArticleTocItem,
  TaxGuideArticleTool,
} from '@/features/tax-guides/types';

interface TaxGuideArticleLayoutProps {
  hero: TaxGuideArticleHeroContent;
  toc: readonly TaxGuideArticleTocItem[];
  tools: readonly TaxGuideArticleTool[];
  sources: readonly TaxGuideArticleSource[];
  takeaways?: readonly string[];
  children: React.ReactNode;
  wideChildren?: React.ReactNode;
  leadContent?: React.ReactNode;
  sidebarExtraContent?: React.ReactNode;
  sidebarFooterContent?: React.ReactNode;
  sectionPresentation?: 'bordered' | 'plain';
  printLabel?: string;
  toolsTitle?: string;
}

export default function TaxGuideArticleLayout({
  hero,
  toc,
  tools,
  sources,
  takeaways,
  children,
  wideChildren,
  leadContent,
  sidebarExtraContent,
  sidebarFooterContent,
  sectionPresentation = 'bordered',
  printLabel,
  toolsTitle,
}: TaxGuideArticleLayoutProps) {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <article className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_228px] lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-6">
        <div className="min-w-0 md:col-start-1 md:row-start-1">
          <TaxGuideArticleHero content={hero} printLabel={printLabel} />
        </div>

        <div className="md:col-start-2 md:row-span-2 md:row-start-1">
          <TaxGuideArticleSidebar
            toc={toc}
            tools={tools}
            sources={sources}
            toolsTitle={toolsTitle}
            extraContent={sidebarExtraContent}
            footerContent={sidebarFooterContent}
          />
        </div>
        <div
          className={`min-w-0 md:col-start-1 md:row-start-2 ${
            sectionPresentation === 'plain' ? 'space-y-6 lg:space-y-7' : 'space-y-10 lg:space-y-12'
          }`}
        >
          {leadContent ?? (takeaways ? <TaxGuideArticleTakeaways items={takeaways} /> : null)}
          <TaxGuideArticleSectionGroup presentation={sectionPresentation}>
            {children}
          </TaxGuideArticleSectionGroup>
        </div>
        {wideChildren ? (
          <div className="min-w-0 md:col-span-2 md:row-start-3">
            <TaxGuideArticleSectionGroup presentation={sectionPresentation}>
              {wideChildren}
            </TaxGuideArticleSectionGroup>
          </div>
        ) : null}
      </article>
    </div>
  );
}
