import type { GlobalConfig } from "payload";
import { revalidateEverything } from "../hooks/revalidate";

export const Settings: GlobalConfig = {
  slug: "settings",
  access: { read: () => true },
  hooks: { afterChange: [revalidateEverything] },
  fields: [
    { name: "siteName", type: "text", defaultValue: "Amir Seraj" },
    { name: "siteUrl", type: "text", defaultValue: "https://amirseraj.ir" },
    { name: "defaultDescription", type: "textarea" },
    { name: "defaultOgImage", type: "text", defaultValue: "/images/banner.jpg" },
    { name: "email", type: "email", defaultValue: "amirseraj.ir@gmail.com" },
    { name: "twitterHandle", type: "text", defaultValue: "@amirseraj" },
  ],
};
