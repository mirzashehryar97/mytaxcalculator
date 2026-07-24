import { FILER_OPTIONS } from '@/components/calculator/options';
import SegmentedControl from '@/components/calculator/SegmentedControl';

interface FilerToggleProps {
  label: string;
  filer: boolean;
  onChange: (filer: boolean) => void;
  description?: string;
}

export default function FilerToggle({ label, filer, onChange, description }: FilerToggleProps) {
  return (
    <SegmentedControl
      label={label}
      name="filer-status"
      options={FILER_OPTIONS}
      value={filer ? 'filer' : 'non-filer'}
      onChange={(value) => onChange(value === 'filer')}
      helpText={description}
    />
  );
}
