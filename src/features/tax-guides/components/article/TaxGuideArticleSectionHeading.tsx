interface TaxGuideArticleSectionHeadingProps {
  id: string;
  number: number;
  children: React.ReactNode;
}

export default function TaxGuideArticleSectionHeading({
  id,
  number,
  children,
}: TaxGuideArticleSectionHeadingProps) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 font-bold text-[#0b1736] text-xl leading-tight tracking-tight sm:text-[1.4rem]"
    >
      <span aria-hidden="true">{number}. </span>
      {children}
    </h2>
  );
}
