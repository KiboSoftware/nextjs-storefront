import { ChangeEvent, useState } from 'react'

import {
  ChevronLeft as ChevronLeftIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { GetServerSidePropsContext, NextPage } from 'next'
import getConfig from 'next/config'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SearchBar } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { UserTable } from '@/components/my-account'
import UserForm from '@/components/my-account/User/UserForm/UserForm'
import { useAuthContext, useModalContext } from '@/context'
import {
  useAddRoleToCustomerB2bAccountMutation,
  useCreateCustomerB2bUserMutation,
  useDebounce,
  useDeleteB2bAccountRoleMutation,
  useGetB2BUserQueries,
  useRemoveCustomerB2bUserMutation,
  useUpdateCustomerB2bUserMutation,
} from '@/hooks'
import '@tanstack/react-query-devtools'
import { buildB2bUserRoleParams } from '@/lib/helpers/buildB2bUserRoleParams'
import { buildCreateCustomerB2bUserParams } from '@/lib/helpers/buildCreateCustomerB2bUserParams'
import { buildUpdateCustomerB2bUserParams } from '@/lib/helpers/buildUpdateCustomerB2bUserParams'
import { getPerPageItemText } from '@/lib/helpers/getPerPageItemText'
import { B2BUserInput, CustomerB2BUserRole } from '@/lib/types/CustomerB2BUser'

import { B2BUser } from '@/lib/gql/types'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const BackButtonLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  typography: 'body2',
  textDecoration: 'none',
  color: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0rem',
  cursor: 'pointer',
}))

const SearchBoxContainer = styled(Box)({
  marginBottom: '20px',
  width: '100%',
})

const PaginationContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.grey[600],
  alignItems: 'center',
  margin: '20px 0',
}))

const style = {
  heading: {
    display: { md: 'flex', xs: 'block' },
    alignItems: 'center',
    margin: '1rem 0',
  },
  perPageItemText: {
    textAlign: 'end',
    width: { xs: '10rem', md: '12rem' },
    fontSize: { xs: '0.9rem', md: '1rem' },
  },
}

const UsersPage: NextPage = () => {
  const { publicRuntimeConfig } = getConfig()
  const userRoles = publicRuntimeConfig.b2bUserRoles

  const theme = useTheme()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false)

  const [paginationState, setPaginationState] = useState({
    searchTerm: '',
    pageSize: publicRuntimeConfig.b2bUserListing.defaultPageSize,
    startIndex: publicRuntimeConfig.b2bUserListing.defaultStartIndex,
  })

  const { data, isLoading } = useGetB2BUserQueries({
    accountId: user?.id as number,
    filter: publicRuntimeConfig.b2bUserListing.defaultFilter,
    pageSize: paginationState.pageSize,
    startIndex: paginationState.startIndex,
    q: useDebounce(paginationState.searchTerm, publicRuntimeConfig.debounceTimeout),
  })

  const { removeCustomerB2bUser } = useRemoveCustomerB2bUserMutation()
  const { createCustomerB2bUser } = useCreateCustomerB2bUserMutation()
  const { addRoleToCustomerB2bAccount } = useAddRoleToCustomerB2bAccountMutation()
  const { updateCustomerB2bUser } = useUpdateCustomerB2bUserMutation()
  const { deleteB2bAccountUserRole } = useDeleteB2bAccountRoleMutation()

  const confirmDelete = (id: string | undefined | null) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: t('delete-user-confirmation-text'),
        primaryButtonText: t('delete'),
        onConfirm: () => {
          const accountId = user?.id
          const queryVars = { accountId, userId: id }
          removeCustomerB2bUser.mutateAsync({ ...queryVars })
        },
      },
    })
  }

  const handleSearch = (searchText: string) => {
    setPaginationState({
      ...paginationState,
      searchTerm: searchText,
      startIndex: publicRuntimeConfig.b2bUserListing.defaultStartIndex,
    })
  }

  const handlePageChange = (event: ChangeEvent<any>, page: number) =>
    setPaginationState({
      ...paginationState,
      startIndex: (data?.pageSize || 0) * (page - 1),
    })

  const onAddUser = async (formValues: B2BUserInput) => {
    const variables = buildCreateCustomerB2bUserParams({ user, values: formValues })
    const createUserResponse = await createCustomerB2bUser.mutateAsync({
      ...variables,
    })
    if (createUserResponse?.userId) {
      addRoleToB2bUser(createUserResponse, formValues)
    }
  }

  const onUpdateUser = async (formValues: B2BUserInput, b2BUser?: B2BUser | undefined) => {
    const variables = buildUpdateCustomerB2bUserParams({ user, b2BUser, values: formValues })
    const updateUserResponse = await updateCustomerB2bUser.mutateAsync({
      ...variables,
    })
    const previousRoles = b2BUser?.roles as CustomerB2BUserRole[]
    if (
      updateUserResponse &&
      previousRoles &&
      previousRoles.length &&
      formValues.role !== previousRoles[0]?.roleName
    ) {
      await deleteB2bAccountUserRole.mutateAsync(
        buildB2bUserRoleParams({
          user,
          b2BUser,
          values: { role: previousRoles[0]?.roleName },
          roles: userRoles,
        })
      )
    }
    addRoleToB2bUser(updateUserResponse, formValues)
  }

  const addRoleToB2bUser = async (b2BUser: B2BUser, formValues: any) => {
    const addRoleToCustomerB2bAccountVariables = buildB2bUserRoleParams({
      user,
      b2BUser: b2BUser,
      values: formValues,
      roles: userRoles,
    })
    console.log(addRoleToCustomerB2bAccountVariables)
    await addRoleToCustomerB2bAccount.mutateAsync({
      ...addRoleToCustomerB2bAccountVariables,
    })
  }

  const AddUserButton = () => {
    return (
      <Button
        variant="primary"
        disabled={isUserFormOpen}
        onClick={() => setIsUserFormOpen(true)}
        disableElevation
        id="formOpenButton"
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <AddCircleOutlineIcon style={{ marginRight: '8px', width: '19px' }} />
          <span style={{ paddingTop: '2px', fontWeight: '400' }}>{t('add-user')}</span>
        </span>
      </Button>
    )
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '40px' }}>
        <BackButtonLink aria-label={t('my-account')} href="/my-account">
          <ChevronLeftIcon />
          {mdScreen && <Typography variant="body1">{t('my-account')}</Typography>}
        </BackButtonLink>
        <Box sx={style.heading}>
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ textAlign: { xs: 'center' }, marginTop: { xs: '-3.6rem', md: 0 } }}
          >
            {t('users')}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={12}>
            {mdScreen && <AddUserButton />}
            {!mdScreen && !isUserFormOpen && <AddUserButton />}
            {isUserFormOpen && (
              <UserForm
                isEditMode={false}
                onSave={onAddUser}
                onClose={() => setIsUserFormOpen(false)}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <SearchBoxContainer>
          <SearchBar
            onSearch={handleSearch}
            placeHolder={t('user-search-placeholder')}
            searchTerm={paginationState.searchTerm}
            showClearButton={true}
          />
        </SearchBoxContainer>

        {isLoading ? (
          <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <UserTable
              b2bUsers={data?.items as B2BUser[]}
              onSave={onUpdateUser}
              onDelete={confirmDelete}
            />
            <PaginationContainer>
              <Pagination
                count={data?.pageCount || 0}
                shape={`rounded`}
                onChange={handlePageChange}
                size="small"
              />
              <Typography sx={style.perPageItemText}>
                {getPerPageItemText({ data, mdScreen, displayText: t('displaying') })}
              </Typography>
            </PaginationContainer>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default UsersPage
