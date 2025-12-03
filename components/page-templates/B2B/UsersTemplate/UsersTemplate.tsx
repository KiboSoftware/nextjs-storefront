// Figma: https://www.figma.com/file/bKJuIwUx6VXmubHZo4rCBq/B2B?type=design&node-id=19-688&mode=design&t=MrZvIdPLzo5jsp19-0

import React, { ChangeEvent, useState } from 'react'

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
import { useDebounce, useGetB2BUserQueries, useRemoveCustomerB2bUserMutation } from '@/hooks'
import { Routes } from '@/lib/constants'
import { actions, b2bUserActions, getPerPageItemText, hasAnyPermission } from '@/lib/helpers'

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

/** Loading spinner container styles - extracted to prevent recreation on each render */
const LOADING_CONTAINER_STYLES = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const

/** Header container inline styles - extracted to prevent recreation */
const HEADER_CONTAINER_STYLES = {
  marginTop: '10px',
  marginBottom: '20px',
} as const

/** Button width styles - extracted to prevent recreation */
const ADD_BUTTON_WIDTH_STYLES = {
  width: { xs: '100%', md: 130 },
} as const

/**
 * Props for the UsersTemplate component
 */
interface UsersTemplateProps {
  /** Map of account IDs to user behavior/permission arrays */
  accountUserBehaviors?: Record<number, number[]>
}

/**
 * Pagination state structure
 */
interface PaginationState {
  searchTerm: string
  pageSize: number
  startIndex: number
}

/**
 * UsersTemplate Component
 * Enterprise-grade template for managing B2B users
 * Features: User listing, search, pagination, add/edit/delete operations
 * Optimized for minimal re-renders and maximum performance
 */
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

  const [paginationState, setPaginationState] = useState<PaginationState>({
    searchTerm: '',
    pageSize: defaultPageSize,
    startIndex: defaultStartIndex,
  })
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * Fetch B2B users with pagination and search
   * Uses debounced search term to prevent excessive API calls
   */
  const { data, isLoading } = useGetB2BUserQueries({
    accountId: user?.id as number,
    filter: defaultFilter,
    pageSize: paginationState.pageSize,
    startIndex: paginationState.startIndex,
    q: useDebounce(paginationState.searchTerm, debounceTimeout),
    isB2BUser: true,
  })

  const { removeCustomerB2bUser } = useRemoveCustomerB2bUserMutation()

  /**
   * Handle user deletion with confirmation dialog
   * Shows modal before executing delete operation
   * Resets to first page after successful deletion
   */
  const handleDelete = React.useCallback(
    (id: string | undefined | null) => {
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
              removeCustomerB2bUser.mutate(
                { ...queryVars },
                {
                  onSuccess: () => {
                    // Reset to first page after successful deletion
                    setPaginationState((prev) => ({
                      ...prev,
                      startIndex: defaultStartIndex,
                    }))
                    setCurrentPage(1)
                  },
                }
              )
            } catch (error) {
              console.error('[UsersTemplate] Error deleting user:', error)
            }
          },
        },
      })
    },
    [showModal, t, user?.id, removeCustomerB2bUser, defaultStartIndex]
  )

  /**
   * Handle search input changes
   * Resets pagination to first page when search term changes
   * Uses functional state update to avoid stale closure issues
   */
  const handleSearch = React.useCallback(
    (searchText: string) => {
      setPaginationState((prev) => ({
        ...prev,
        searchTerm: searchText,
        startIndex: defaultStartIndex,
      }))
      setCurrentPage(1)
    },
    [defaultStartIndex]
  )

  /**
   * Handle pagination page changes
   * Calculates new startIndex based on page number and page size
   */
  const handlePageChange = React.useCallback(
    (_event: ChangeEvent<unknown>, page: number) => {
      setPaginationState((prev) => ({
        ...prev,
        startIndex: (data?.pageSize ?? 0) * (page - 1),
      }))
      setCurrentPage(page)
    },
    [data?.pageSize]
  )

  /**
   * Navigate to add user page
   * Stable callback prevents unnecessary re-renders
   */
  const handleAddUser = React.useCallback(() => {
    router.push(Routes.AddUser)
  }, [router])

  /**
   * Check if current user has permission to add new users
   * Memoized to prevent recalculation on every render
   */
  const hasAddUserPermission = React.useMemo(() => hasAnyPermission(actions.CREATE_ACCOUNT), [])

  return (
    <Grid>
      <Grid item style={HEADER_CONTAINER_STYLES}>
        <Box sx={UsersTemplateStyle.heading}>
          <BackButtonLink aria-label={t('my-account')} href="/my-account">
            <ChevronLeftIcon />
            {mdScreen && <Typography variant="body1">{t('my-account')}</Typography>}
          </BackButtonLink>
          <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('users')}</Typography>
        </Box>
        <NoSsr>
          {hasAnyPermission(actions.CREATE_USERS, b2bUserActions.ADD_BUYER) && (
            <Grid container>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleAddUser}
                  disableElevation
                  id="formOpenButton"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={ADD_BUTTON_WIDTH_STYLES}
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
          <Box style={LOADING_CONTAINER_STYLES}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <UserTable
              mdScreen={mdScreen}
              b2bUsers={data?.items as B2BUser[]}
              onDelete={handleDelete}
              accountUserBehaviors={accountUserBehaviors}
              userId={user?.id}
            />
            <PaginationContainer>
              <Pagination
                count={data?.pageCount ?? 0}
                page={currentPage}
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
