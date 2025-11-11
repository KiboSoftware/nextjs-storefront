import { Theme } from '@mui/material'

export const roleFormStyles = {
  container: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  section: {
    backgroundColor: '#f5f7f5',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
  },
  sectionHeader: {
    marginBottom: '8px',
    fontWeight: 600,
  },
  sectionDescription: {
    color: 'text.secondary',
    marginBottom: '24px',
    fontSize: '0.875rem',
  },
  formField: {
    marginBottom: '16px',
  },
  radioGroup: {
    '& .MuiFormControlLabel-root': {
      marginBottom: '12px',
      alignItems: 'flex-start',
      marginLeft: 0,
    },
    '& .MuiRadio-root': {
      padding: '0 8px 0 0',
    },
  },
  radioLabel: {
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
    },
  },
  permissionContainer: {
    display: 'flex',
    gap: '16px',
    minHeight: '400px',
  },
  permissionColumn: {
    flex: 1,
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  permissionColumnHeader: {
    padding: '12px 16px',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 600,
    fontSize: '0.875rem',
    backgroundColor: '#fafafa',
  },
  permissionList: {
    flex: 1,
    overflow: 'auto',
    padding: 0,
  },
  permissionBehaviorNameBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 1,
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #e0e0e0',
    paddingLeft: '12px',
  },
  permissionBehaviorName: {
    padding: '12px 16px 12px 0',
    fontWeight: 600,
    fontSize: '0.875rem',
  },
  permissionItem: (theme: Theme) => ({
    padding: '12px 16px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '0.875rem',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.selected': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  }),
  behaviorItem: (theme: Theme) => ({
    padding: '8px 12px',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  selectedBehaviorItem: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    fontSize: '0.875rem',
    borderBottom: '1px solid #f0f0f0',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    width: '100%',
  }),
  noSelectionText: {
    padding: '24px 16px',
    textAlign: 'center',
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-start',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e0e0e0',
  },
  createRoleTitle: {
    margin: { xs: 'auto' },
  },
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
    gap: '16px',
    marginBottom: {
      xs: '16px',
    },
  },
  mdWrapIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    mt: 3,
  },
}

export default roleFormStyles
