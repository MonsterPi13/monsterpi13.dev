import { JetBrains_Mono, Exo_2 } from "next/font/google";
import "./globals.css";
import { sharedDescription, sharedTitle } from "@/shared-metadata";
import { PROFILES } from "@/lib/constants";

import { cn } from "@/lib/utils";
import SideMenu from "@/components/side-menu";
import MenuContent from "@/components/menu-content";

import type { Metadata, Viewport } from "next";

const exo2 = Exo_2({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monsterpi13.dev"),
  robots: {
    index: true,
    follow: true,
  },
  title: {
    template: `%s - ${sharedTitle}`,
    default: sharedTitle,
  },
  description: sharedDescription,
  openGraph: {
    title: {
      template: `%s - ${sharedTitle}`,
      default: sharedTitle,
    },
    description: sharedDescription,
    type: "website",
    url: "/",
    siteName: sharedTitle,
    locale: "zh_CN",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: `@${PROFILES.twitter.url}`,
    creator: `@${PROFILES.twitter.username}`,
  },
  other: {
    pinterest: "nopin",
  },
};

export const viewport: Viewport = {
  themeColor: "white",
  colorScheme: "only light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(exo2.className)}>
      <body>
        <main vaul-drawer-wrapper="" className="flex min-h-screen bg-white">
          <div className="w-full lg:flex">
            <SideMenu>
              <MenuContent />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
