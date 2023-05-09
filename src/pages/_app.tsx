import React from 'react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
// eslint-disable-next-line import/order
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import 'next-i18next.config'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Hydrate } from 'react-query'
import '../../styles/global.css'

import createEmotionCache from '../../lib/createEmotionCache'
import theme from '../../styles/theme'
import { GlobalFetchingIndicator } from '@/components/common'
import { KiboHeader, DefaultLayout, Footer } from '@/components/layout'
import {
  AuthContextProvider,
  ModalContextProvider,
  DialogRoot,
  HeaderContextProvider,
  SnackbarRoot,
  RQNotificationContextProvider,
  CustomerB2bUserContextProvider,
} from '@/context'
import { footerConfig as footerProps } from '@/lib/constants'
import type { NextPageWithLayout } from '@/lib/types'

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
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Kibo Commerce - NextJS</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RQNotificationContextProvider>
          <ModalContextProvider>
            <CustomerB2bUserContextProvider>
              <AuthContextProvider>
                <HeaderContextProvider>
                  <Hydrate state={pageProps.dehydratedState}>
                    <GlobalFetchingIndicator />
                    <KiboHeader
                      navLinks={[
                        {
                          link: '/order-status',
                          text: 'order-status',
                        },
                        {
                          link: '/wishlist',
                          text: 'wishlist',
                        },
                        {
                          link: '#',
                          text: 'Nav Link 2',
                        },
                        {
                          link: '#',
                          text: 'Nav Link 3',
                        },
                      ]}
                      categoriesTree={pageProps.categoriesTree || []}
                      isSticky={true}
                    />
                    <DialogRoot />
                    <SnackbarRoot />
                    {getLayout(<Component {...pageProps} />)}
                    <Footer {...footerProps} />
                  </Hydrate>
                </HeaderContextProvider>
              </AuthContextProvider>
            </CustomerB2bUserContextProvider>
          </ModalContextProvider>
        </RQNotificationContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default appWithTranslation<KiboAppProps>(App)
