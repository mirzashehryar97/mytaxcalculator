interface SurchargeIncludedNoteProps {
  amount: string;
  monthly?: boolean;
}

export default function SurchargeIncludedNote({
  amount,
  monthly = false,
}: SurchargeIncludedNoteProps) {
  return (
    <p className="amount-wrap mt-1 text-gray-500 text-xs tabular-nums">
      Includes {amount}
      {monthly ? ' monthly' : ''} surcharge
    </p>
  );
}
