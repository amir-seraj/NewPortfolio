// Compact admin brand mark for Payload's `graphics.Icon` slot (the small
// breadcrumb icon in the nav header — rendered at ~16px, see
// `.step-nav__home` in @payloadcms/ui). An SVG (not HTML text) so it stays
// crisp at that size; mirrors the `<Amir/>` wordmark used in AdminLogo.tsx
// condensed to its initial.
//
// `fill` prop matches the default PayloadIcon's contract (@payloadcms/ui
// graphics/Icon) so it keeps working if Payload ever passes a color through.
export const AdminIcon = ({ fill }: { fill?: string } = {}) => (
  <svg
    className="graphic-icon"
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="50"
      y="66"
      textAnchor="middle"
      fontFamily="ui-monospace, 'SF Mono', 'Menlo', 'Consolas', monospace"
      fontSize="52"
      fontWeight={600}
      fill={fill || "var(--theme-elevation-1000)"}
    >
      {"<A/>"}
    </text>
  </svg>
);
