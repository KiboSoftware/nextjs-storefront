import React, { useEffect } from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
// eslint-disable-next-line import/order
import { AppProps } from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import 'next-i18next.config'
// eslint-disable-next-line import/order
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'

import { DefaultLayout } from '@/components/layout'
import { RQNotificationContextProvider } from '@/context'
import createEmotionCache from '@/lib/createEmotionCache'
import type { NextPageWithLayout } from '@/lib/types'

import '@/styles/global.css'
import '@splidejs/react-splide/css'

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
  const [shopperAgent, setShopperAgent] = React.useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    
    if(window && typeof window !== 'undefined'){
      const loadShopperAgent = async () => {
      const { default: KiboShopperAgent } = await import('@/components/chat/kibo-shopper-agent')
      setShopperAgent(new KiboShopperAgent())
    }
    loadShopperAgent()
  }
  }, [])
  useEffect(() => {
    if (shopperAgent && typeof window !== 'undefined') {
      shopperAgent.defineCustomElements()
      const registerChatTools = () => shopperAgent.registerChatTools()
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerChatTools)
      } else {
        // DOM is already loaded, execute immediately
        registerChatTools()
      }

      // Cleanup the event listener
      return () => {
        document.removeEventListener('DOMContentLoaded', registerChatTools)
      }
    }
  }, [shopperAgent])
  useEffect(() => {
    if (window && typeof window !== 'undefined') {
      (window as any).navigationToNextPage = (path: any) => {
        router.push(path)
      }
    }
  }, [router])
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
export default appWithTranslation<KiboAppProps>(App)
