export type DropdownPlacement = 'above' | 'below';

/** Tallest a full option list gets: the list's own max height plus padding and border. */
const MAX_DROPDOWN_HEIGHT = 240;

/**
 * Opens the list downwards unless the trigger sits too close to the bottom of
 * the screen to show it, in which case it flips above the trigger.
 */
export function getDropdownPlacement(
  triggerRect: DOMRect,
  viewportHeight: number,
): DropdownPlacement {
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;

  return spaceBelow < MAX_DROPDOWN_HEIGHT && spaceAbove > spaceBelow ? 'above' : 'below';
}
