interface BudgetSectionHeadingProps {
  id: string;
  children: React.ReactNode;
}

export default function BudgetSectionHeading({ id, children }: BudgetSectionHeadingProps) {
  return (
    <h2 id={id} className="mb-5 font-bold text-2xl text-[#0b1736] tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}
