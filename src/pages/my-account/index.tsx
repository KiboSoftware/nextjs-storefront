import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import { B2BTemplate, MyAccountTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import { AccountType } from '@/lib/constants'
import { decodeParseCookieValue } from '@/lib/helpers'

import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, req } = context

  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()
  const cookies = req?.cookies
  const authTicket = decodeParseCookieValue(cookies[authCookieName])

  return {
    props: {
      isAuthenticated: !!authTicket,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const MyAccountPage: NextPage = (props: any) => {
  const { isAuthenticated: serverSideIsAuthenticated } = props
  const { user: customerAccount } = useAuthContext()
  const { publicRuntimeConfig } = getConfig()
  const { reCaptchaKey } = publicRuntimeConfig.recaptcha

  if (!serverSideIsAuthenticated && !customerAccount) return null
  const isB2BUser = customerAccount?.accountType?.toLowerCase() === AccountType.B2B.toLowerCase()
  const template = isB2BUser ? (
    <B2BTemplate user={customerAccount} />
  ) : (
    <MyAccountTemplate user={customerAccount} />
  )

  return reCaptchaKey ? (
    <ReCaptchaProvider reCaptchaKey={reCaptchaKey}>{template}</ReCaptchaProvider>
  ) : (
    template
  )
}

export default MyAccountPage
