export const QuotesTableStyles = {
  container: {
    paddingInline: 0,
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    gap: 2,
    pb: 2,
    width: '100%',
  },

  filterBar: {
    display: 'flex',
    justifyContent: {
      xs: 'space-between',
      md: 'flex-end',
    },
    alignItems: 'center',
    gap: 2,
    width: '100%',
  },
  tableRow: {
    '&:last-child td, &:last-child th': { border: 0 },
    borderLeftWidth: {
      xs: '5px',
      md: 0,
    },
    borderLeftStyle: 'solid',
  },
}
