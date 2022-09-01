import type { ReactElement, ReactNode } from 'react'

import type { NextPage } from 'next'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
