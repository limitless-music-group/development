export type SiteConfig = {
  applicationName: string
  name: string
  description: string
  url: string;
  links?: {
    twitter: string
    facebook: string
    github: string
    instagram: string
    discord?: string
    linkedin?: string
  }
  images?: {
    default: string
    notFound: string
    logo: string
  }
  author: {
    name: string
    url: string
    email?: string
    github?: string
  }[]
  publisher: string
  keywords?: string[]
}

export type RoadmapStatus = 'done' | 'in-progress' | 'planned'

export type RoadmapItem = {
  title: string
  description: string
  status: RoadmapStatus
}