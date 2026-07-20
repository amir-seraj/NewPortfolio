import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig, {
  isKeystaticAvailable,
} from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config: keystaticConfig });

const unavailable = () =>
  new Response(
    "The content studio is not configured. Add the Keystatic GitHub App environment variables to enable it.",
    { status: 503 }
  );

export const GET = isKeystaticAvailable ? handler.GET : unavailable;
export const POST = isKeystaticAvailable ? handler.POST : unavailable;
