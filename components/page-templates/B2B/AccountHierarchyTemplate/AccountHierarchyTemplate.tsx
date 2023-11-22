import React, { useEffect, useState } from 'react'

import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Grid, NoSsr, Typography, useMediaQuery, useTheme } from '@mui/material'
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
import { useModalContext } from '@/context'
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
import {
  actions,
  buildAccountHierarchy,
  buildCreateCustomerB2bAccountParams,
  buildUpdateCustomerB2bAccountParams,
  buildUpdateCustomerB2bUserParams,
  filterAccountsByDisableSorting,
  hasPermission,
  parseFilterParamToObject,
} from '@/lib/helpers'
import {
  AddChildAccountProps,
  B2BAccountHierarchyResult,
  CreateCustomerB2bAccountParams,
  HierarchyTree,
} from '@/lib/types'

import { B2BAccount, B2BUser, CustomerAccount } from '@/lib/gql/types'

interface AccountHierarchyTemplateProps {
  initialData?: B2BAccountHierarchyResult
  user?: CustomerAccount
}

const AccountHierarchyTemplate = (props: AccountHierarchyTemplateProps) => {
  const { initialData, user } = props
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const [selectedAccountId, setSelectedAccountId] = useState<number>()

  const { data: b2bUsers } = useGetB2BUserQueries({
    accountId: selectedAccountId as number,
    filter: 'isRemoved eq false',
    sortBy: 'createDate asc',
    isB2BUser: true,
  })

  // filtering the sortable accounts
  const filteredAccounts = filterAccountsByDisableSorting(
    initialData?.hierarchy as HierarchyTree[],
    initialData?.accounts as B2BAccount[]
  )

  const { b2BAccountHierarchy } = useGetB2BAccountHierarchy(user?.id as number, initialData)
  const { createCustomerB2bAccount } = useCreateCustomerB2bAccountMutation()
  const { updateCustomerB2bAccount } = useUpdateCustomerB2bAccountMutation()
  const { updateCustomerB2bUser } = useUpdateCustomerB2bUserMutation()
  const { changeB2bAccountParent } = useChangeB2bAccountParentMutation(user?.id as number)

  const [accountHierarchy, setAccountHierarchy] = useState<B2BAccountHierarchyResult>(
    b2BAccountHierarchy as B2BAccountHierarchyResult
  )

  const getParentAccounts = (currentAccount?: B2BAccount) => {
    if (!currentAccount && !filteredAccounts.length) {
      return [
        {
          companyOrOrganization: user?.companyOrOrganization,
          id: user?.id,
        },
      ]
    }
    const excludedParentAccounts: number[] = []
    return filteredAccounts.filter((account) => {
      if (
        account.id !== currentAccount?.parentAccountId &&
        account.id !== currentAccount?.id &&
        account.parentAccountId !== currentAccount?.id &&
        !excludedParentAccounts.includes(account.parentAccountId as number)
      ) {
        return account
      } else {
        if (account.id === currentAccount?.parentAccountId) return
        excludedParentAccounts.push(account.id)
      }
    })
  }

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
    try {
      const variables = buildCreateCustomerB2bAccountParams(
        {
          ...formValues,
        },
        true
      )
      const createCustomerB2BAccount = await createCustomerB2bAccount.mutateAsync({
        ...variables,
      })
      if (createCustomerB2BAccount) closeModal()
    } catch (e) {
      console.error(e)
    }
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
    try {
      await changeB2bAccountParent.mutateAsync({ accountId, parentAccountId })
      closeModal()
    } catch (e) {
      console.error(e)
    }
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

  const handleEditAccount = (b2BAccount: B2BAccount) => {
    showModal({
      Component: AccountHierarchyFormDialog,
      props: {
        accounts: getParentAccounts(b2BAccount),
        b2BAccount,
        formTitle: t('edit-child-account'),
        primaryButtonText: t('update-account'),
        onSave: (formValues: CreateCustomerB2bAccountParams) =>
          handleEditAccountFormSubmit(formValues, b2BAccount),
        onClose: () => closeModal(),
      },
    })
  }

  const handleChangeParent = (b2BAccount: B2BAccount) => {
    showModal({
      Component: AccountHierarchyChangeParentDialog,
      props: {
        accounts: getParentAccounts(b2BAccount),
        parentAccount: filteredAccounts?.find(
          (account: B2BAccount) => account.id === b2BAccount?.parentAccountId
        ),
        formTitle: t('edit-child-account'),
        onSave: (parentAccountId: number) =>
          handleB2bAccountParentChange(b2BAccount.id, parentAccountId),
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
        accounts: getParentAccounts(),
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

  const handleBuyersBtnClick = (id: number) => {
    setSelectedAccountId(id)
    setActiveComponent('buyers')
  }

  const { quotesSearchParam, sortingValues, handleQuotesSearchParam } = useB2BQuote({
    accountId: user?.id,
  })

  const { data: quoteCollection } = useGetQuotes(quotesSearchParam)

  const handleQuotesBtnClick = (id: number) => {
    handleQuotesSearchParam({
      filter: `customerAccountId eq ${id}`,
    })
    setActiveComponent('quotes')
  }

  useEffect(() => {
    if (!b2BAccountHierarchy) return

    const hierarchy = buildAccountHierarchy(
      b2BAccountHierarchy?.accounts,
      user?.id as number
    ) as HierarchyTree[]

    if (hierarchy) {
      setAccountHierarchy({
        accounts: b2BAccountHierarchy?.accounts,
        hierarchy,
      })
    }
  }, [b2BAccountHierarchy, user?.id])

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
              <NoSsr>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleAddChildAccount}
                  disableElevation
                  id="formOpenButton"
                  startIcon={<AddCircleOutline />}
                  disabled={!hasPermission(actions.CREATE_ACCOUNT)}
                  {...(!mdScreen && { fullWidth: true })}
                >
                  {t('add-child-account')}
                </Button>
              </NoSsr>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {initialData?.accounts?.length === 0 ? (
              <Box>
                <Typography variant="body2">{t('no-hierarchy-found')}</Typography>
              </Box>
            ) : (
              <NoSsr>
                <AccountHierarchyTree
                  customerAccount={user as CustomerAccount}
                  accounts={accountHierarchy?.accounts}
                  hierarchy={accountHierarchy?.hierarchy}
                  handleViewAccount={handleViewAccount}
                  handleAddAccount={handleAddAccount}
                  handleEditAccount={handleEditAccount}
                  handleChangeParent={handleChangeParent}
                  handleSwapAccount={handleSwapAccount}
                  handleBuyersBtnClick={handleBuyersBtnClick}
                  handleQuotesBtnClick={handleQuotesBtnClick}
                  setAccountHierarchy={setAccountHierarchy}
                />
              </NoSsr>
            )}
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
          b2bUsers={b2bUsers?.items as B2BUser[]}
          onView={handleViewAccountUser}
          showActionButtons={false}
        />
      )}
    </Grid>
  )
}

export default AccountHierarchyTemplate
