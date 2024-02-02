import {
  NavigationIcon,
  DogIcon,
  PenToolIcon,
  PocketKnifeIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon
} from 'lucide-react'

export const PROFILES = {
  twitter: {
    title: 'Twitter',
    username: 'MonsterPi13',
    url: 'https://twitter.com/intent/user?screen_name=MonsterPi13',
    Icon: TwitterIcon
  },
  github: {
    title: 'GitHub',
    url: 'https://github.com/MonsterPi13',
    Icon: GithubIcon
  },
  linkedin: {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/%E9%B9%8F-%E9%98%AE-764b91215/',
    Icon: LinkedinIcon
  }
}

export const LINKS = [
  {
    href: '/',
    label: 'Home',
    Icon: DogIcon
  },
  {
    href: '/writing',
    label: 'Writing',
    Icon: PenToolIcon
  },
  {
    href: '/journey',
    label: 'Journey',
    Icon: NavigationIcon
  },
  {
    href: '/stack',
    label: 'Stack',
    Icon: PocketKnifeIcon
  }
]

export const SCROLL_AREA_ID = 'scroll-area'
export const MOBILE_SCROLL_THRESHOLD = 20
export const SUPABASE_TABLE_NAME = 'pages'
