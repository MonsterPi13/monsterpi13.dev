import Link from "next/link";
import { Suspense } from "react";
import { ScrollArea } from "@/components/scroll-area";
import { Button } from "@/components/ui/button";

import FloatingHeader from "@/components/floating-header";
import PageTitle from "@/components/page-title";
import LoadingSpinner from "@/components/loading-spinner";
import WritingList from "@/components/writing-list";
import { getAllPosts } from "@/lib/contentful";
import { getSortedPosts } from "@/lib/utils";

async function fetchData() {
  const allPosts = await getAllPosts();
  return { allPosts };
}

export default async function Home() {
  const { allPosts } = await fetchData();
  const sortedPosts = getSortedPosts(allPosts);

  return (
    <ScrollArea hasScrollTitle>
      <FloatingHeader scrollTitle="Tristan Ruan" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Home" className="lg:hidden" />
          <p>
            {`Hi! 👋 I'm Tristan (or Peng, if you prefer). I'm a software engineer and Dota enthusiast based in Nanjing, China.`}
          </p>
          <p>
            I am currently a Senior Frontend Software Engineer at Enn Group.
            Previously, I led front-end architecture at China Telecom&apos;s
            Game Department. Looking ahead, I aspire to transition into
            freelance work in the future.
          </p>
          <Button asChild variant="link" className="inline px-0">
            <Link href="/writing">
              <h2 className="mb-4 mt-8">Writing</h2>
            </Link>
          </Button>
          <Suspense fallback={<LoadingSpinner />}>
            <WritingList items={sortedPosts} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  );
}
