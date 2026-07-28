interface TaxGuideArticleSectionGroupProps {
  children: React.ReactNode;
  presentation?: 'bordered' | 'plain';
}

export default function TaxGuideArticleSectionGroup({
  children,
  presentation = 'bordered',
}: TaxGuideArticleSectionGroupProps) {
  if (presentation === 'plain') {
    return <div className="space-y-8 lg:space-y-9">{children}</div>;
  }

  return (
    <div className="space-y-10 lg:space-y-12 [&>section]:rounded-xl [&>section]:border-[#b8c8c1] [&>section]:border-[1.5px] [&>section]:bg-white [&>section]:p-5 [&>section]:shadow-sm sm:[&>section]:p-6">
      {children}
    </div>
  );
}
