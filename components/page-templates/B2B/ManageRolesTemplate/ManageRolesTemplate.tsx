import React, { useState } from 'react'

import {
  AddCircleOutline as AddCircleOutlineIcon,
  ChevronLeft as ChevronLeftIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  Theme,
  Tooltip,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { SearchBar } from '@/components/common'

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

interface Role {
  id: string
  name: string
  classification: 'System' | 'Custom'
  accountScope: string
  assignedUsers: number
}

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    classification: 'System',
    accountScope: 'All child accounts',
    assignedUsers: 5,
  },
  {
    id: '2',
    name: 'Purchaser',
    classification: 'System',
    accountScope: 'All child accounts',
    assignedUsers: 12,
  },
  {
    id: '3',
    name: 'Non-Purchaser',
    classification: 'System',
    accountScope: 'All child accounts',
    assignedUsers: 8,
  },
  {
    id: '4',
    name: 'Admin_Copy',
    classification: 'Custom',
    accountScope: 'All child accounts',
    assignedUsers: 0,
  },
  {
    id: '5',
    name: 'Purchaser_Copy',
    classification: 'Custom',
    accountScope: 'All child accounts',
    assignedUsers: 0,
  },
]

interface ManageRolesTemplateProps {
  onAccountTitleClick?: () => void
}

const ManageRolesTemplate = ({ onAccountTitleClick }: ManageRolesTemplateProps) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const router = useRouter()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (searchText: string) => {
    setSearchQuery(searchText)
  }

  const handleAddNewRole = () => {
    router.push('/my-account/b2b/manage-roles/create')
  }

  const handleViewRole = (roleId: string) => {
    // TODO: Implement view role details
    console.log('View role:', roleId)
  }

  const handleEditRole = (roleId: string) => {
    // TODO: Implement edit role
    console.log('Edit role:', roleId)
  }

  const handleCopyRole = (roleId: string) => {
    // TODO: Implement copy role
    console.log('Copy role:', roleId)
  }

  const handleDeleteRole = (roleId: string) => {
    // TODO: Implement delete role with confirmation
    console.log('Delete role:', roleId)
  }

  const filteredRoles = roles.filter((role: Role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            placeHolder={t('search-roles') || 'Search roles'}
            searchTerm={searchQuery}
            showClearButton={true}
          />
        </SearchBoxContainer>

        {/* Roles Table */}
        <Table>
          {!filteredRoles?.length ? (
            <caption style={{ textAlign: 'center' }}>{t('no-record-found')}</caption>
          ) : null}
          <TableHead>
            <TableRow style={{ backgroundColor: theme.palette.grey[100] }}>
              <TableCell>{t('role-name')}</TableCell>
              <TableCell>{t('classification')}</TableCell>
              <TableCell>{t('account-scope')}</TableCell>
              <TableCell>{t('assigned-users')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRoles.map((role: Role) => (
              <TableRow key={role.id}>
                <TableCell sx={{ fontWeight: 500 }}>{role.name}</TableCell>
                <TableCell>
                  <Chip
                    label={role.classification}
                    size="small"
                    sx={{
                      backgroundColor: role.classification === 'System' ? '#e3f2fd' : '#f3e5f5',
                      color: role.classification === 'System' ? '#1565c0' : '#6a1b9a',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>{role.accountScope}</TableCell>
                <TableCell>
                  {role.assignedUsers} {t('users')}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    {/* System roles: View Details and Copy */}
                    {role.classification === 'System' && (
                      <>
                        <Tooltip title={t('view-details') || 'View Details'}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewRole(role.id)}
                            aria-label="view-role"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('copy-role') || 'Copy Role'}>
                          <IconButton
                            size="small"
                            onClick={() => handleCopyRole(role.id)}
                            aria-label="copy-role"
                          >
                            <FileCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}

                    {/* Custom roles: View, Edit, Copy, and Delete */}
                    {role.classification === 'Custom' && (
                      <>
                        <Tooltip title={t('view-details') || 'View Details'}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewRole(role.id)}
                            aria-label="view-role"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('edit-role') || 'Edit Role'}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditRole(role.id)}
                            aria-label="edit-role"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('copy-role') || 'Copy Role'}>
                          <IconButton
                            size="small"
                            onClick={() => handleCopyRole(role.id)}
                            aria-label="copy-role"
                          >
                            <FileCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('delete-role') || 'Delete Role'}>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteRole(role.id)}
                            aria-label="delete-role"
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

export default ManageRolesTemplate
