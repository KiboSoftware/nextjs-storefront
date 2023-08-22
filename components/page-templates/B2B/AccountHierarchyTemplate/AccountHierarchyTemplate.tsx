import { useEffect, useState } from 'react'

import { ArrowBackIos, AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { accountHierarchyTemplateStyles } from './AccountHierarchyTemplate.styles'
import { AccountHierarchyTree } from '@/components/b2b'
import {
  AccountHierarchyAddFormDialog,
  AccountHierarchyChangeParentDialog,
  ConfirmationDialog,
  ViewAccountDetailsDialog,
} from '@/components/dialogs'
import { useAuthContext, useModalContext } from '@/context'
import {
  useChangeB2bAccountParentMutation,
  useCreateCustomerB2bAccountMutation,
  useGetB2BAccountHierachyQueries,
  useGetB2BUserQueries,
  useUpdateCustomerB2bAccountMutation,
} from '@/hooks'
import { userGetters } from '@/lib/getters'
import {
  buildAccountHierarchy,
  buildCreateCustomerB2bAccountParams,
  buildUpdateCustomerB2bAccountParams,
} from '@/lib/helpers'
import {
  AddChildAccountProps,
  CreateCustomerB2bAccountParams,
  EditChildAccountProps,
  HierarchyNode,
} from '@/lib/types'

import { B2BAccount, B2BUser } from '@/lib/gql/types'

const AccountHierarchyTemplate = () => {
  const theme = useTheme()
  const router = useRouter()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { b2BAccountHierarchy } = useGetB2BAccountHierachyQueries(user?.id as number)
  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()
  const { updateCustomerB2bAccount } = useUpdateCustomerB2bAccountMutation()
  const { changeB2bAccountParent } = useChangeB2bAccountParentMutation()
  const { data } = useGetB2BUserQueries({
    accountId: user?.id as number,
    filter: '',
    pageSize: 5,
    startIndex: 0,
    q: user?.userName as string,
  })

  const [accountHierarchy, setAccountHierarchy] = useState<{
    accounts: B2BAccount[]
    hierarchy: HierarchyNode[] | undefined
  }>({
    accounts: [],
    hierarchy: undefined,
  })
  useEffect(() => {
    if (!b2BAccountHierarchy) return
    const hierarchy = buildAccountHierarchy(b2BAccountHierarchy?.accounts)
    setAccountHierarchy({
      accounts: b2BAccountHierarchy?.accounts,
      hierarchy,
    })
  }, [b2BAccountHierarchy, data])

  const onAccountTitleClick = () => {
    router.push('/my-account')
  }

  const handleAddAccountFormSubmit = async (formValues: CreateCustomerB2bAccountParams) => {
    const variables = buildCreateCustomerB2bAccountParams({
      ...formValues,
    })
    const createCustomerB2BAccount = await createCustomerB2bAccount.mutateAsync({
      ...variables,
    })
    if (createCustomerB2BAccount) closeModal()
  }

  const handleEditAccountFormSubmit = async (
    formValues: CreateCustomerB2bAccountParams,
    account: B2BAccount
  ) => {
    const variables = buildUpdateCustomerB2bAccountParams(formValues, account)
    const updateCustomerB2BAccount = await updateCustomerB2bAccount.mutateAsync({
      ...variables,
    })
    if (updateCustomerB2BAccount) closeModal()
  }

  const handleB2bAccountParentChange = async (accountId: number, parentAccountId: number) => {
    await changeB2bAccountParent.mutateAsync({ accountId, parentAccountId })
    closeModal()
  }

  const handleAddAccount = ({ isAddingAccountToChild, accounts }: AddChildAccountProps) => {
    showModal({
      Component: AccountHierarchyAddFormDialog,
      props: {
        accounts,
        isAddingAccountToChild,
        primaryButtonText: t('create-account'),
        onSave: (formValues: CreateCustomerB2bAccountParams) =>
          handleAddAccountFormSubmit(formValues),
        onClose: () => closeModal(),
      },
    })
  }

  const handleEditAccount = ({ accounts, b2BAccount }: EditChildAccountProps) => {
    showModal({
      Component: AccountHierarchyChangeParentDialog,
      props: {
        accounts,
        b2BAccount,
        primaryButtonText: t('save'),
        formTitle: t('edit-child-account'),
        onSave: (accountId: number, parentAccountId: number) =>
          handleB2bAccountParentChange(accountId, parentAccountId),
        onClose: () => closeModal(),
      },
    })
  }

  const handleViewAccount = (b2BAccount: B2BAccount) => {
    showModal({
      Component: ViewAccountDetailsDialog,
      props: {
        b2BAccount,
        onClose: () => closeModal(),
      },
    })
  }

  const handleSwapAccount = (accountId: number, parentAccountId: number) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: t('swap-account-hierarchy-text'),
        primaryButtonText: t('yes-move-anyway'),
        title: t('swap-account-hierarchy'),
        onConfirm: () => handleB2bAccountParentChange(accountId, parentAccountId),
        onClose: () => closeModal(),
      },
    })
  }

  const handleDisableAccount = (b2BAccount: B2BAccount) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: t('disable-account-confirm-message'),
        primaryButtonText: t('yes-remove'),
        title: t('confirmation'),
        onConfirm: () => console.log('account disabled'),
        onClose: () => closeModal(),
      },
    })
  }

  const handleAddChildAccount = () => {
    showModal({
      Component: AccountHierarchyAddFormDialog,
      props: {
        accounts: accountHierarchy.accounts,
        isAddingAccountToChild: false,
        primaryButtonText: t('create-account'),
        title: t('confirmation'),
        onSave: handleAddAccountFormSubmit,
        onClose: () => closeModal(),
      },
    })
  }

  const handleBuyersBtnClick = () => {
    console.log('buyers button clicked')
  }

  const handleQuotesBtnClick = () => {
    console.log('quotes button clicked')
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
        <Grid item xs={12} md={12} sx={{ ...accountHierarchyTemplateStyles.buttonGroupGridStyle }}>
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
        role={userGetters.getRole(data?.items?.[0] as B2BUser)}
        accounts={accountHierarchy.accounts}
        hierarchy={accountHierarchy.hierarchy}
        handleViewAccount={handleViewAccount}
        handleAddAccount={handleAddAccount}
        handleEditAccount={handleEditAccount}
        handleSwapAccount={handleSwapAccount}
        handleDisableAccount={handleDisableAccount}
        handleBuyersBtnClick={handleBuyersBtnClick}
        handleQuotesBtnClick={handleQuotesBtnClick}
      />
    </>
  )
}

export default AccountHierarchyTemplate
