// Admin-only brand mark, rendered on the /admin login screen (Payload's
// `graphics.Logo` slot). Mirrors the site's `<Amir/>` code-voice wordmark
// (components/common/Logo/Logo.tsx) but sized up for the login card.
//
// Deliberately a plain server component: Payload's `RenderServerComponent`
// only forwards the request-scoped `serverProps` (payload, req, i18n, …) to
// components it detects as server components/functions — a 'use client'
// wrapper here would receive none of that and gains nothing, since the mark
// is static. Also keeps this out of the client bundle entirely.
//
// The admin panel doesn't load the site's Google fonts (Mont/Pop), so this
// uses a system monospace stack instead of font-mono from tailwind.config.
export const AdminLogo = () => (
  <div
    style={{
      width: 200,
      maxWidth: "100%",
      textAlign: "center",
      fontFamily:
        "ui-monospace, 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', monospace",
      fontSize: 36,
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 1,
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ color: "#F9B571" }}>{"<"}</span>
    <span style={{ color: "#F5F5F5" }}>Amir</span>
    <span style={{ color: "#F9B571" }}>{"/>"}</span>
  </div>
);
