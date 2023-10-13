import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { QuickOrderTemplate } from '@/components/page-templates'
import { getCart } from '@/lib/api/operations'

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextPage,
} from 'next'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, req, res } = context
  const response = await getCart(req as NextApiRequest, res as NextApiResponse)
  const { serverRuntimeConfig } = getConfig()
  const isMultiShipEnabled = serverRuntimeConfig.isMultiShipEnabled

  return {
    props: {
      isMultiShipEnabled,
      cart: response?.currentCart || null,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const QuickOrderPage: NextPage = (props: any) => {
  const router = useRouter()
  const handleAccountTitleClick = () => router.push('/my-account')
  return <QuickOrderTemplate {...props} onAccountTitleClick={handleAccountTitleClick} />
}

export default QuickOrderPage
