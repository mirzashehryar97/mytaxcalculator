/** Faint square grid drawn over dark emerald bands. */
export default function EmeraldGridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]"
      aria-hidden="true"
    />
  );
}
