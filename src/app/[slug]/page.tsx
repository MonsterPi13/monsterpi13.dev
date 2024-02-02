import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import FloatingHeader from '@/components/floating-header'
import { GradientBg } from '@/components/gradient-bg'
import PageTitle from '@/components/page-title'
import { ScrollArea } from '@/components/scroll-area'
import { getPage, getAllPageSlugs, getPageSeo } from '@/lib/contentful'
import { isDevelopment } from '@/lib/utils'
import RickText from '@/components/contentful/rich-text'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const allPages = await getAllPageSlugs()

  return allPages
    .filter((page: any) => !page.hasCustomPage) // filter out pages that have custom pages, e.g. /journey
    .map((page: any) => ({
      slug: page.slug
    }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params
  console.log('[slug]', slug)
  const seoData = await getPageSeo(slug)
  if (!seoData) return null

  const {
    seo: { title, description }
  } = seoData
  const siteUrl = `/${slug}`

  console.log('[title]', title)
  console.log('[description]', description)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}

async function fetchData(slug: string) {
  const { isEnabled } = draftMode()
  const page = await getPage(slug, isDevelopment ? true : isEnabled)
  if (!page) notFound()

  return { page }
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = params

  const {
    page: { title, content }
  } = await fetchData(slug)

  return (
    <ScrollArea className="flex flex-col" hasScrollTitle>
      <GradientBg />
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={title} />
          <RickText content={content} />
        </div>
      </div>
    </ScrollArea>
  )
}
