import { LoadingButton } from '@mui/lab'
import { Grid, Stack, NoSsr, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { QuoteStatus } from '@/lib/constants'
import { hasPermission, actions } from '@/lib/helpers'

import { Quote } from '@/lib/gql/types'

interface BuyerQuoteActionsProps {
  quote: Quote
  quoteId: string
  mode: string
  status: string
  isSubmitForApprovalEnabled: boolean
  handleClearChanges: () => void
  handleEditQuote: (quoteId: string) => void
  handleSubmitForApproval: () => void
  handleGotoCheckout: () => void
  handlePrint: () => void
}
export default function BuyerQuoteActions({
  quote,
  quoteId,
  mode,
  status,
  isSubmitForApprovalEnabled,
  handleClearChanges,
  handleEditQuote,
  handleSubmitForApproval,
  handleGotoCheckout,
  handlePrint,
}: BuyerQuoteActionsProps) {
  const { t } = useTranslation()

  return (
    <Grid item display={'flex'} justifyContent={'flex-end'}>
      {
        <Stack
          sx={{
            flexDirection: {
              xs: 'column-reverse',
              md: 'row',
            },
          }}
          direction="row"
          gap={2}
          width={'100%'}
        >
          <Box display={'flex'} gap={2} whiteSpace={'nowrap'}>
            {(mode === 'create' || mode === 'edit') && (
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ width: { xs: '50%', md: '100%' } }}
                disabled={
                  QuoteStatus[status] === QuoteStatus.InReview ||
                  QuoteStatus[status] === QuoteStatus.Completed ||
                  !(quote?.hasDraft as boolean)
                }
                onClick={handleClearChanges}
              >
                {t('clear-changes')}
              </LoadingButton>
            )}
            {!mode && (
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ width: { xs: '50%', md: '100%' } }}
                disabled={
                  QuoteStatus[status] === QuoteStatus.InReview ||
                  QuoteStatus[status] === QuoteStatus.Completed ||
                  QuoteStatus[status] === QuoteStatus.Expired
                }
                onClick={() => handleEditQuote(quoteId)}
              >
                {t('edit-quote')}
              </LoadingButton>
            )}
            <LoadingButton
              sx={{ width: { xs: '50%', md: '100%' } }}
              variant="contained"
              color="secondary"
              onClick={handlePrint}
            >
              {t('print-quote')}
            </LoadingButton>
          </Box>
          {(QuoteStatus[quote?.status as string] !== QuoteStatus.ReadyForCheckout ||
            mode === 'edit') && (
            <Box>
              <LoadingButton
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  QuoteStatus[status] === QuoteStatus.InReview ||
                  QuoteStatus[status] === QuoteStatus.Completed ||
                  QuoteStatus[status] === QuoteStatus.Expired ||
                  !isSubmitForApprovalEnabled ||
                  !quote?.hasDraft
                }
                onClick={handleSubmitForApproval}
              >
                {t('submit-for-approval')}
              </LoadingButton>
            </Box>
          )}
          <NoSsr>
            {hasPermission(actions.CREATE_CHECKOUT) &&
              QuoteStatus[quote?.status as string] === QuoteStatus.ReadyForCheckout && (
                <Box>
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={quote?.hasDraft as boolean}
                    onClick={handleGotoCheckout}
                  >
                    {t('continue-to-checkout')}
                  </LoadingButton>
                </Box>
              )}
          </NoSsr>
        </Stack>
      }
    </Grid>
  )
}
