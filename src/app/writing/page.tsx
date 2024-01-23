import { Suspense } from "react";

import FloatingHeader from "@/components/floating-header";
import LoadingSpinner from "@/components/loading-spinner";
import { ScrollArea } from "@/components/scroll-area";
import { getAllPosts, getPageSeo } from "@/lib/contentful";
import { getSortedPosts } from "@/lib/utils";
import { WritingListLayout } from "../../components/writing/writing-list-layout";

async function fetchData() {
  const allPosts = await getAllPosts();
  return { allPosts };
}

export async function generateMetadata() {
  const seoData = await getPageSeo("writing");
  if (!seoData) return null;

  const {
    seo: { title, description },
  } = seoData;
  const siteUrl = "/writing";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function Writing() {
  const { allPosts } = await fetchData();
  const sortedPosts = getSortedPosts(allPosts);

  return (
    <ScrollArea className="flex flex-col lg:hidden">
      <FloatingHeader title="Writing" />
      <Suspense fallback={<LoadingSpinner />}>
        <WritingListLayout list={sortedPosts} isMobile></WritingListLayout>
      </Suspense>
    </ScrollArea>
  );
}
