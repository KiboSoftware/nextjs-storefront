import type { QuoteAdjustmentInput } from '@/lib/gql/types'

export interface QuoteAdjustmentsParams {
  quoteId: string
  updateMode: string
  quoteAdjustmentInput: QuoteAdjustmentInput
}

export interface UpdateQuoteAdjustmentsParams {
  quoteId: string
  updateMode: string
  adjustment: number
  shippingAdjustment: number
  handlingAdjustment: number
}

export const buildUpdateQuoteAdjustmentsParams = (
  params: UpdateQuoteAdjustmentsParams
): QuoteAdjustmentsParams => {
  const { quoteId, updateMode, adjustment, shippingAdjustment, handlingAdjustment } = params

  return {
    quoteId,
    updateMode,
    quoteAdjustmentInput: {
      adjustment,
      shippingAdjustment,
      handlingAdjustment,
    },
  } as QuoteAdjustmentsParams
}
