import { SxProps, Theme, styled } from '@mui/material'
import { Box } from '@mui/material'
import Link from 'next/link'

export const BackButtonLink = styled(Link)(({ theme }: { theme: Theme }) => ({
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

export const PaginationContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
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
}
