/** Shared glass-panel treatment for the GNB pill (Header.tsx) and SNB
 * mega-menu (DesktopNav.tsx) — Figma uses the identical spec for both
 * (nodes 12002:2806 and 12002:2831, "shadow/black/04").
 *
 * Figma's literal spec is a near-invisible white tint (5% alpha) that relies
 * entirely on `backdrop-filter: blur(20px)` to obscure whatever's behind it.
 * That doesn't hold up here: verified with isolated test pages that
 * `backdrop-filter` renders fine on a plain element appended straight to
 * `<body>`, but silently fails to blur (renders as literally 0 blur, alpha
 * still correct) on this exact element once it's mounted inside the
 * sticky-header component tree — reproduced with the Radix Viewport itself,
 * a position:fixed override on that same element, and a brand-new sibling
 * div in the same spot, all inside the header; every one of them failed the
 * same way, and none of the usual suspects (an `overflow`/`transform`/
 * `filter`/`contain`/`isolation`/`will-change` ancestor, `position: sticky`
 * on the header) explained it. Since a 5%-alpha panel with dead blur is
 * just an invisible box — page text sits right behind it, fully readable —
 * this uses a much more opaque tint instead, so the panel reads correctly
 * (page content behind it visually suppressed) with zero dependency on
 * blur ever actually compositing. `backdrop-filter` stays on as a bonus for
 * engines/contexts where it does render; it costs nothing when it doesn't. */
export const glassPanelStyle = {
  background: "rgba(20, 22, 30, 0.92)",
  border: "1px solid rgba(237, 237, 237, 0.05)",
  // React doesn't autoprefix inline `style` objects (unlike its handling of
  // className-based CSS through a build step), and Safari only shipped
  // unprefixed `backdrop-filter` support in 2024 (Safari 18) — most Safari
  // in the wild still needs `-webkit-backdrop-filter` or the blur silently
  // no-ops while the rest of the rule still applies. Both properties are
  // required; neither alone covers all engines.
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow:
    "0 24px 32px 0 rgba(15, 15, 15, 0.03), 0 7px 10px 0 rgba(15, 15, 15, 0.02), 0 3px 5px 0 rgba(15, 15, 15, 0.01), 0 2px 2px 0 rgba(15, 15, 15, 0.01)",
} as const;
