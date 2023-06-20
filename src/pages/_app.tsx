import React from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
// eslint-disable-next-line import/order
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import 'next-i18next.config'
// eslint-disable-next-line import/order
import Router from 'next/router'
import NProgress from 'nprogress'

import { RQNotificationContextProvider } from '@/context'
import createEmotionCache from '@/lib/createEmotionCache'
const DefaultLayout = dynamic(() => import('@/components/layout').then((mod) => mod.DefaultLayout))
import type { NextPageWithLayout } from '@/lib/types'
import '@/styles/global.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type KiboAppProps = AppProps & {
  emotionCache?: EmotionCache
  Component: NextPageWithLayout
}

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = (props: KiboAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout pageProps={pageProps}>{page}</DefaultLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>KiboCommerce</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="title" content="Kibo Commerce | Unified Commerce Platform for D2C Retailers" />
        <meta
          name="description"
          content="Kibo Commerce is a unified commerce platform that helps D2C retailers manage orders, products, customers, and more in a single place."
        />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <RQNotificationContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </RQNotificationContextProvider>
    </CacheProvider>
  )
}
export default appWithTranslation<KiboAppProps>(App)
