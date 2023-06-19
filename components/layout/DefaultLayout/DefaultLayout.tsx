import React, { ReactElement } from 'react'

import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import { Hydrate } from 'react-query'

const Footer = dynamic(() => import('@/components/layout').then((mod) => mod.Footer), {
  ssr: false,
})
import { CookieConsent, GlobalFetchingIndicator } from '@/components/common'
import { KiboHeader } from '@/components/layout'
import {
  AuthContextProvider,
  ModalContextProvider,
  DialogRoot,
  HeaderContextProvider,
  SnackbarRoot,
} from '@/context'
import theme from '@/styles/theme'

const DefaultLayout = ({ pageProps, children }: { pageProps: any; children: ReactElement }) => {
  return (
    <Hydrate state={pageProps.dehydratedState}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalContextProvider>
          <AuthContextProvider>
            <HeaderContextProvider>
              <GlobalFetchingIndicator />
              <KiboHeader
                navLinks={[
                  {
                    link: '/order-status',
                    text: 'order-status',
                  },
                ]}
                categoriesTree={pageProps.categoriesTree || []}
                isSticky={true}
              />
              <DialogRoot />
              <SnackbarRoot />
              <CookieConsent />
              <Container maxWidth={'lg'}>{children}</Container>
              <Footer content={pageProps.footer} />
            </HeaderContextProvider>
          </AuthContextProvider>
        </ModalContextProvider>
      </ThemeProvider>
    </Hydrate>
  )
}

export default DefaultLayout
