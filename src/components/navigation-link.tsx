'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from 'lucide-react'

import { getPage } from '@/lib/contentful'

interface NavigationLinkProps {
  href: string
  label: string
  Icon: React.ReactElement
  shortcutNumber: number
}

const NavigationLink = ({ href, label, Icon, shortcutNumber }: NavigationLinkProps) => {
  const pathname = usePathname()

  const isInternal = href.startsWith('/')
  if (!isInternal) {
    return (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-200"
      >
        <span className="inline-flex items-center gap-2 font-medium">
          {Icon} {label}
        </span>
        <ArrowUpRightIcon size={16} />
      </a>
    )
  }

  let isActive = false
  if (pathname?.length > 0) {
    const currentPathname = pathname.split('/')?.[1] ?? ''
    isActive = href.slice(1) === currentPathname
  }

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        'group flex items-center justify-between rounded-lg p-2',
        isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
      )}
    >
      <span className="flex items-center gap-2">
        {Icon}
        <span className={cn('font-medium', isActive && 'text-white')}>{label}</span>
      </span>
      {shortcutNumber && (
        <span
          className={cn(
            'hidden h-5 w-5 place-content-center rounded border border-gray-200 bg-gray-100 text-xs font-medium text-gray-500 transition-colors duration-200 group-hover:border-gray-300 lg:grid',
            isActive && 'border-gray-600 bg-gray-700 text-gray-200 group-hover:border-gray-600'
          )}
          title={`Shortcut key: ${shortcutNumber}`}
        >
          {shortcutNumber}
        </span>
      )}
    </Link>
  )
}

export default memo(NavigationLink)
