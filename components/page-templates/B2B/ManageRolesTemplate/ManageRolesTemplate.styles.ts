import { SxProps, Theme, styled } from '@mui/material'
import { Box } from '@mui/material'
import Link from 'next/link'

import  theme  from '@/styles/theme'

export const BackButtonLink = styled(Link)(() => ({
  typography: 'body2',
  textDecoration: 'none',
  color: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0rem',
  cursor: 'pointer',
}))

export const SearchBoxContainer = styled(Box)({
  marginBottom: '20px',
  width: '100%',
})

export const PaginationContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.grey[600],
  alignItems: 'center',
  margin: '20px 0',
}))

export const ManageRolesTemplateStyles: Record<string, SxProps<Theme>> = {
  container: {
    padding: { xs: '1rem', md: '2rem' },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 0 },
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  title: {
    fontSize: { xs: '1.5rem', md: '2rem' },
    fontWeight: 600,
    color: 'grey.900',
  },
  subtitle: {
    fontSize: { xs: '0.875rem', md: '1rem' },
    color: 'grey.700',
  },
  addButton: {
    backgroundColor: '#0d7c33',
    color: 'common.white',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: '0.625rem 1rem',
    borderRadius: '0.25rem',
    '&:hover': {
      backgroundColor: '#0a6329',
    },
  },
  rolesGridContainer: {
    borderRadius: '0.5rem',
    padding: '1.5rem',
  },
  rolesGridHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 0 },
  },
  rolesGridTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'grey.900',
  },
  rolesCount: {
    fontSize: '0.875rem',
    color: 'grey.600',
    marginLeft: '0.5rem',
  },
  searchAndFilter: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    width: { xs: '100%', md: 'auto' },
  },
  searchBox: {
    backgroundColor: 'common.white',
    borderRadius: '0.25rem',
    width: { xs: '100%', md: '300px' },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      fontSize: '0.875rem',
    },
  },
  filterSelect: {
    backgroundColor: 'common.white',
    borderRadius: '0.25rem',
    width: { xs: '100%', md: '180px' },
    '& .MuiOutlinedInput-root': {
      height: '40px',
      fontSize: '0.875rem',
    },
  },
  table: {
    backgroundColor: 'common.white',
    borderRadius: '0.25rem',
    '& .MuiTableCell-root': {
      borderBottom: '1px solid',
      borderColor: 'grey.300',
    },
  },
  tableHeader: {
    backgroundColor: 'grey.50',
    '& .MuiTableCell-head': {
      fontWeight: 600,
      fontSize: '0.875rem',
      color: 'grey.700',
      padding: '1rem',
    },
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'grey.50',
    },
    '& .MuiTableCell-body': {
      fontSize: '0.875rem',
      padding: '1rem',
    },
  },
  systemBadge: {
    backgroundColor: '#dff7cc',
    color: '#4a7c1f',
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    display: 'inline-block',
  },
  customBadge: {
    backgroundColor: '#dff7cc',
    color: '#0d7c33',
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    display: 'inline-block',
  },
  actionButton: {
    minWidth: 'auto',
    padding: '0.25rem',
    color: 'grey.700',
    '&:hover': {
      backgroundColor: 'grey.100',
    },
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  headerBox: {
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' },
    gap: { xs: '36%', sm: '42%', md: 2 },
    alignItems: { xs: 'center', md: 'start' },
    margin: '1rem 0',
  },
  addRoleButton: {
    width: { xs: '100%', md: 'auto' },
    mb: 2,
  },
  tableHeaderRow: {
    backgroundColor: theme.palette.grey[100],
  },
  tableHeaderCell: {
    width: '40%',
  },
  tableHeaderCellRoleType: {
    width: '20%',
  },
  tableHeaderCellAssignedUsers: {
    width: '30%',
  },
  tableHeaderCellActions: {
    width: '10%',
  },
  sortBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  sortIconButton: {
    ml: 0.5,
  },
  sortIconInactive: {
    opacity: 0.3,
  },
  roleNameCell: {
    fontWeight: 500,
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  roleTypeChip: {
    fontSize: '0.75rem',
    fontWeight: 500,
  },
  roleTypeChipSystem: {
    color: '#7c7c7c',
  },
  roleTypeChipCustom: {
    color: '#2b2b2b',
  },
}
