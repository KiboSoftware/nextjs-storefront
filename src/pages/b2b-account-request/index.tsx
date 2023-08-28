import { Grid, Typography } from '@mui/material'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountHierarchyForm } from '@/components/b2b'
import { useCreateCustomerB2bAccountMutation } from '@/hooks'
import { buildCreateCustomerB2bAccountParams } from '@/lib/helpers'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const B2BAccountRequestPage: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()

  const handleAccountRequest = async (formValues: CreateCustomerB2bAccountParams) => {
    const variables = buildCreateCustomerB2bAccountParams(formValues)
    await createCustomerB2bAccount.mutateAsync(variables)
    router.push('/')
  }

  return (
    <Grid container justifyContent="center" alignItems="center" direction="row">
      <Grid item md={6}>
        <Typography
          variant="h1"
          component="p"
          fontWeight="bold"
          color="text.primary"
          sx={{ paddingTop: 3, paddingBottom: 3 }}
        >
          {t('b2b-account-request')}
        </Typography>
        <AccountHierarchyForm
          isAddingAccountToChild={false}
          isRequestAccount={true}
          onSave={handleAccountRequest}
          primaryButtonText={t('request-account')}
        />
      </Grid>
    </Grid>
  )
}

export default B2BAccountRequestPage
