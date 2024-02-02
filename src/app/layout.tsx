import { draftMode } from 'next/headers'
import { Exo_2, Mukta } from 'next/font/google'
import { EyeIcon } from 'lucide-react'
import { sharedDescription, sharedTitle } from '@/shared-metadata'
import { PROFILES } from '@/lib/constants'
import './globals.css'

import SideMenu from '@/components/side-menu'
import MenuContent from '@/components/menu-content'
import { cn } from '@/lib/utils'

import type { Metadata, Viewport } from 'next'

const exo2 = Exo_2({
  subsets: ['latin']
})

const mukta = Mukta({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://monsterpi13.dev'),
  robots: {
    index: true,
    follow: true
  },
  title: {
    template: `%s - ${sharedTitle}`,
    default: sharedTitle
  },
  description: sharedDescription,
  openGraph: {
    title: {
      template: `%s - ${sharedTitle}`,
      default: sharedTitle
    },
    description: sharedDescription,
    type: 'website',
    url: '/',
    siteName: sharedTitle,
    locale: 'zh_CN'
  },
  alternates: {
    canonical: '/'
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${PROFILES.twitter.url}`,
    creator: `@${PROFILES.twitter.username}`
  },
  other: {
    pinterest: 'nopin'
  }
}

export const viewport: Viewport = {
  themeColor: 'white',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()

  return (
    <html lang="en" className={cn(mukta.className, exo2.className)}>
      <body>
        <main vaul-drawer-wrapper="" className="flex min-h-screen bg-white">
          {isEnabled && (
            <div className="absolute bottom-0 left-0 right-0 z-50 flex h-12 w-full items-center justify-center bg-green-500 text-center text-sm font-medium text-white">
              <div className="flex items-center gap-2">
                <EyeIcon size={16} />
                <span>Draft mode is enabled</span>
              </div>
            </div>
          )}
          <div className="w-full lg:flex">
            <SideMenu>
              <MenuContent />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
      </body>
    </html>
  )
}
