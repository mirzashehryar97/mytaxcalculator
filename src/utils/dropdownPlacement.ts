export type DropdownPlacement = 'above' | 'below';

/** Tallest a plain option list gets: its own max height plus padding and border. */
const DEFAULT_PANEL_HEIGHT = 240;

/**
 * Opens a panel downwards unless the trigger sits too close to the bottom of the
 * screen to show it, in which case it flips above the trigger.
 */
export function getDropdownPlacement(
  triggerRect: DOMRect,
  viewportHeight: number,
  panelHeight: number = DEFAULT_PANEL_HEIGHT,
): DropdownPlacement {
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;

  return spaceBelow < panelHeight && spaceAbove > spaceBelow ? 'above' : 'below';
}
