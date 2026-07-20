import { notFound } from "next/navigation";

// Catch-all for URLs that match no real route. Without it, only notFound()
// calls from inside the (site) group (unknown blog/project slugs) reach the
// branded app/(site)/not-found.tsx — a stray URL like /nope rendered Next's
// unstyled built-in 404 instead (route groups have no root-level layout to
// hang a root not-found on). Explicit routes — including Keystatic's /admin
// redirect and /api routes — always win, so nothing is shadowed.
export default function CatchAllNotFound(): never {
  notFound();
}
