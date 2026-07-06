import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Tags } from "./cms/collections/Tags";
import { Posts } from "./cms/collections/Posts";
import { Projects } from "./cms/collections/Projects";
import { Home } from "./cms/globals/Home";
import { Settings } from "./cms/globals/Settings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " · Amir Seraj Admin",
      description: "Content admin for amirseraj.ir — projects, posts, and site settings.",
      icons: [{ type: "image/png", url: "/favicon/icon.png" }],
    },
    components: {
      graphics: {
        Logo: "/cms/components/AdminLogo#AdminLogo",
        Icon: "/cms/components/AdminIcon#AdminIcon",
      },
    },
  },
  collections: [Users, Media, Tags, Posts, Projects],
  globals: [Home, Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
