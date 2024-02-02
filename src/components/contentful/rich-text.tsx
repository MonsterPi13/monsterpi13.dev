/* eslint-disable @next/next/no-img-element */
'use client'

import dynamic from 'next/dynamic'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { Link } from '@/components/link'

import { dasherize } from '@/lib/utils'
import { CodeBlock } from './code-block'
import { TweetCard } from '../tweet-card/tweet-card'

import type { SlugPageRes } from '@/types/contentful'
import { CommonNode, Options, documentToReactComponents } from '@contentful/rich-text-react-renderer'

interface RichTextProps {
  content: SlugPageRes['content']
}

const DynamicIframe = dynamic(() => import('@/components/contentful/iframe'))

function options(links: RichTextProps['content']['links']) {
  const findAsset = (id: string) => links?.assets.block.find((item: any) => item.sys.id === id)
  const findInlineEntry = (id: string) => links?.entries.inline.find((item: any) => item.sys.id === id)

  return {
    renderMark: {
      [MARKS.BOLD]: (text: string) => <span className="font-semibold text-black">{text}</span>,
      [MARKS.ITALIC]: (text: string) => <span className="italic">{text}</span>,
      [MARKS.CODE]: (text: string) => <code className="inline-code">{text}</code>
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (_: unknown, children: string) => {
        const id = dasherize(children)
        const url = `h2-${id}`
        return (
          <h2
            id={url}
            className="group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
          >
            <a href={`#${url}`} className="group-hover:underline group-hover:underline-offset-4">
              {children}
            </a>
          </h2>
        )
      },
      [BLOCKS.HEADING_3]: (_: unknown, children: string) => {
        const id = dasherize(children)
        const url = `h3-${id}`
        return (
          <h3
            id={url}
            className="group relative mb-2 mt-6 w-fit cursor-pointer before:absolute before:-left-4 hover:before:content-['#']"
          >
            <a href={`#${url}`} className="group-hover:underline group-hover:underline-offset-4">
              {children}
            </a>
          </h3>
        )
      },
      // Must be a <div> instead of <p> to avoid descendant issue, hence to avoid mismatching UI between server and client on hydration.
      [BLOCKS.PARAGRAPH]: (_: unknown, children: string) => (
        <div className="mb-4 leading-slacker last:mb-0">{children}</div>
      ),
      [BLOCKS.UL_LIST]: (_: unknown, children: string) => (
        <ul className="mb-4 flex list-disc flex-col gap-0.5 pl-6">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_: unknown, children: string) => (
        <ol className="mb-4 flex list-inside list-[decimal-leading-zero] flex-col gap-2">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_: unknown, children: string) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (_: unknown, children: React.ReactNode) => (
        <blockquote className="mb-4 rounded-r-lg border-l-2 border-gray-200 px-4 font-medium">{children}</blockquote>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: CommonNode) => {
        const asset = findAsset(node.data.target.sys.id)

        return (
          <figure className="mb-6 flex flex-col gap-2 overflow-hidden rounded-xl">
            <img
              src={asset.url}
              width={asset.width || 400}
              height={asset.height || 300}
              alt={asset.description || asset.title}
              loading="lazy"
              className="animate-reveal"
            />
            {asset.description && (
              <figcaption className="break-all text-center text-xs font-light text-gray-500">
                {asset.description}
              </figcaption>
            )}
          </figure>
        )
      },
      [BLOCKS.HR]: () => <hr className="my-12" />,
      [INLINES.HYPERLINK]: (node: CommonNode, children: React.ReactNode) => (
        <Link href={node.data.uri}>{children}</Link>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node: CommonNode) => {
        const entry = findInlineEntry(node.data.target.sys.id)

        switch (entry.__typename) {
          case 'ContentEmbed': {
            const { embedUrl, title, type } = entry

            switch (type) {
              case 'Video': {
                return (
                  <DynamicIframe
                    embedUrl={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="aspect-video"
                  />
                )
              }
              case 'SoundCloud': {
                return <DynamicIframe embedUrl={embedUrl} title={title} scrolling="no" className="h-[166px]" />
              }
              default:
                return null
            }
          }
          case 'CodeBlock': {
            return <CodeBlock {...entry} />
          }
          case 'Tweet': {
            const { id } = entry
            return <TweetCard id={id} />
          }
          default:
            return null
        }
      }
    }
  }
}

const RichText = ({ content }: RichTextProps) => {
  if (!content) {
    return null
  }

  return documentToReactComponents(content.json, options(content.links) as Options)
}

export default RichText
