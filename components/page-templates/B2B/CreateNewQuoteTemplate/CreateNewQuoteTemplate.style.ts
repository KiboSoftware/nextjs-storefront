export const createNewQuoteTemplateStyles = {
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
  createNewQuoteTextBox: {
    margin: { xs: 'auto' },
  },
  createNewQuoteText: {
    paddingRight: { xs: '35px' },
  },
  promoCode: {
    flexDirection: 'row',
    gap: '24px',
    justifyContent: 'flex-end',
    display: { xs: 'block', md: 'flex' },
  },
  promoCodeBadge: { maxWidth: { md: '350px', sm: '100%' } },
  orderTotal: {
    alignItems: 'center',
  },
  noCartItems: {
    fontStyle: 'italic',
    color: 'grey.600',
  },
}
