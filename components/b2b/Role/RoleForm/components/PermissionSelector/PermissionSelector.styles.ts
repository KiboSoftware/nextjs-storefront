export const permissionSelectorStyles = {
  container: {
    mt: 3,
  },
  title: {
    fontWeight: 600,
    mb: 1,
  },
  description: {
    mb: 2,
    color: 'text.secondary',
  },
  errorMessage: {
    mb: 2,
    fontWeight: 500,
  },
  mainContainer: {
    display: 'flex',
    border: '1px solid #e0e0e0',
    borderRadius: 1,
    overflow: 'hidden',
    minHeight: 400,
  },
  categoryColumn: {
    flex: 1,
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
  },
  behaviorColumn: {
    flex: 1,
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
  },
  selectedColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  columnHeader: {
    p: 2,
    bgcolor: 'grey.100',
    fontWeight: 600,
    borderBottom: '1px solid #e0e0e0',
  },
  behaviorColumnHeader: {
    p: 2,
    bgcolor: 'grey.100',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
  },
  list: {
    p: 0,
    flex: 1,
    overflow: 'auto',
  },
  categoryListItem: {
    borderBottom: '1px solid #f0f0f0',
    py: 1.5,
    '&.Mui-selected': {
      backgroundColor: 'primary.light',
      color: 'primary.main',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
    },
  },
  behaviorListItem: {
    borderBottom: '1px solid #f0f0f0',
    py: 1,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
    '&.Mui-disabled': {
      opacity: 1,
    },
  },
  checkbox: {
    padding: 0,
    mr: 1,
  },
  headerCheckbox: {
    padding: 0,
    mr: 1,
  },
  headerTitle: {
    fontWeight: 600,
  },
  emptyStateText: {
    p: 2,
    color: 'text.secondary',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  selectedBehaviorItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    p: 1,
    borderBottom: '1px solid #f0f0f0',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  },
  removeButton: {
    ml: 1,
  },
}
