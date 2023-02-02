import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getConfig from 'next/config'

import { LoginDialog } from '@/components/layout'
import { WishlistTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import { decodeParseCookieValue } from '@/lib/helpers/cookieHelper'

import type { NextPage, GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req } = context

  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()
  const cookies = req.cookies
  const authTicket = decodeParseCookieValue(cookies[authCookieName])

  return {
    props: {
      isAuthenticated: !!authTicket,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const WishlistPage: NextPage = (props: any) => {
  const { isAuthenticated: serverSideIsAuthenticated } = props
  const { isAuthenticated, user: customerAccount } = useAuthContext()

  if (!serverSideIsAuthenticated && !isAuthenticated) return <LoginDialog />

  return <WishlistTemplate {...props} customerAccount={customerAccount} />
}

export default WishlistPage
