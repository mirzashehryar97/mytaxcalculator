/**
 * Resolving which website an embedded calculator is running inside.
 *
 * Two signals, in order of reliability:
 *
 * 1. `location.ancestorOrigins` — the frame chain, ordered immediate-parent first and top-level
 *    page last. Chromium and WebKit only, but it survives an `<iframe referrerpolicy="no-referrer">`
 *    and tells us the *outermost* page rather than whoever framed us directly.
 * 2. `document.referrer` — Firefox's fallback. Under the default
 *    `strict-origin-when-cross-origin` policy a cross-origin referrer is already trimmed to the
 *    origin, which is exactly the granularity we want: the site, not the page.
 *
 * Both can come back empty (sandboxed frames report an opaque `"null"` origin, and a publisher can
 * suppress the referrer outright), so callers must handle `null`.
 */

function toHostname(value: string): string | null {
  if (!value) {
    return null;
  }

  try {
    const { hostname, protocol } = new URL(value);
    // Opaque origins parse as `null`, and only real web pages are worth counting.
    if (protocol !== 'http:' && protocol !== 'https:') {
      return null;
    }
    return hostname || null;
  } catch {
    return null;
  }
}

export function resolveEmbedHost(
  ancestorOrigins: readonly string[],
  referrer: string,
): string | null {
  return toHostname(ancestorOrigins.at(-1) ?? '') ?? toHostname(referrer);
}
