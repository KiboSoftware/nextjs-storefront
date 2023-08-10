import { ArrowBackIos, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { accountHierarchyTemplateStyles } from './AccountHierarchyTemplate.styles'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { AccountHierarchyTree } from '@/components/b2b'
import { AccountHierarchyFormDialog } from '@/components/dialogs'
import { useAuthContext, useModalContext } from '@/context'
import { useCreateCustomerB2bAccountMutation } from '@/hooks'
import { B2BRoles } from '@/lib/constants'
import { buildCreateCustomerB2bAccountParams } from '@/lib/helpers'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

import { B2BAccount } from '@/lib/gql/types'

const AccountHierarchyTemplate = () => {
  const theme = useTheme()
  const router = useRouter()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()

  const onAccountTitleClick = () => {
    router.push('/my-account')
  }

  const handleFormSubmit = async (formValues: CreateCustomerB2bAccountParams) => {
    const variables = buildCreateCustomerB2bAccountParams({
      ...formValues,
      parentAccount: user as B2BAccount,
    })
    const createCustomerB2BAccount = await createCustomerB2bAccount.mutateAsync({
      ...variables,
    })
    if (createCustomerB2BAccount) closeModal()
  }

  const handleAddChildAccount = () => {
    showModal({
      Component: AccountHierarchyFormDialog,
      props: {
        accounts: [user],
        isAddingAccountToChild: false,
        primaryButtonText: t('create-account'),
        title: t('confirmation'),
        onSave: handleFormSubmit,
        onClose: () => closeModal(),
      },
    })
  }

  return (
    <>
      <Grid item xs={12}>
        <Stack sx={accountHierarchyTemplateStyles.wrapIcon} direction="row" gap={2}>
          <Box sx={{ display: 'flex' }} onClick={onAccountTitleClick}>
            <ArrowBackIos fontSize="inherit" sx={accountHierarchyTemplateStyles.wrapIcon} />
            {mdScreen && <Typography variant="body2">{t('my-account')}</Typography>}
          </Box>
          {!mdScreen && (
            <Box sx={accountHierarchyTemplateStyles.accountHierarchyTextBox}>
              <Typography variant="h2" sx={accountHierarchyTemplateStyles.accountHierarchyText}>
                {t('account-hierarchy')}
              </Typography>
            </Box>
          )}
        </Stack>
      </Grid>
      {mdScreen && (
        <Grid item xs={12} sm={6}>
          <Box sx={{ paddingTop: { md: '30px' } }}>
            <Typography variant="h1">{t('account-hierarchy')}</Typography>
          </Box>
        </Grid>
      )}
      <Grid container>
        <Grid item xs={12} md={12} marginTop={3}>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleAddChildAccount}
            disableElevation
            id="formOpenButton"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ width: { xs: '100%', md: 180 } }}
          >
            {t('add-child-account')}
          </Button>
        </Grid>
      </Grid>
      <AccountHierarchyTree
        accounts={b2BAccountHierarchyResult.accounts}
        hierarchy={b2BAccountHierarchyResult.hierarchy}
        role={B2BRoles.ADMIN}
      />
    </>
  )
}

export default AccountHierarchyTemplate
