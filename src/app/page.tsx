import { ScrollArea } from "@/components/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import FloatingHeader from "@/components/floating-header";
import PageTitle from "@/components/page-title";

export default function Home() {
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
            Previously, I led front-end architecture at China Telecom's Game
            Department. Looking ahead, I aspire to transition into freelance
            work in the future.
          </p>
          <Button asChild variant="link" className="inline px-0">
            <Link href="/writing">
              <h2 className="mb-4 mt-8">Writing</h2>
            </Link>
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
