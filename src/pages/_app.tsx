import React from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import Router from 'next/router'
import { appWithTranslation } from 'next-i18next'
import NProgress from 'nprogress'

import { DefaultLayout } from '@/components/layout'
import { RQNotificationContextProvider } from '@/context'
import createEmotionCache from '@/lib/createEmotionCache'
import type { NextPageWithLayout } from '@/lib/types'

import '@/styles/global.css'
import '@splidejs/react-splide/css'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextI18NextConfig = require('../../next-i18next.config')

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
  const { publicRuntimeConfig } = getConfig()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const { siteTitle, defaultTitle, defaultDescription } = publicRuntimeConfig?.metaData || {}
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout pageProps={pageProps}>{page}</DefaultLayout>)
  const pageTitle = `${siteTitle} | ${pageProps?.metaData?.title || defaultTitle}`
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageProps?.metaData?.title || defaultTitle} />
        <meta name="description" content={pageProps?.metaData?.description || defaultDescription} />
        <meta name="keywords" content={pageProps?.metaData?.keywords} />
        {pageProps?.metaData?.robots && (
          <meta name="robots" content={pageProps?.metaData?.robots} />
        )}
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <RQNotificationContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </RQNotificationContextProvider>
    </CacheProvider>
  )
}
export default appWithTranslation<KiboAppProps>(App, nextI18NextConfig)
