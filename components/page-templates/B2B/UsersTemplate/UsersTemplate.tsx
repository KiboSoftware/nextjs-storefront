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
  NoSsr,
  Pagination,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { UsersTemplateStyle } from './UsersTemplate.styles'
import { UserTable } from '@/components/b2b'
import { SearchBar } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { useAuthContext, useModalContext } from '@/context'
import {
  useDebounce,
  useGetB2BUserQueries,
  useRemoveCustomerB2bUserMutation,
} from '@/hooks'
import { CustomBehaviors, Routes } from '@/lib/constants'
import {
  actions,
  getPerPageItemText,
  hasB2BPermissions,
  hasPermission,
} from '@/lib/helpers'

import { B2BUser } from '@/lib/gql/types'

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

interface UsersTemplateProps {
  accountUserBehaviors?: Record<number, number[]>
}

const UsersTemplate = ({ accountUserBehaviors }: UsersTemplateProps) => {
  const {
    publicRuntimeConfig: {
      debounceTimeout,
      b2bUserListing: { defaultPageSize, defaultStartIndex, defaultFilter },
    },
  } = getConfig()

  const theme = useTheme()
  const { user } = useAuthContext()
  const { t } = useTranslation('common')
  const { showModal } = useModalContext()
  const router = useRouter()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

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
    isB2BUser: true,
  })

  const { removeCustomerB2bUser } = useRemoveCustomerB2bUserMutation()

  const handleDelete = (id: string | undefined | null) => {
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: t('delete-user-confirmation-text'),
        primaryButtonText: t('yes-remove'),
        title: t('confirmation'),
        onConfirm: () => {
          const accountId = user?.id
          const queryVars = { accountId, userId: id }
          try {
            removeCustomerB2bUser.mutate({ ...queryVars })
          } catch (e) {
            console.error(e)
          }
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

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) =>
    setPaginationState({
      ...paginationState,
      startIndex: (data?.pageSize ?? 0) * (page - 1),
    })

  const handleAddUserButtonClick = () => {
    // Navigate to the add user page instead of showing modal
    router.push(Routes.AddUser)
  }

  // Check if user has add user permission (CustomBehaviors.AddUser = 1000 || B2B permission Add User = 2000)
  const hasAddUserPermission = hasB2BPermissions(CustomBehaviors.AddUser, accountUserBehaviors, user?.id)

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '20px' }}>
        <Box sx={UsersTemplateStyle.heading}>
          <BackButtonLink aria-label={t('my-account')} href="/my-account">
            <ChevronLeftIcon />
            {mdScreen && <Typography variant="body1">{t('my-account')}</Typography>}
          </BackButtonLink>
          <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('users')}</Typography>
        </Box>
        <NoSsr>
          {(hasPermission(actions.CREATE_ACCOUNT) || hasAddUserPermission) && (
            <Grid container>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleAddUserButtonClick}
                  disableElevation
                  id="formOpenButton"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ width: { xs: '100%', md: 118 } }}
                >
                  {t('add-user')}
                </Button>
              </Grid>
            </Grid>
          )}
        </NoSsr>
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
              mdScreen={mdScreen}
              b2bUsers={data?.items as B2BUser[]}
              onDelete={handleDelete}
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
