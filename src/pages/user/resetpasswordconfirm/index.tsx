import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ResetPasswordConfirmationTemplate } from '@/components/page-templates'
import { getCustomerAccount } from '@/lib/api/operations'

import type { NextPage } from 'next'

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
