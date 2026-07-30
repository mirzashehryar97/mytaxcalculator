import SegmentedControl from '@/components/calculator/SegmentedControl';

import { PROPERTY_STATUS_OPTIONS } from '@/features/property-tax/lib/content';
import type { PropertyFilerStatus } from '@/features/property-tax/types';

interface PropertyStatusToggleProps {
  label: string;
  status: PropertyFilerStatus;
  /** Drives whether the middle tier is offered at all — it is year-dependent. */
  hasLateFilerTier: boolean;
  onChange: (status: PropertyFilerStatus) => void;
  helpText?: string;
}

/**
 * Filer status control that grows a third option only in the years whose Tenth
 * Schedule still had rule 1A. Every other year collapses to filer / non-filer.
 */
export default function PropertyStatusToggle({
  label,
  status,
  hasLateFilerTier,
  onChange,
  helpText,
}: PropertyStatusToggleProps) {
  const options = PROPERTY_STATUS_OPTIONS.filter(
    (option) => hasLateFilerTier || option.value !== 'late-filer',
  );

  return (
    <SegmentedControl
      label={label}
      name="property-filer-status"
      options={options}
      value={status}
      onChange={onChange}
      helpText={helpText}
    />
  );
}
