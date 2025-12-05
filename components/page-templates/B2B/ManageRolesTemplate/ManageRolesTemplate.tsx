import React, { useState, useEffect, ChangeEvent, useCallback, useMemo } from 'react'

import {
  AddCircleOutline as AddCircleOutlineIcon,
  ChevronLeft as ChevronLeftIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
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
  ManageRolesTemplateStyles,
} from './ManageRolesTemplate.styles'
import { SearchBar } from '@/components/common'
import { ConfirmationDialog } from '@/components/dialogs'
import { useModalContext, useSnackbarContext } from '@/context'
import { useGetRolesByAccountIdAsync, useDeleteRoleAsync } from '@/hooks'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-by-account-id'
import type { B2BRole } from '@/lib/api/operations/get-roles-by-account-id'
import { AccountScope, RoleType, Routes } from '@/lib/constants'
import { b2bUserActions, b2bUserBehaviors, hasAnyPermission, hasPermissionInAllAccounts } from '@/lib/helpers'

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
  usersByRole?: Record<string, number>
  accountUserBehaviorsForAllAccounts?: Record<number, number[]>
  accountUserBehaviors?: number[]
  onAccountTitleClick?: () => void
}

const ManageRolesTemplate = ({
  customerAccount,
  initialData,
  usersByRole,
  accountUserBehaviorsForAllAccounts,
  accountUserBehaviors,
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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const pageSize = 10

  // Permission checks
  const hasEditPermission = useMemo(
    () => hasPermissionInAllAccounts(b2bUserBehaviors.UPDATE_ROLE, accountUserBehaviorsForAllAccounts),
    [accountUserBehaviorsForAllAccounts]
  )
  const hasDeletePermission = useMemo(
    () => hasPermissionInAllAccounts(b2bUserBehaviors.DELETE_ROLE, accountUserBehaviorsForAllAccounts),
    [accountUserBehaviorsForAllAccounts]
  )

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

  // Get user count for a role from server-side data - memoized
  const getUserCount = useCallback(
    (roleId: string): number => {
      return usersByRole?.[roleId] ?? 0
    },
    [usersByRole]
  )

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

  const handleSort = useCallback(() => {
    setSortOrder((prev) => {
      if (prev === null) return 'asc'
      if (prev === 'asc') return 'desc'
      return null // Reset to original order
    })
    setCurrentPage(1) // Reset to first page on sort
  }, [])

  const handlePageChange = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }, [])

  const handleAddNewRole = useCallback(() => {
    router.push(Routes.CreateRole)
  }, [router])

  const handleViewRole = useCallback(
    (roleId: string) => {
      handleMenuClose()
      // Navigate to create role page in readonly mode
      router.push(`${Routes.CreateRole}?roleId=${roleId}&mode=view`)
    },
    [router, handleMenuClose]
  )

  const handleEditRole = useCallback(
    (roleId: string) => {
      handleMenuClose()
      // TODO: Implement edit role
      router.push(`${Routes.CreateRole}?roleId=${roleId}&mode=edit`)
    },
    [router, handleMenuClose]
  )

  const handleCopyRole = useCallback(
    (roleId: string) => {
      handleMenuClose()
      // Navigate to create role page with copy mode
      router.push(`${Routes.CreateRole}?roleId=${roleId}&mode=copy`)
    },
    [router, handleMenuClose]
  )

  const handleDeleteRole = useCallback(
    (roleId: string) => {
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
    },
    [handleMenuClose, showModal, t, deleteRole, showSnackbar]
  )

  const filteredRoles = useMemo(() => {
    const filtered = roles.filter((role: Role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Separate System and Custom roles
    const systemRoles = filtered.filter((role) => role.roleType === RoleType.System)
    const customRoles = filtered.filter((role) => role.roleType === RoleType.Custom)

    // Sort custom roles only if sortOrder is set
    if (sortOrder !== null) {
      customRoles.sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()

        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB)
        } else {
          return nameB.localeCompare(nameA)
        }
      })
    }

    // Always return System roles first, then Custom roles
    return [...systemRoles, ...customRoles]
  }, [roles, searchQuery, sortOrder])

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
        <Box sx={ManageRolesTemplateStyles.headerBox}>
          <BackButtonLink aria-label={t('my-account')} href="/my-account">
            <ChevronLeftIcon />
            {mdScreen && <Typography variant="body1">{t('my-account')}</Typography>}
          </BackButtonLink>
          <Typography variant={mdScreen ? 'h1' : 'h2'}>{t('manage-roles')}</Typography>
        </Box>

        {/* Add New Role Button */}
        {hasAnyPermission(b2bUserActions.CREATE_ROLE) && (
          <Grid container>
            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleAddNewRole}
                disableElevation
                startIcon={<AddCircleOutlineIcon />}
                sx={ManageRolesTemplateStyles.addRoleButton}
              >
                {t('add-new-role')}
              </Button>
            </Grid>
          </Grid>
        )}
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
            <TableRow sx={ManageRolesTemplateStyles.tableHeaderRow}>
              <TableCell sx={ManageRolesTemplateStyles.tableHeaderCell}>
                <Box
                  sx={ManageRolesTemplateStyles.sortBox}
                  onClick={handleSort}
                >
                  {t('role-name')}
                  <IconButton size="small" sx={ManageRolesTemplateStyles.sortIconButton}>
                    {sortOrder === 'asc' ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : sortOrder === 'desc' ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" sx={ManageRolesTemplateStyles.sortIconInactive} />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell sx={ManageRolesTemplateStyles.tableHeaderCellRoleType}>{t('role-type')}</TableCell>
              <TableCell sx={ManageRolesTemplateStyles.tableHeaderCellAssignedUsers}>{t('assigned-users')}</TableCell>
              <TableCell sx={ManageRolesTemplateStyles.tableHeaderCellActions}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              paginatedRoles.map((role: Role) => (
                <TableRow key={role.id}>
                  <TableCell 
                    sx={ManageRolesTemplateStyles.roleNameCell}
                    title={role.name.length > 20 ? role.name : undefined}
                  >
                    {role.name}
                  </TableCell>
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
                    {getUserCount(role.id)} {t('users')}
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
          {hasAnyPermission(b2bUserActions.VIEW_ROLE) && (
            <MenuItem onClick={() => selectedRoleId && handleViewRole(selectedRoleId)}>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{t('view-details')}</ListItemText>
            </MenuItem>
          )}

          {selectedRole?.roleType === RoleType.Custom &&
            hasPermissionInAllAccounts(b2bUserBehaviors.UPDATE_ROLE, accountUserBehaviorsForAllAccounts) && (
              <MenuItem onClick={() => selectedRoleId && handleEditRole(selectedRoleId)}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('edit-role')}</ListItemText>
              </MenuItem>
            )}

          {selectedRole?.roleType === RoleType.Custom &&
            hasAnyPermission(b2bUserActions.CREATE_ROLE) && (
              <MenuItem onClick={() => selectedRoleId && handleCopyRole(selectedRoleId)}>
                <ListItemIcon>
                  <ContentCopyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('copy-role')}</ListItemText>
              </MenuItem>
            )}

          {selectedRole?.roleType === RoleType.Custom &&
            hasPermissionInAllAccounts(b2bUserBehaviors.DELETE_ROLE, accountUserBehaviorsForAllAccounts) && (
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
                      color:
                        getUserCount(selectedRoleId || '') > 0 ? 'text.disabled' : 'error.main',
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
