import { LoadingButton } from '@mui/lab'
import { Grid, Stack, NoSsr, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { QuoteStatus } from '@/lib/constants'
import { quoteGetters } from '@/lib/getters'
import { hasAnyPermission, actions, b2bUserActions } from '@/lib/helpers'

interface BuyerQuoteActionsProps {
  hasDraft: boolean
  mode: string
  status: string
  isSubmitForApprovalEnabled: boolean
  handleClearChanges: () => void
  handleEditQuote: () => void
  handleSubmitForApproval: () => void
  handleGotoCheckout: () => void
  handlePrint: () => void
}

export default function BuyerQuoteActions({
  hasDraft,
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
            {(mode === 'create' || mode === 'edit') &&
              hasAnyPermission(actions.MANAGE_QUOTES, b2bUserActions.UPDATE_QUOTE) && (
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  sx={{ width: { xs: '50%', md: '100%' } }}
                  disabled={quoteGetters.isClearChangesButtonDisabled(status, hasDraft)}
                  onClick={handleClearChanges}
                >
                  {t('clear-changes')}
                </LoadingButton>
              )}
            {!mode && hasAnyPermission(actions.MANAGE_QUOTES, b2bUserActions.UPDATE_QUOTE) && (
              <LoadingButton
                variant="contained"
                color="secondary"
                sx={{ width: { xs: '50%', md: '100%' } }}
                disabled={quoteGetters.isEditQuoteButtonDisabled(status)}
                onClick={handleEditQuote}
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
          {(mode === 'create' || mode === 'edit') &&
            hasAnyPermission(actions.MANAGE_QUOTES, b2bUserActions.UPDATE_QUOTE) && (
              <Box>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={quoteGetters.isSubmitForApprovalButtonDisabled(
                    status,
                    isSubmitForApprovalEnabled,
                    hasDraft
                  )}
                  onClick={handleSubmitForApproval}
                >
                  {t('submit-for-approval')}
                </LoadingButton>
              </Box>
            )}
          <NoSsr>
            {hasAnyPermission(actions.CREATE_CHECKOUT, b2bUserActions.CREATE_OR_UPDATE_ORDER) &&
              QuoteStatus[status] === QuoteStatus.ReadyForCheckout && (
                <Box>
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={hasDraft}
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
