import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

interface PageTitleProps {
  title: string
  subtitle?: React.ReactNode
  className?: string
}

const PageTitle = ({ title, subtitle, className, ...rest }: PageTitleProps) => {
  return (
    <div className={cn('mb-6', className)}>
      <Balancer as="h1" {...rest}>
        {title}
      </Balancer>
      {subtitle}
    </div>
  )
}

export default PageTitle
