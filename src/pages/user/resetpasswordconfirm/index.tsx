import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getCustomerAccount } from '@/lib/api/operations'

import type { NextPage } from 'next'

const ResetPasswordConfirmationTemplate = dynamic(() =>
  import('@/components/page-templates').then((mod) => mod.ResetPasswordConfirmationTemplate)
)

export async function getServerSideProps(context: any) {
  const { locale, query, req } = context
  const userId = query?.u
  const customerAccount = await getCustomerAccount(userId, req)

  return {
    props: {
      customerAccount: customerAccount,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const ResetPasswordConfirmationPage: NextPage = (props: any) => {
  const { customerAccount } = props
  const router = useRouter()

  return (
    <>
      <ResetPasswordConfirmationTemplate
        token={router.query?.t as string}
        userName={customerAccount?.userName as string}
      ></ResetPasswordConfirmationTemplate>
    </>
  )
}
export default ResetPasswordConfirmationPage
