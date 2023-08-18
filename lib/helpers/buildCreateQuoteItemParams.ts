import { MutationCreateQuoteItemArgs } from '../gql/types'

export const buildCreateQuoteItemParams = (
  quoteId: string,
  updateMode: string,
  product: any,
  quantity: number
): MutationCreateQuoteItemArgs => {
  return {
    quoteId,
    updateMode,
    orderItemInput: {
      product: {
        options: product?.options,
        productCode: product?.productCode || '',
        variationProductCode: product?.variationProductCode || '',
      },
      quantity,
      fulfillmentMethod: product?.fulfillmentMethod,
      fulfillmentLocationCode: product?.purchaseLocationCode,
    },
  }
}
