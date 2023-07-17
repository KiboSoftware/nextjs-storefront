// Figma: https://www.figma.com/file/bKJuIwUx6VXmubHZo4rCBq/B2B?type=design&node-id=19-688&mode=design&t=MrZvIdPLzo5jsp19-0

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
  SxProps,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import getConfig from 'next/config'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { UsersTemplateStyle } from './UsersTemplate.styles'
import { SearchBar } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import UserFormDialog from '@/components/dialogs/UserFormDialog/UserFormDialog'
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
import {
  buildB2bUserRoleParams,
  buildCreateCustomerB2bUserParams,
  buildUpdateCustomerB2bUserParams,
  getPerPageItemText,
} from '@/lib/helpers'
import { B2BUserInput, CustomerB2BUserRole } from '@/lib/types/CustomerB2BUser'

import { B2BUser } from '@/lib/gql/types'
interface UsersTemplateProps {
  children?: React.ReactNode
}

interface AddUserButtonProps {
  isUserFormOpen: boolean
  onClick: () => void
  sx?: SxProps<Theme>
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

const AddUserButton = (props: AddUserButtonProps) => {
  const { isUserFormOpen, onClick, sx } = props
  const { t } = useTranslation('common')
  return (
    <Button
      variant="primary"
      disabled={isUserFormOpen}
      onClick={onClick}
      disableElevation
      id="formOpenButton"
      sx={sx}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <AddCircleOutlineIcon style={{ marginRight: '8px', width: '19px' }} />
        <span style={{ paddingTop: '2px', fontWeight: '400' }}>{t('add-user')}</span>
      </span>
    </Button>
  )
}

const UsersTemplate = (props: UsersTemplateProps) => {
  const {
    publicRuntimeConfig: {
      b2bUserRoles,
      debounceTimeout,
      b2bUserListing: { defaultPageSize, defaultStartIndex, defaultFilter },
    },
  } = getConfig()
  const userRoles = b2bUserRoles

  const theme = useTheme()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal } = useModalContext()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false)

  const [paginationState, setPaginationState] = useState({
    searchTerm: '',
    pageSize: defaultPageSize,
    startIndex: defaultStartIndex,
  })

  const { data, isLoading } = useGetB2BUserQueries({
    accountId: user?.id as number,
    filter: defaultFilter,
    pageSize: paginationState.pageSize,
    startIndex: paginationState.startIndex,
    q: useDebounce(paginationState.searchTerm, debounceTimeout),
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
      startIndex: defaultStartIndex,
    })
  }

  const handlePageChange = (event: ChangeEvent<any>, page: number) =>
    setPaginationState({
      ...paginationState,
      startIndex: (data?.pageSize ?? 0) * (page - 1),
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
          values: {
            ...formValues,
            role: previousRoles[0]?.roleName,
          },
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
    await addRoleToCustomerB2bAccount.mutateAsync({
      ...addRoleToCustomerB2bAccountVariables,
    })
  }

  const handleAddUserDesktopButtonClick = () => {
    setIsUserFormOpen(true)
  }

  const handleAddUserMobileButtonClick = () => {
    showModal({
      Component: UserFormDialog,
      props: {
        isEditMode: false,
        isUserFormInDialog: true,
        formTitle: t('add-new-user'),
        b2BUser: undefined,
        onSave: (b2BUserInput: B2BUserInput) => onAddUser(b2BUserInput),
        onClose: () => setIsUserFormOpen(false),
      },
    })
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '40px' }}>
        <BackButtonLink aria-label={t('my-account')} href="/my-account">
          <ChevronLeftIcon />
          {mdScreen && <Typography variant="body1">{t('my-account')}</Typography>}
        </BackButtonLink>
        <Box sx={UsersTemplateStyle.heading}>
          <Typography
            variant={mdScreen ? 'h1' : 'h2'}
            sx={{ textAlign: { xs: 'center' }, marginTop: { xs: '-3.6rem', md: 0 } }}
          >
            {t('users')}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={12}>
            {/* Button visible only in desktop view and on click, form will open below the button */}
            <AddUserButton
              sx={{ display: { xs: 'none', md: 'block' } }}
              isUserFormOpen={isUserFormOpen}
              onClick={handleAddUserDesktopButtonClick}
            />
            {/* Button visible only in mobile view, when form is not open and on click, form will open in dialog */}
            {!isUserFormOpen && (
              <AddUserButton
                sx={{ display: { xs: 'block', md: 'none' } }}
                isUserFormOpen={isUserFormOpen}
                onClick={handleAddUserMobileButtonClick}
              />
            )}
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

        {!user && isLoading ? (
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
                count={data?.pageCount ?? 0}
                shape={`rounded`}
                onChange={handlePageChange}
                size="small"
              />
              <Typography sx={UsersTemplateStyle.perPageItemText}>
                {getPerPageItemText({ data, mdScreen, displayText: t('displaying') })}
              </Typography>
            </PaginationContainer>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default UsersTemplate
