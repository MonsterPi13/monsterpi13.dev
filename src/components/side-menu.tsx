'use client'

import Link from 'next/link'
import { Button } from './ui/button'

import { cn } from '@/lib/utils'
import { ScrollArea } from './scroll-area'
import { RadioIcon } from 'lucide-react'

interface SideMenuProps {
  title?: string
  href?: string
  isInner?: boolean
}

const SideMenu = ({ title, href, children, isInner = false }: React.PropsWithChildren<SideMenuProps>) => {
  return (
    <ScrollArea
      className={cn(
        'hidden bg-zinc-50 lg:flex lg:flex-col lg:border-r',
        isInner ? 'lg:w-80 xl:w-96' : 'lg:w-60 xl:w-72'
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight">
              {href ? <Link href={href}>{title}</Link> : <span>{title}</span>}
            </div>
            <Button variant="outline" size="xs" asChild>
              <Link href="/writing.xml" title="RSS feed" target="_blank" rel="noopener noreferrer">
                <RadioIcon size={16} className="mr-2" />
                RSS feed
              </Link>
            </Button>
          </div>
        </div>
      )}
      <div className="bg-zinc-50 p-3">{children}</div>
    </ScrollArea>
  )
}

export default SideMenu
