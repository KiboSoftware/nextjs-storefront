import React, { useEffect, useState } from 'react'

import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AccountHierarchyTree, QuotesTable, UserTable } from '@/components/b2b'
import {
  AccountHierarchyFormDialog,
  AccountHierarchyChangeParentDialog,
  ConfirmationDialog,
  ViewAccountDetailsDialog,
  ViewUserDetailDialog,
} from '@/components/dialogs'
import { MobileB2BLayout } from '@/components/layout'
import { useAuthContext, useModalContext } from '@/context'
import {
  useB2BQuote,
  useChangeB2bAccountParentMutation,
  useCreateCustomerB2bAccountMutation,
  useGetB2BAccountHierarchy,
  useGetB2BUserQueries,
  useGetQuotes,
  useUpdateCustomerB2bAccountMutation,
  useUpdateCustomerB2bUserMutation,
} from '@/hooks'
import { userGetters } from '@/lib/getters'
import {
  buildAccountHierarchy,
  buildCreateCustomerB2bAccountParams,
  buildUpdateCustomerB2bAccountParams,
  buildUpdateCustomerB2bUserParams,
  parseFilterParamToObject,
} from '@/lib/helpers'
import {
  AddChildAccountProps,
  B2BAccountHierarchyResult,
  CreateCustomerB2bAccountParams,
  EditChildAccountProps,
  HierarchyTree,
} from '@/lib/types'

import { B2BAccount, B2BUser, CustomerAccount } from '@/lib/gql/types'

interface AccountHierarchyTemplateProps {
  initialData?: B2BAccountHierarchyResult
}

const AccountHierarchyTemplate = (props: AccountHierarchyTemplateProps) => {
  const { initialData } = props
  const theme = useTheme()
  const router = useRouter()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { b2BAccountHierarchy } = useGetB2BAccountHierarchy(user?.id as number, initialData)
  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()
  const { updateCustomerB2bAccount } = useUpdateCustomerB2bAccountMutation()
  const { updateCustomerB2bUser } = useUpdateCustomerB2bUserMutation()
  const { changeB2bAccountParent } = useChangeB2bAccountParentMutation(user?.id as number)
  const { data: currentB2bUser } = useGetB2BUserQueries({
    accountId: user?.id as number,
    filter: '',
    pageSize: 5,
    startIndex: 0,
    q: user?.userName as string,
  })

  const [accountHierarchy, setAccountHierarchy] = useState<B2BAccountHierarchyResult>(
    b2BAccountHierarchy as B2BAccountHierarchyResult
  )

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

  const [b2bUsers, setB2bUsers] = useState<B2BUser[]>([])

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
    const b2BUser = account?.users?.[0]
    const accountParams = buildUpdateCustomerB2bAccountParams(formValues, account)
    const userParams = buildUpdateCustomerB2bUserParams({
      user,
      b2BUser,
      values: { ...formValues, isActive: b2BUser?.isActive },
    })

    const updateCustomerB2BAccount = await updateCustomerB2bAccount.mutateAsync({
      ...accountParams,
    })
    const updateCustomerB2BUser = await updateCustomerB2bUser.mutateAsync({
      ...userParams,
    })
    if (updateCustomerB2BAccount && updateCustomerB2BUser) closeModal()
  }

  const handleB2bAccountParentChange = async (accountId: number, parentAccountId: number) => {
    await changeB2bAccountParent.mutateAsync({ accountId, parentAccountId })
    closeModal()
  }

  const handleAddAccount = ({ isAddingAccountToChild, accounts }: AddChildAccountProps) => {
    showModal({
      Component: AccountHierarchyFormDialog,
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
      Component: AccountHierarchyFormDialog,
      props: {
        accounts,
        b2BAccount,
        formTitle: t('edit-child-account'),
        primaryButtonText: t('update-account'),
        onSave: (formValues: CreateCustomerB2bAccountParams) =>
          handleEditAccountFormSubmit(formValues, b2BAccount),
        onClose: () => closeModal(),
      },
    })
  }

  const handleChangeParent = ({ accounts, b2BAccount }: EditChildAccountProps) => {
    showModal({
      Component: AccountHierarchyChangeParentDialog,
      props: {
        accounts,
        b2BAccount,
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

  const handleAddChildAccount = () => {
    showModal({
      Component: AccountHierarchyFormDialog,
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

  const handleViewAccountUser = (b2BUser: B2BUser) => {
    showModal({
      Component: ViewUserDetailDialog,
      props: {
        b2BUser,
        title: t('confirmation'),
        onClose: () => closeModal(),
      },
    })
  }

  const handleBuyersBtnClick = (users: B2BUser[]) => {
    setB2bUsers(users)
    setActiveComponent('buyers')
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
    const hierarchy = buildAccountHierarchy(b2BAccountHierarchy?.accounts) as HierarchyTree[]
    setAccountHierarchy({
      accounts: b2BAccountHierarchy?.accounts,
      hierarchy,
    })
  }, [b2BAccountHierarchy, currentB2bUser])

  return (
    <Grid container gap={3}>
      <MobileB2BLayout
        headerText={
          activeBreadCrumb?.key === 'accountHierarchy'
            ? t('account-hierarchy')
            : t(activeBreadCrumb?.key)
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
              role={userGetters.getRole(currentB2bUser?.items?.[0] as B2BUser)}
              customerAccount={user as CustomerAccount}
              accounts={accountHierarchy.accounts}
              hierarchy={accountHierarchy.hierarchy}
              handleViewAccount={handleViewAccount}
              handleAddAccount={handleAddAccount}
              handleEditAccount={handleEditAccount}
              handleChangeParent={handleChangeParent}
              handleSwapAccount={handleSwapAccount}
              handleBuyersBtnClick={handleBuyersBtnClick}
              handleQuotesBtnClick={handleQuotesBtnClick}
              setAccountHierarchy={setAccountHierarchy}
            />
          </Grid>
        </>
      )}

      {activeComponent === 'quotes' && (
        <QuotesTable
          quoteCollection={quoteCollection}
          sortingValues={sortingValues}
          filters={parseFilterParamToObject(quotesSearchParam.filter as string)}
          showActionButtons={false}
          setQuotesSearchParam={handleQuotesSearchParam}
        />
      )}

      {activeComponent === 'buyers' && (
        <UserTable
          mdScreen={mdScreen}
          b2bUsers={b2bUsers}
          onView={handleViewAccountUser}
          showActionButtons={false}
        />
      )}
    </Grid>
  )
}

export default AccountHierarchyTemplate
