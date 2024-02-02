import { IframeHTMLAttributes } from 'react'
import { ShowInView } from '../show-in-view'
import { cn } from '@/lib/utils'

interface IframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  embedUrl: string
  title: string
  className: string
}

export default function Iframe({ embedUrl, title, className, ...rest }: IframeProps) {
  return (
    <ShowInView>
      <figure>
        <iframe
          src={embedUrl}
          title={title}
          allowFullScreen
          className={cn('w-full rounded border-0 border-none shadow-lg', className)}
          {...rest}
        />
        <figcaption className="mt-2 break-words text-center text-sm text-gray-500">{title}</figcaption>
      </figure>
    </ShowInView>
  )
}
