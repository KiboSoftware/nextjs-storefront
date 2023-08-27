import React, { useEffect, useState } from 'react'

import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AccountHierarchyTree, QuotesTable } from '@/components/b2b'
import {
  AccountHierarchyAddFormDialog,
  AccountHierarchyChangeParentDialog,
  ConfirmationDialog,
  ViewAccountDetailsDialog,
} from '@/components/dialogs'
import MobileB2BLayout from '@/components/layout/MobileB2BLayout/MobileB2BLayout'
import { useAuthContext, useModalContext } from '@/context'
import {
  useB2BQuote,
  useChangeB2bAccountParentMutation,
  useCreateCustomerB2bAccountMutation,
  useGetB2BAccountHierarchy,
  useGetB2BUserQueries,
  useGetQuotes,
  useUpdateCustomerB2bAccountMutation,
} from '@/hooks'
import { userGetters } from '@/lib/getters'
import {
  buildAccountHierarchy,
  buildCreateCustomerB2bAccountParams,
  buildUpdateCustomerB2bAccountParams,
  parseFilterParamToObject,
} from '@/lib/helpers'
import {
  AddChildAccountProps,
  CreateCustomerB2bAccountParams,
  EditChildAccountProps,
  HierarchyNode,
} from '@/lib/types'

import { B2BAccount, B2BUser } from '@/lib/gql/types'

// Add this to achieve Mobile Layout

const AccountHierarchyTemplate = () => {
  const theme = useTheme()
  const router = useRouter()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { b2BAccountHierarchy } = useGetB2BAccountHierarchy(user?.id as number)
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

  // Add this to achieve Mobile Layout
  const breadcrumbList = [
    { key: 'accountHierarchy', backText: t('my-account'), redirectURL: '/my-account' },
    {
      key: 'buyers',
      backText: t('account-hierarchy'),
      redirectURL: '/my-account/b2b/account-hierarchy',
    },
    {
      key: 'quotes',
      backText: t('account-hierarchy'),
      redirectURL: '/my-account/b2b/account-hierarchy',
    },
  ]
  const [activeComponent, setActiveComponent] = useState('accountHierarchy')
  const activeBreadCrumb = breadcrumbList.filter((item) => item.key === activeComponent)[0]

  // Add this to achieve Mobile Layout
  const onBackClick = () => {
    router.push(activeBreadCrumb.redirectURL)
    setActiveComponent('accountHierarchy')
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

  const { quotesSearchParam, sortingValues, handleQuotesSearchParam } = useB2BQuote()

  const { data: quoteCollection } = useGetQuotes(quotesSearchParam)

  const handleQuotesBtnClick = (id: number) => {
    handleQuotesSearchParam({
      filter: `customerAccountId eq ${id}`,
    })
    setActiveComponent('quotes')
  }

  useEffect(() => {
    if (!b2BAccountHierarchy) return
    const hierarchy = buildAccountHierarchy(b2BAccountHierarchy?.accounts)
    setAccountHierarchy({
      accounts: b2BAccountHierarchy?.accounts,
      hierarchy,
    })
  }, [b2BAccountHierarchy, data])

  return (
    <Grid container gap={3}>
      <MobileB2BLayout
        headerText={
          activeBreadCrumb?.key === 'accountHierarchy'
            ? t('account-hierarchy')
            : activeBreadCrumb?.key === 'quotes'
            ? t('quotes')
            : t('buyers')
        }
        backText={activeBreadCrumb?.backText}
        onBackClick={onBackClick}
      />

      {activeComponent === 'accountHierarchy' && (
        <>
          <Grid item xs={12}>
            <Box width={'100%'}>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleAddChildAccount}
                disableElevation
                id="formOpenButton"
                startIcon={<AddCircleOutline />}
                {...(!mdScreen && { fullWidth: true })}
              >
                {t('add-child-account')}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </>
      )}

      {activeComponent === 'quotes' && (
        <QuotesTable
          quoteCollection={quoteCollection}
          sortingValues={sortingValues}
          filters={parseFilterParamToObject(quotesSearchParam.filter as string)}
          setQuotesSearchParam={handleQuotesSearchParam}
        />
      )}
    </Grid>
  )
}

export default AccountHierarchyTemplate
