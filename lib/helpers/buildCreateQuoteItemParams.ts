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
        options: product?.options?.map((option: any) => {
          const selected = option?.values?.find((value: any) => value?.isSelected)
          return {
            name: option?.attributeDetail?.name,
            value: selected?.value || selected?.stringValue || selected?.shopperEnteredValue,
            attributeFQN: option?.attributeFQN,
          }
        }),
        productCode: product?.productCode || '',
        variationProductCode: product?.variationProductCode || '',
      },
      quantity,
      fulfillmentMethod: product?.fulfillmentMethod,
      fulfillmentLocationCode: product?.purchaseLocationCode,
    },
  }
}
