import React, { useState, useEffect, ChangeEvent, useCallback, useMemo } from 'react'

import {
  AddCircleOutline as AddCircleOutlineIcon,
  ChevronLeft as ChevronLeftIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  BackButtonLink,
  SearchBoxContainer,
  PaginationContainer,
} from './ManageRolesTemplate.styles'
import { SearchBar } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { useModalContext, useSnackbarContext } from '@/context'
import {
  useGetRolesByAccountIdAsync,
  useDeleteRoleAsync,
  useGetUsersByRoleAsync,
} from '@/hooks'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-by-account-id'
import type { B2BRole } from '@/lib/api/operations/get-roles-by-account-id'
import { AccountScope, RoleType } from '@/lib/constants'

import type { CustomerAccount } from '@/lib/gql/types'

interface Role {
  id: string
  name: string
  roleType: 'System' | 'Custom'
  accountScope: string
  assignedUsers: number
  accountIds: number[]
}

interface ManageRolesTemplateProps {
  customerAccount?: CustomerAccount
  initialData?: GetRolesAsyncResponse
  onAccountTitleClick?: () => void
}

// Component to fetch and display user count for a single account-role pair
const SingleAccountUserCountComponent = ({
  accountId,
  roleId,
  setUserCount,
}: {
  accountId: number
  roleId: number
  setUserCount: (accountId: number, count: number) => void
}) => {
  const { users, isLoading } = useGetUsersByRoleAsync(accountId, roleId)

  useEffect(() => {
    if (!isLoading && users) {
      setUserCount(accountId, users.length)
    }
  }, [users, isLoading, accountId, setUserCount])

  return null // This component only fetches data, doesn't render
}

SingleAccountUserCountComponent.displayName = 'SingleAccountUserCount'
const SingleAccountUserCount = React.memo(SingleAccountUserCountComponent)

// Component to aggregate user counts across multiple accounts for a role
const RoleUserCountAggregatorComponent = ({
  accountIds,
  roleId,
  onCountUpdate,
}: {
  accountIds: number[]
  roleId: number
  onCountUpdate: (roleId: number, count: number) => void
}) => {
  const [accountCounts, setAccountCounts] = useState<Record<number, number>>({})
  const [loadedAccounts, setLoadedAccounts] = useState<Set<number>>(new Set())

  // Callback when a single account's user count is set
  const setAccountUserCount = useCallback((accountId: number, count: number) => {
    setAccountCounts((prev) => {
      if (prev[accountId] !== count) {
        return { ...prev, [accountId]: count }
      }
      return prev
    })
    setLoadedAccounts((prev) => new Set(prev).add(accountId))
  }, [])

  // Calculate total count
  const totalCount = Object.values(accountCounts).reduce((sum, count) => sum + count, 0)

  // Check if all accounts are loaded
  const allLoaded = accountIds.every((id) => loadedAccounts.has(id))

  // Update parent when all counts are loaded
  useEffect(() => {
    if (allLoaded) {
      onCountUpdate(roleId, totalCount)
    }
  }, [allLoaded, roleId, totalCount, onCountUpdate])

  return (
    <>
      {/* Render invisible components to fetch data for each account */}
      {accountIds.map((accountId) => (
        <SingleAccountUserCount
          key={`${accountId}-${roleId}`}
          accountId={accountId}
          roleId={roleId}
          setUserCount={setAccountUserCount}
        />
      ))}
      {/* Display the count */}
      {allLoaded ? totalCount : '...'}
    </>
  )
}

RoleUserCountAggregatorComponent.displayName = 'RoleUserCountAggregator'
const RoleUserCountAggregator = React.memo(RoleUserCountAggregatorComponent)

const ManageRolesTemplate = ({
  customerAccount,
  initialData,
}: ManageRolesTemplateProps) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { showModal } = useModalContext()
  const { showSnackbar } = useSnackbarContext()
  const { deleteRole } = useDeleteRoleAsync()

  const [searchQuery, setSearchQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [userCounts, setUserCounts] = useState<Record<number, number>>({})

  const pageSize = 10

  // Fetch roles from API with initial server-side data
  const {
    roles: rolesData,
    isLoading,
    isError,
  } = useGetRolesByAccountIdAsync(customerAccount?.id as number, initialData)

  const roles = useMemo(() => {
    if (!rolesData?.items) return []
    
    return rolesData.items.map((item) => ({
      id: item.id?.toString() || '',
      name: item.name || '',
      roleType: item.isSystemRole ? RoleType.System : RoleType.Custom,
      accountScope: AccountScope.AllChild,
      assignedUsers: 0,
      accountIds: (item as B2BRole).accountIds || [],
    })) as Role[]
  }, [rolesData])

  // Callback to update user count for a role (memoized to prevent infinite loops)
  const handleUserCountUpdate = useCallback((roleId: number, count: number) => {
    setUserCounts((prev) => {
      // Only update if the count has changed
      if (prev[roleId] !== count) {
        return { ...prev, [roleId]: count }
      }
      return prev
    })
  }, [])

  // Get user count for a role (from cached counts or default to 0) - memoized
  const getUserCount = useCallback((roleId: string): number => {
    return userCounts[parseInt(roleId)] ?? 0
  }, [userCounts])

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>, roleId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedRoleId(roleId)
  }, [])

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
    setSelectedRoleId(null)
  }, [])

  const selectedRole = roles.find((role) => role.id === selectedRoleId)

  const handleSearch = useCallback((searchText: string) => {
    setSearchQuery(searchText)
    setCurrentPage(1) // Reset to first page on search
  }, [])

  const handlePageChange = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }, [])

  const handleAddNewRole = useCallback(() => {
    router.push('/my-account/b2b/manage-roles/create')
  }, [router])

  const handleViewRole = useCallback((roleId: string) => {
    handleMenuClose()
    // Navigate to create role page in readonly mode
    router.push(`/my-account/b2b/manage-roles/create?roleId=${roleId}&mode=view`)
  }, [router, handleMenuClose])

  const handleEditRole = useCallback((roleId: string) => {
    handleMenuClose()
    // TODO: Implement edit role
    router.push(`/my-account/b2b/manage-roles/create?roleId=${roleId}&mode=edit`)
  }, [router, handleMenuClose])

  const handleCopyRole = useCallback((roleId: string) => {
    handleMenuClose()
    // Navigate to create role page with copy mode
    router.push(`/my-account/b2b/manage-roles/create?roleId=${roleId}&mode=copy`)
  }, [router, handleMenuClose])

  const handleDeleteRole = useCallback((roleId: string) => {
    handleMenuClose()
    // Show confirmation dialog before deleting
    showModal({
      Component: ConfirmationDialog,
      props: {
        contentText: t('delete-role-confirmation-message'),
        primaryButtonText: t('delete'),
        onConfirm: async () => {
          try {
            // Call API to delete role
            await deleteRole.mutateAsync({
              roleId: parseInt(roleId),
            })

            // Show success message
            showSnackbar(t('role-deleted-successfully'), 'success')
          } catch (error) {
            console.error('Error deleting role:', error)
            showSnackbar(t('error-deleting-role'), 'error')
          }
        },
      },
    })
  }, [handleMenuClose, showModal, t, deleteRole, showSnackbar])

  const filteredRoles = useMemo(
    () => roles.filter((role: Role) => role.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [roles, searchQuery]
  )

  // Pagination logic - memoized
  const paginationData = useMemo(() => {
    const totalCount = filteredRoles.length
    const pageCount = Math.ceil(totalCount / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedRoles = filteredRoles.slice(startIndex, endIndex)
    
    return { totalCount, pageCount, startIndex, endIndex, paginatedRoles }
  }, [filteredRoles, currentPage, pageSize])

  const { totalCount, pageCount, startIndex, endIndex, paginatedRoles } = paginationData

  // Helper function for displaying pagination text - memoized
  const getPerPageItemText = useCallback(() => {
    if (totalCount === 0) return ''
    const start = startIndex + 1
    const end = Math.min(endIndex, totalCount)
    if (mdScreen) {
      return `${t('displaying')} ${start} - ${end} of ${totalCount}`
    }
    return `${start} - ${end} of ${totalCount}`
  }, [totalCount, startIndex, endIndex, mdScreen, t])

  return (
    <Grid>
      <Grid item style={{ marginTop: '10px', marginBottom: '20px' }}>
        {/* Header with Back Button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            gap: { xs: '36%', sm: '42%', md: 2 },
            alignItems: { xs: 'center', md: 'start' },
            margin: '1rem 0',
          }}
        >
          <BackButtonLink aria-label={t('my-account')} href="/my-account">
            <ChevronLeftIcon />
            {mdScreen && <Typography variant="body1">{t('my-account')}</Typography>}
          </BackButtonLink>
          <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('manage-roles')}</Typography>
        </Box>

        {/* Add New Role Button */}
        <Grid container>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleAddNewRole}
              disableElevation
              startIcon={<AddCircleOutlineIcon />}
              sx={{ width: { xs: '100%', md: 'auto' }, mb: 2 }}
            >
              {t('add-new-role')}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        {/* Search Box */}
        <SearchBoxContainer>
          <SearchBar
            onSearch={handleSearch}
            placeHolder={t('search-roles')}
            searchTerm={searchQuery}
            showClearButton={true}
          />
        </SearchBoxContainer>

        {/* Roles Table */}
        <Table>
          {isLoading ? (
            <caption style={{ textAlign: 'center' }}>{t('loading')}</caption>
          ) : isError ? (
            <caption style={{ textAlign: 'center' }}>{t('error-loading-roles')}</caption>
          ) : !filteredRoles?.length ? (
            <caption style={{ textAlign: 'center' }}>{t('no-record-found')}</caption>
          ) : null}
          <TableHead>
            <TableRow style={{ backgroundColor: theme.palette.grey[100] }}>
              <TableCell>{t('role-name')}</TableCell>
              <TableCell>{t('role-type')}</TableCell>
              <TableCell>{t('assigned-users')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              paginatedRoles.map((role: Role) => (
                <TableRow key={role.id}>
                  <TableCell sx={{ fontWeight: 500 }}>{role.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={role.roleType}
                      size="small"
                      sx={{
                        color: role.roleType === 'System' ? '#7c7c7c' : '#2b2b2b',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {role.accountIds?.length > 0 ? (
                      <RoleUserCountAggregator
                        accountIds={role.accountIds}
                        roleId={parseInt(role.id)}
                        onCountUpdate={handleUserCountUpdate}
                      />
                    ) : (
                      '0'
                    )}{' '}
                    {t('users')}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, role.id)}
                      aria-label="actions"
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!isLoading && totalCount > 0 && (
          <PaginationContainer>
            <Pagination
              count={pageCount}
              page={currentPage}
              shape="rounded"
              onChange={handlePageChange}
              size="small"
            />
            <Typography variant="body2">{getPerPageItemText()}</Typography>
          </PaginationContainer>
        )}

        {/* Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => selectedRoleId && handleViewRole(selectedRoleId)}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('view-details')}</ListItemText>
          </MenuItem>

          {selectedRole?.roleType === RoleType.Custom && (
            <MenuItem onClick={() => selectedRoleId && handleEditRole(selectedRoleId)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('edit-role')}</ListItemText>
            </MenuItem>
          )}

          {selectedRole?.roleType === RoleType.Custom && (
            <MenuItem onClick={() => selectedRoleId && handleCopyRole(selectedRoleId)}>
              <ListItemIcon>
                <ContentCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('copy-role')}</ListItemText>
            </MenuItem>
          )}

          {selectedRole?.roleType === RoleType.Custom && (
            <Tooltip
              title={
                getUserCount(selectedRoleId || '') > 0 ? t('cannot-delete-role-with-users') : ''
              }
              placement="left"
            >
              <span>
                <MenuItem
                  onClick={() => selectedRoleId && handleDeleteRole(selectedRoleId)}
                  disabled={getUserCount(selectedRoleId || '') > 0}
                  sx={{
                    color: getUserCount(selectedRoleId || '') > 0 ? 'text.disabled' : 'error.main',
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon
                      fontSize="small"
                      sx={{
                        color:
                          getUserCount(selectedRoleId || '') > 0 ? 'text.disabled' : 'error.main',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>{t('delete-role')}</ListItemText>
                </MenuItem>
              </span>
            </Tooltip>
          )}
        </Menu>
      </Grid>
    </Grid>
  )
}

// Memoize component to prevent unnecessary re-renders
export default React.memo(ManageRolesTemplate)
