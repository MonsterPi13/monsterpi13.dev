import { PlusIcon } from 'lucide-react'
import JourneyCard from '@/components/Journey-card'
import FloatingHeader from '@/components/floating-header'
import { GradientBg3 } from '@/components/gradient-bg'
import PageTitle from '@/components/page-title'
import { ScrollArea } from '@/components/scroll-area'
import { getAllLogbook, getPageSeo } from '@/lib/contentful'

import type { LogbookRawItem } from '@/types/contentful'

type LogbookItem = {
  year: number
  logs: LogbookRawItem[]
}

async function fetchData() {
  const allLogbook = await getAllLogbook()

  const mappedLogbook: LogbookItem[] = []
  allLogbook.map((log) => {
    const year = new Date(log.date).getFullYear()
    const existingYear = mappedLogbook.find((item) => item.year === year)
    if (!existingYear)
      mappedLogbook.push({
        year,
        logs: [log]
      })
    else existingYear.logs.push(log)
  })

  return {
    allLogbook: mappedLogbook
  }
}

async function Journey() {
  const { allLogbook } = await fetchData()

  return (
    <ScrollArea className="flex flex-col" hasScrollTitle>
      <GradientBg3 />
      <FloatingHeader scrollTitle="Journey" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Journey" />
          <div className="flex flex-col items-stretch gap-12">
            {allLogbook.map((item, itemIndex) => (
              <div key={`data_${itemIndex}`} className="flex flex-col items-baseline gap-6 md:flex-row md:gap-12">
                <div className="flex w-14 items-center">
                  <h2>{item.year}</h2>
                  <hr className="my-0 ml-4 flex-1 border-dashed border-gray-200" />
                </div>
                <section className="flex-1">
                  {item.logs.map((log, logIndex) => (
                    <div key={`data_${itemIndex}_log_${logIndex}`} className="relative flex pb-8 last:pb-0">
                      {logIndex !== item.logs.length - 1 && (
                        <div className="absolute inset-0 flex w-6 items-center justify-center">
                          <div className="pointer-events-none h-full w-px border-l-[1px] border-gray-200"></div>
                        </div>
                      )}
                      <div className="z-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black align-middle text-white">
                        <PlusIcon size={16} />
                      </div>
                      <div className="flex-grow pl-8">
                        <JourneyCard {...log} index={logIndex} />
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const seoData = await getPageSeo(slug)
  if (!seoData) return null

  const {
    seo: { title, description }
  } = seoData
  const siteUrl = `/${slug}`

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

export default Journey
