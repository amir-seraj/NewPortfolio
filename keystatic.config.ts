import { collection, config, fields, singleton } from "@keystatic/core";

export const isKeystaticGitHubMode =
  process.env.NODE_ENV === "production" &&
  Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG);

export const isKeystaticAvailable =
  process.env.NODE_ENV !== "production" || isKeystaticGitHubMode;

const requiredText = (label: string, multiline = false) =>
  fields.text({
    label,
    multiline,
    validation: { isRequired: true },
  });

const richTextOptions = (directory: string, publicPath: string) => ({
  bold: true,
  italic: true,
  strikethrough: true,
  code: true,
  heading: [2, 3, 4] as const,
  blockquote: true,
  orderedList: true,
  unorderedList: true,
  table: true,
  link: true,
  divider: true,
  codeBlock: true,
  image: {
    directory,
    publicPath,
    schema: {
      alt: fields.text({
        label: "Alternative text",
        validation: { isRequired: true },
      }),
      title: fields.text({ label: "Caption" }),
    },
  },
});

export default config({
  storage:
    isKeystaticGitHubMode
      ? { kind: "github", repo: "amir-seraj/NewPortfolio" }
      : { kind: "local" },
  ui: {
    brand: { name: "Amir Seraj — Content Studio" },
    navigation: {
      Writing: ["posts", "tags"],
      Portfolio: ["projects"],
      Site: ["home", "settings"],
    },
  },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*/",
      columns: ["title", "status", "publishedAt"],
      previewUrl: "/blog/{slug}",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true },
          },
          slug: { label: "URL slug" },
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ],
          defaultValue: "draft",
        }),
        publishedAt: fields.datetime({
          label: "Published at",
          defaultValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        coverAlt: fields.text({
          label: "Cover image alternative text",
          description:
            "Describe the image for readers using assistive technology.",
        }),
        tags: fields.multiRelationship({
          label: "Tags",
          collection: "tags",
        }),
        excerpt: requiredText("Excerpt", true),
        readingTime: fields.integer({
          label: "Reading time (minutes)",
          defaultValue: 3,
          validation: { isRequired: true, min: 1 },
        }),
        body: fields.markdoc({
          label: "Article",
          options: richTextOptions(
            "public/images/blog-content",
            "/images/blog-content/"
          ),
        }),
        seo: fields.object(
          {
            metaTitle: fields.text({ label: "Meta title" }),
            metaDescription: fields.text({
              label: "Meta description",
              multiline: true,
            }),
            ogImage: fields.image({
              label: "Social sharing image",
              directory: "public/images/blog-social",
              publicPath: "/images/blog-social/",
            }),
          },
          { label: "SEO" }
        ),
      },
    }),
    tags: collection({
      label: "Tags",
      slugField: "name",
      path: "content/tags/*",
      schema: {
        name: fields.slug({
          name: { label: "Name", validation: { isRequired: true } },
          slug: { label: "URL slug" },
        }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*/",
      columns: ["title", "publishedAt", "featured"],
      previewUrl: "/projects/{slug}",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
          slug: { label: "URL slug" },
        }),
        shortTitle: requiredText("Short display title"),
        kind: requiredText("Project type"),
        description: requiredText("Description", true),
        tags: fields.array(requiredText("Tag"), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: "Feature on homepage",
          defaultValue: false,
        }),
        featuredOrder: fields.integer({
          label: "Homepage order",
          defaultValue: 0,
          validation: { isRequired: true, min: 0 },
        }),
        publishedAt: fields.date({
          label: "Published date",
          validation: { isRequired: true },
        }),
        readTime: fields.integer({
          label: "Reading time (minutes)",
          defaultValue: 5,
          validation: { isRequired: true, min: 1 },
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
          validation: { isRequired: true },
        }),
        body: fields.markdoc({
          label: "Case study",
          options: richTextOptions(
            "public/images/project-content",
            "/images/project-content/"
          ),
        }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: "Homepage",
      path: "content/home",
      format: "json",
      previewUrl: "/",
      schema: {
        hero: fields.object(
          {
            lines: fields.array(
              fields.object({
                text: requiredText("Line"),
                accent: fields.checkbox({
                  label: "Use mango accent",
                  defaultValue: false,
                }),
              }),
              {
                label: "Headline lines",
                itemLabel: (props) => props.fields.text.value,
              }
            ),
            ctaLabel: requiredText("Button label"),
            ctaHref: requiredText("Button link"),
            strip: fields.array(requiredText("Topic"), {
              label: "Expertise strip",
              itemLabel: (props) => props.value,
            }),
          },
          { label: "Hero" }
        ),
        about: fields.object(
          {
            heading: requiredText("Heading"),
            paragraphs: fields.array(requiredText("Paragraph", true), {
              label: "Paragraphs",
              itemLabel: (props) => props.value,
            }),
            stats: fields.array(
              fields.object({
                value: fields.integer({
                  label: "Value",
                  validation: { isRequired: true },
                }),
                label: requiredText("Label"),
              }),
              {
                label: "Statistics",
                itemLabel: (props) => props.fields.label.value,
              }
            ),
          },
          { label: "About" }
        ),
        contactKicker: requiredText("Contact kicker"),
      },
    }),
    settings: singleton({
      label: "Site Settings",
      path: "content/settings",
      format: "json",
      schema: {
        siteName: requiredText("Site name"),
        siteUrl: fields.url({
          label: "Site URL",
          validation: { isRequired: true },
        }),
        defaultDescription: requiredText("Default description", true),
        defaultOgImage: requiredText("Default social image path"),
        email: requiredText("Contact email"),
        twitterHandle: fields.text({ label: "Twitter / X handle" }),
      },
    }),
  },
});
