import { MutationCreateQuoteArgs } from '../gql/types'

export const buildCreateQuoteParams = (customerAccountId: number): MutationCreateQuoteArgs => {
  return {
    quoteInput: {
      siteId: 0,
      tenantId: 0,
      subTotal: 0,
      customerAccountId,
      itemLevelProductDiscountTotal: 0,
      orderLevelProductDiscountTotal: 0,
      itemTaxTotal: 0,
      itemTotal: 0,
      total: 0,
      itemLevelShippingDiscountTotal: 0,
      orderLevelShippingDiscountTotal: 0,
      shippingAmount: 0,
      shippingSubTotal: 0,
      shippingTaxTotal: 0,
      shippingTotal: 0,
      itemLevelHandlingDiscountTotal: 0,
      orderLevelHandlingDiscountTotal: 0,
      handlingSubTotal: 0,
      handlingTaxTotal: 0,
      handlingTotal: 0,
      dutyTotal: 0,
      feeTotal: 0,
    },
  }
}
