import { isDevelopment } from './utils'

import type { LogbookRawItem, PostItem, SlugPageRes } from '@/types/contentful'

async function fetchGraphQL(query: string, preview = isDevelopment) {
  // console.log('[body]', JSON.stringify({ query }))
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
      }`
    },
    body: JSON.stringify({ query }),
    next: { tags: ['articles'] },
    cache: 'no-cache'
  })
  if (!res.ok) return undefined
  return res.json()
}

export async function getAllPosts(preview = isDevelopment): Promise<PostItem[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(preview: ${preview}) {
        items {
          title
          slug
          date
          sys {
            id
            firstPublishedAt
            publishedAt
          }
        }
      }
    }`,
    preview
  )

  return entries?.data?.postCollection?.items ?? []
}

export async function getPost(slug: string, preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
          title
          slug
          date
          seo {
            title
            description
          }
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
              entries {
                inline {
                  sys {
                    id
                  }
                  __typename
                  ... on ContentEmbed {
                    title
                    embedUrl
                    type
                  }
                  ... on CodeBlock {
                    title
                    code
                  }
                  ... on Tweet {
                    id
                  }
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
  )

  return entry?.data?.postCollection?.items?.[0]
}

export async function getPostById(id: string, preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { sys: {id: "${id}"}  }, preview: ${preview}, limit: 1) {
        items {
          slug
        }
      }
    }`,
    preview
  )
  console.log(`query {
    postCollection(where: { sys: {id: "${id}"}  }, preview: ${preview}, limit: 1) {
      items {
        slug
      }
    }
  }`)

  return entry?.data?.postCollection?.items?.[0]?.slug
}

export async function getWritingSeo(slug: string, preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
          date
          seo {
            title
            description
            ogImageTitle
            ogImageSubtitle
          }
          sys {
            firstPublishedAt
            publishedAt
          }
        }
      }
    }`,
    preview
  )

  return entry?.data?.postCollection?.items?.[0]
}

export async function getPageSeo(slug: string, preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
          seo {
            title
            description
            ogImageTitle
            ogImageSubtitle
          }
        }
      }
    }`,
    preview
  )

  return entry?.data?.pageCollection?.items?.[0]
}

export async function getPage(slug: string, preview = isDevelopment): Promise<SlugPageRes> {
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
  )

  return entry?.data?.pageCollection?.items?.[0]
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
  )

  return entries?.data?.pageCollection?.items ?? []
}

export async function getAllPostSlugs(preview = isDevelopment): Promise<{ slug: string }[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(preview: ${preview}) {
        items {
          slug
        }
      }
    }`,
    preview
  )

  return entries?.data?.postCollection?.items ?? []
}

export async function getAllLogbook(preview = isDevelopment): Promise<LogbookRawItem[]> {
  const entries = await fetchGraphQL(
    `query {
      logbookCollection(order: date_DESC, preview: ${preview}) {
        items {
          title
          date
          description
          image {
            url
            title
            description
            width
            height
          }
        }
      }
    }`,
    preview
  )

  return entries?.data?.logbookCollection?.items ?? []
}
