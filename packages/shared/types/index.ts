import { Icons } from '@/components/icons';

export * from './dashboard';
export * from './site';

export type KeyValuePair = {
  key: string
  value: string
}

export type RoadmapStatus = 'done' | 'in-progress' | 'planned'

export type RoadmapItem = {
  title: string
  description: string
  status: RoadmapStatus
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)