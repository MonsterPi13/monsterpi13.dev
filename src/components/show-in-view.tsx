import { PropsWithChildren } from 'react'
import { useInView } from 'react-intersection-observer'

interface ShowInViewProps {
  rootMargin?: string
  triggerOnce?: boolean
}

export const ShowInView = ({
  children,
  rootMargin = '0px',
  triggerOnce = true,
  ...rest
}: PropsWithChildren<ShowInViewProps>) => {
  const { ref, inView } = useInView({
    rootMargin,
    triggerOnce
  })

  return (
    <div ref={ref} data-role="intersection-observer" {...rest}>
      {inView && children}
    </div>
  )
}
