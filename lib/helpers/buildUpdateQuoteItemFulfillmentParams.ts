import { MutationUpdateQuoteItemFulfillmentArgs } from '../gql/types'

export const buildUpdateQuoteItemFulfillmentParams = (
  quoteId: string,
  quoteItemId: string,
  updateMode: string,
  product: any,
  quantity: number,
  fulfillmentMethod: string,
  locationCode: string
): MutationUpdateQuoteItemFulfillmentArgs => {
  return {
    quoteId,
    updateMode,
    quoteItemId,
    orderItemInput: {
      product: {
        options: product?.options,
        productCode: product?.productCode || '',
        variationProductCode: product?.variationProductCode || '',
      },
      quantity,
      fulfillmentMethod,
      fulfillmentLocationCode: locationCode,
    },
  }
}
