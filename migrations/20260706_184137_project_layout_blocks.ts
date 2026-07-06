import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_blocks_result_banner_tone" AS ENUM('mango', 'mango-deep', 'green', 'indigo', 'orange', 'blue', 'purple');
  CREATE TYPE "public"."enum_projects_blocks_section_heading_level" AS ENUM('h2', 'h3');
  CREATE TYPE "public"."enum_projects_blocks_callout_tone" AS ENUM('info', 'success', 'warning', 'neutral');
  CREATE TYPE "public"."enum_projects_blocks_iteration_card_columns" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_projects_blocks_image_grid_columns" AS ENUM('1', '2', '3');
  CREATE TABLE "projects_blocks_result_banner_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_result_banner_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_result_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"tone" "enum_projects_blocks_result_banner_tone" DEFAULT 'mango',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_section_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"level" "enum_projects_blocks_section_heading_level" DEFAULT 'h2',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_projects_blocks_callout_tone" DEFAULT 'info',
  	"heading" varchar,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_iteration_card_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_iteration_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb,
  	"columns" "enum_projects_blocks_iteration_card_columns" DEFAULT '2',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_image_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_image_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_projects_blocks_image_grid_columns" DEFAULT '2',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_code_snippet" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar,
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_raw_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "projects" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "projects_blocks_result_banner_paragraphs" ADD CONSTRAINT "projects_blocks_result_banner_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_result_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_result_banner_chips" ADD CONSTRAINT "projects_blocks_result_banner_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_result_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_result_banner" ADD CONSTRAINT "projects_blocks_result_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_section_heading" ADD CONSTRAINT "projects_blocks_section_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_body" ADD CONSTRAINT "projects_blocks_rich_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_callout" ADD CONSTRAINT "projects_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_iteration_card_images" ADD CONSTRAINT "projects_blocks_iteration_card_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_iteration_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_iteration_card" ADD CONSTRAINT "projects_blocks_iteration_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_grid_images" ADD CONSTRAINT "projects_blocks_image_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_image_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_grid" ADD CONSTRAINT "projects_blocks_image_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_code_snippet" ADD CONSTRAINT "projects_blocks_code_snippet_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_raw_html" ADD CONSTRAINT "projects_blocks_raw_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_blocks_result_banner_paragraphs_order_idx" ON "projects_blocks_result_banner_paragraphs" USING btree ("_order");
  CREATE INDEX "projects_blocks_result_banner_paragraphs_parent_id_idx" ON "projects_blocks_result_banner_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_result_banner_chips_order_idx" ON "projects_blocks_result_banner_chips" USING btree ("_order");
  CREATE INDEX "projects_blocks_result_banner_chips_parent_id_idx" ON "projects_blocks_result_banner_chips" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_result_banner_order_idx" ON "projects_blocks_result_banner" USING btree ("_order");
  CREATE INDEX "projects_blocks_result_banner_parent_id_idx" ON "projects_blocks_result_banner" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_result_banner_path_idx" ON "projects_blocks_result_banner" USING btree ("_path");
  CREATE INDEX "projects_blocks_section_heading_order_idx" ON "projects_blocks_section_heading" USING btree ("_order");
  CREATE INDEX "projects_blocks_section_heading_parent_id_idx" ON "projects_blocks_section_heading" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_section_heading_path_idx" ON "projects_blocks_section_heading" USING btree ("_path");
  CREATE INDEX "projects_blocks_rich_body_order_idx" ON "projects_blocks_rich_body" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_body_parent_id_idx" ON "projects_blocks_rich_body" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_body_path_idx" ON "projects_blocks_rich_body" USING btree ("_path");
  CREATE INDEX "projects_blocks_callout_order_idx" ON "projects_blocks_callout" USING btree ("_order");
  CREATE INDEX "projects_blocks_callout_parent_id_idx" ON "projects_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_callout_path_idx" ON "projects_blocks_callout" USING btree ("_path");
  CREATE INDEX "projects_blocks_iteration_card_images_order_idx" ON "projects_blocks_iteration_card_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_iteration_card_images_parent_id_idx" ON "projects_blocks_iteration_card_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_iteration_card_order_idx" ON "projects_blocks_iteration_card" USING btree ("_order");
  CREATE INDEX "projects_blocks_iteration_card_parent_id_idx" ON "projects_blocks_iteration_card" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_iteration_card_path_idx" ON "projects_blocks_iteration_card" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_grid_images_order_idx" ON "projects_blocks_image_grid_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_grid_images_parent_id_idx" ON "projects_blocks_image_grid_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_grid_order_idx" ON "projects_blocks_image_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_grid_parent_id_idx" ON "projects_blocks_image_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_grid_path_idx" ON "projects_blocks_image_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_code_snippet_order_idx" ON "projects_blocks_code_snippet" USING btree ("_order");
  CREATE INDEX "projects_blocks_code_snippet_parent_id_idx" ON "projects_blocks_code_snippet" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_code_snippet_path_idx" ON "projects_blocks_code_snippet" USING btree ("_path");
  CREATE INDEX "projects_blocks_raw_html_order_idx" ON "projects_blocks_raw_html" USING btree ("_order");
  CREATE INDEX "projects_blocks_raw_html_parent_id_idx" ON "projects_blocks_raw_html" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_raw_html_path_idx" ON "projects_blocks_raw_html" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_blocks_result_banner_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_result_banner_chips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_result_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_section_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_rich_body" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_iteration_card_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_iteration_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_image_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_image_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_code_snippet" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_raw_html" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "projects_blocks_result_banner_paragraphs" CASCADE;
  DROP TABLE "projects_blocks_result_banner_chips" CASCADE;
  DROP TABLE "projects_blocks_result_banner" CASCADE;
  DROP TABLE "projects_blocks_section_heading" CASCADE;
  DROP TABLE "projects_blocks_rich_body" CASCADE;
  DROP TABLE "projects_blocks_callout" CASCADE;
  DROP TABLE "projects_blocks_iteration_card_images" CASCADE;
  DROP TABLE "projects_blocks_iteration_card" CASCADE;
  DROP TABLE "projects_blocks_image_grid_images" CASCADE;
  DROP TABLE "projects_blocks_image_grid" CASCADE;
  DROP TABLE "projects_blocks_code_snippet" CASCADE;
  DROP TABLE "projects_blocks_raw_html" CASCADE;
  ALTER TABLE "projects" ALTER COLUMN "body" SET NOT NULL;
  DROP TYPE "public"."enum_projects_blocks_result_banner_tone";
  DROP TYPE "public"."enum_projects_blocks_section_heading_level";
  DROP TYPE "public"."enum_projects_blocks_callout_tone";
  DROP TYPE "public"."enum_projects_blocks_iteration_card_columns";
  DROP TYPE "public"."enum_projects_blocks_image_grid_columns";`)
}
