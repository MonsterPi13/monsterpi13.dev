import { isDevelopment } from "./utils";

import type { SlugPageRes } from "@/types/contentful";

async function fetchGraphQL(query: string, preview = isDevelopment) {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["articles"] },
      // cache: "no-cache",
    }
  );
  if (!res.ok) return undefined;
  return res.json();
}

export async function getPage(
  slug: string,
  preview = isDevelopment
): Promise<SlugPageRes> {
  const entry = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
          title
          slug
          content {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  width
                  height
                  description
                }
              }
            }
          }
          sys {
            id
            firstPublishedAt
            publishedAt
          }
        }
      }
    }`,
    preview
  );

  return entry?.data?.pageCollection?.items?.[0];
}

export async function getAllPageSlugs(preview = isDevelopment) {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(preview: ${preview}) {
        items {
          slug
          hasCustomPage
          sys {
            id
            firstPublishedAt
            publishedAt
          }
        }
      }
    }`,
    preview
  );

  return entries?.data?.pageCollection?.items ?? [];
}
