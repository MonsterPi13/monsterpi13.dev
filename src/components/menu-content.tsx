import Image from 'next/image'
import Link from 'next/link'
import { LINKS, PROFILES } from '@/lib/constants'
import NavigationLink from './navigation-link'

const MenuContent = () => {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
          <div className="relative h-10 w-10 rounded-full">
            <Image src="/assets/me.jpg" alt="avatar" fill className="rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight">Tristan Ruan</span>
            <span className="text-gray-600">Software Engineer</span>
          </div>
        </Link>

        <div className="flex flex-col gap-1">
          {LINKS.map((link, index) => (
            <NavigationLink key={index} shortcutNumber={index + 1} {...link} Icon={<link.Icon size={16} />} />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-sm">
        <span className="px-2 text-xs font-medium leading-relaxed text-gray-600">Online</span>
        <div className="flex flex-col gap-1">
          {Object.values(PROFILES).map((profile, index) => (
            <NavigationLink
              key={index}
              Icon={<profile.Icon size={16} />}
              label={profile.title}
              href={profile.url}
              shortcutNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuContent
