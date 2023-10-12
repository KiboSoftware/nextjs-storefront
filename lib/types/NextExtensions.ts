import type { ReactElement, ReactNode } from 'react'

import type { NextPage } from 'next'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type MetaData = {
  title: string | null
  description: string | null
  keywords: string | null
  canonicalUrl: string | null
  robots: string | null
}
export type PageWithMetaData = { metaData?: MetaData }

export type PageWithLayoutAndMetaData = NextPageWithLayout & PageWithMetaData
