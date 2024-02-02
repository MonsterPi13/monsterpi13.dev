'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon } from 'lucide-react'

import { Button } from './ui/button'
import MobileDrawer from './mobile-drawer'
import { SCROLL_AREA_ID, MOBILE_SCROLL_THRESHOLD } from '@/lib/constants'

interface FloatingHeaderProps {
  scrollTitle?: string
  title?: string
  goBackLink?: string
}
const FloatingHeader = ({ goBackLink, scrollTitle, title, children }: React.PropsWithChildren<FloatingHeaderProps>) => {
  const [transformValues, setTransformValues] = useState({
    translateY: 0,
    opacity: scrollTitle ? 0 : 1
  })

  useEffect(() => {
    const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`)

    const onScroll = (e: Event) => {
      const scrollY = (e.target as HTMLElement).scrollTop

      const translateY = Math.max(100 - scrollY, 0)
      const opacity = Math.min(
        Math.max(
          +((scrollY - MOBILE_SCROLL_THRESHOLD * (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) / 100).toFixed(2),
          0
        ),
        1
      )

      setTransformValues({ translateY, opacity })
    }

    if (scrollTitle && scrollAreaElem) {
      scrollAreaElem.addEventListener('scroll', onScroll, {
        passive: true
      })
    }
    return () => scrollAreaElem?.removeEventListener('scroll', onScroll)
  }, [scrollTitle])

  return (
    <header className="sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b bg-white text-sm font-medium lg:hidden">
      <div className="flex h-full w-full items-center px-3">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-1 items-center gap-1">
            {goBackLink ? (
              <Button variant="ghost" size="icon" className="shrink-0" asChild>
                <Link href={goBackLink} title="Go back">
                  <ArrowLeftIcon size={16} />
                </Link>
              </Button>
            ) : (
              <MobileDrawer />
            )}
            <div className="flex flex-1 items-center justify-between">
              {scrollTitle && (
                <span
                  className="line-clamp-2 font-semibold tracking-tight"
                  style={{
                    transform: `translateY(${transformValues.translateY}%)`,
                    opacity: transformValues.opacity
                  }}
                >
                  {scrollTitle}
                </span>
              )}
              {title && (
                <Balancer ratio={0.35}>
                  <span className="line-clamp-2 font-semibold tracking-tight">{title}</span>
                </Balancer>
              )}
            </div>
          </div>
          {scrollTitle && <div className="flex min-w-[50px] justify-end">{children}</div>}
        </div>
      </div>
    </header>
  )
}

export default FloatingHeader
