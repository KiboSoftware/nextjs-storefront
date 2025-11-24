import { Theme } from '@mui/material'

export const roleFormAccountHierarchyTreeStyles = {
  container: (theme: Theme) => ({
    mt: 3,
    p: 2,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 1,
    bgcolor: theme.palette.grey[50],
  }),

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    mb: 2,
  },

  titleText: {
    fontWeight: 600,
  },

  searchContainer: {
    mt: 1,
    mb: 1,
  },

  searchField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      height: '36px',
      fontSize: '14px',
    },
  },

  clearSearchButton: {
    p: 0.5,
  },

  countText: {
    mt: 0.5,
    display: 'block',
  },

  buttonContainer: {
    display: 'flex',
    gap: 1,
  },

  treeContainer: (theme: Theme) => ({
    maxHeight: 400,
    overflow: 'auto',
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 1,
    bgcolor: 'white',
    p: 1,
  }),

  accountItem: {
    display: 'flex',
    alignItems: 'center',
    py: 0.5,
    '&:hover': {
      bgcolor: 'action.hover',
    },
  },

  expandButton: {
    mr: 0.5,
    p: 0.5,
  },

  spacer: {
    width: 28,
    mr: 0.5,
  },

  checkbox: (isParentAccount: boolean) => ({
    visibility: isParentAccount ? 'hidden' : 'visible',
    '&.Mui-disabled': {
      cursor: 'not-allowed',
    },
  }),

  formControlLabel: {
    m: 0,
    flex: 1,
    '& .MuiFormControlLabel-label.Mui-disabled': {
      color: 'text.primary',
      cursor: 'default',
    },
  },

  accountLabel: (isParentAccount: boolean) => ({
    fontWeight: isParentAccount ? 600 : 400,
  }),

  childCountText: {
    mr: 1,
  },
}
