import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import FloatingHeader from "@/components/floating-header";
import { ScrollArea } from "@/components/scroll-area";
import WritingViews from "@/components/writing-views";
import PageTitle from "@/components/page-title";
import RichText from "@/components/contentful/rich-text";

import { getDateTimeFormat, isDevelopment } from "@/lib/utils";
import { getPost, getWritingSeo, getAllPostSlugs } from "@/lib/contentful";

interface WritingSlugPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const allPosts = await getAllPostSlugs();
  return allPosts.map((post) => ({ slug: post.slug }));
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode();
  const data = await getPost(slug, isDevelopment ? true : isEnabled);

  if (!data) notFound();

  return {
    data,
  };
}

export default async function WritingSlugPage({
  params,
}: WritingSlugPageProps) {
  const { slug } = params;
  const { data } = await fetchData(slug);

  const {
    title,
    date,
    seo: { title: seoTitle, description: seoDescription },
    content,
    sys: { firstPublishedAt, publishedAt: updatedAt },
  } = data;

  const postDate = date || firstPublishedAt;
  const dateString = getDateTimeFormat(postDate);

  const datePublished = new Date(postDate).toISOString();
  const dateModified = new Date(updatedAt).toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seoTitle,
    description: seoDescription,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: "MonsterPi13",
    },
    url: `https://monster.dev/writing/${slug}`,
  };

  return (
    <>
      <ScrollArea className="flex flex-col bg-white" hasScrollTitle>
        <FloatingHeader scrollTitle={title} goBackLink="/writing">
          <WritingViews slug={slug} />
        </FloatingHeader>
        <div className="content-wrapper">
          <article className="content">
            <PageTitle
              title={title}
              subtitle={
                <time dateTime={postDate} className="text-gray-400">
                  {dateString}
                </time>
              }
              className="mb-6 flex flex-col gap-3"
            />
            <RichText content={content} />
          </article>
        </div>
      </ScrollArea>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
      />
    </>
  );
}

export async function generateMetadata({ params }: WritingSlugPageProps) {
  const { slug } = params;
  const seoData = await getWritingSeo(slug);
  if (!seoData) return null;

  const {
    date,
    seo: { title, description },
    sys: { firstPublishedAt, publishedAt: updatedAt },
  } = seoData;

  const siteUrl = `/writing/${slug}`;
  const postDate = date || firstPublishedAt;
  const publishedTime = new Date(postDate).toISOString();
  const modifiedTime = new Date(updatedAt).toISOString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      ...(updatedAt && {
        modifiedTime,
      }),
      url: siteUrl,
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}
