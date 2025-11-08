import { Theme } from '@mui/material/styles'

export const roleAccountHierarchyViewStyles = {
  container: {
    mt: 3,
    mb: 3,
  },
  sectionTitle: {
    mb: 1,
    fontWeight: 600,
  },
  countText: {
    mt: 0.5,
    mb: 2,
    display: 'block',
  },
  treeContainer: {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    p: 2,
    backgroundColor: 'background.paper',
    maxHeight: 400,
    overflow: 'auto',
  },
  accountItem: {
    display: 'flex',
    alignItems: 'center',
    py: 0.5,
    '&:hover': {
      backgroundColor: 'action.hover',
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
  formControlLabel: {
    m: 0,
    flex: 1,
  },
  accountLabel: (isParentAccount: boolean) => ({
    fontWeight: isParentAccount ? 600 : 400,
    color: 'text.primary',
  }),
  childCountText: {
    mr: 1,
  },
  nodeContent: {
    display: 'flex',
    alignItems: 'center',
    padding: (theme: Theme) => theme.spacing(0.5, 1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  treeNode: {
    marginLeft: (theme: Theme) => theme.spacing(2),
  },
  emptyState: {
    p: 2,
  },
  emptyStateText: {
    color: 'text.secondary',
  },
}
