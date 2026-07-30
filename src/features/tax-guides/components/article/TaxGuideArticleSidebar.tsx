import TaxGuideArticleSources from '@/features/tax-guides/components/article/TaxGuideArticleSources';
import TaxGuideArticleTableOfContents from '@/features/tax-guides/components/article/TaxGuideArticleTableOfContents';
import TaxGuideArticleTools from '@/features/tax-guides/components/article/TaxGuideArticleTools';
import type {
  TaxGuideArticleSource,
  TaxGuideArticleTocItem,
  TaxGuideArticleTool,
} from '@/features/tax-guides/types';

interface TaxGuideArticleSidebarProps {
  toc: readonly TaxGuideArticleTocItem[];
  tools: readonly TaxGuideArticleTool[];
  sources: readonly TaxGuideArticleSource[];
  toolsTitle?: string;
  extraContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function TaxGuideArticleSidebar({
  toc,
  tools,
  sources,
  toolsTitle,
  extraContent,
  footerContent,
}: TaxGuideArticleSidebarProps) {
  return (
    <aside className="no-scrollbar hidden space-y-4 md:sticky md:top-24 md:block md:max-h-[calc(100dvh-7rem)] md:overflow-y-auto">
      <TaxGuideArticleTableOfContents items={toc} />
      {extraContent}
      {tools.length > 0 ? <TaxGuideArticleTools title={toolsTitle} tools={tools} /> : null}
      {sources.length > 0 ? <TaxGuideArticleSources sources={sources} /> : null}
      {footerContent}
    </aside>
  );
}
