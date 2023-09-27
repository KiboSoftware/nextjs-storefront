import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import { B2BTemplate, MyAccountTemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import { getCurrentUser } from '@/lib/api/operations'
import { AccountType } from '@/lib/constants'

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextPage,
} from 'next'

interface MyAccountPageProps {
  customerAccount?: any
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, req, res } = context

  const response = await getCurrentUser(req as NextApiRequest, res as NextApiResponse)

  return {
    props: {
      customerAccount: response?.customerAccount,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const MyAccountPage: NextPage<MyAccountPageProps> = (props) => {
  const { customerAccount: customerAccountFromServer } = props

  const serverSideIsAuthenticated = Boolean(customerAccountFromServer?.id)

  const { user: customerAccountFromClient } = useAuthContext()

  const customerAccount = {
    ...customerAccountFromServer,
    ...customerAccountFromClient,
  }

  const { publicRuntimeConfig } = getConfig()
  const { reCaptchaKey } = publicRuntimeConfig.recaptcha

  if (!serverSideIsAuthenticated && !Object.keys(customerAccount).length) return null

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
