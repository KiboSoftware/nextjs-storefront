export const subscriptionItemProductFragment = /* GraphQL */ `
  fragment subscriptionItemProductFragment on SBProduct {
    productCode
    name
    description
    imageUrl
    options {
      attributeFQN
      name
      value
    }
    properties {
      attributeFQN
      name
      values {
        stringValue
        value
      }
    }
    sku
    price {
      price
      salePrice
    }
    categories {
      id
    }
  }
`

export const baseSkipSubscriptionFragment = /* GraphQL */ `
  fragment baseSkipSubscriptionFragment on Subscription {
    id
    number
    parentOrderId
    nextOrderDate
    lastContinuityOrderDateOnSubPaused
    nextOrderDateOffsetCounter
    subscriptionSkipCounter
    couponCodes
  }
`

export const subscriptionItemFragment = /* GraphQL */ `
  fragment subscriptionItemFragment on SBSubscriptionItem {
    fulfillmentLocationCode
    fulfillmentMethod
    id
    total
    subtotal
    discountTotal
    quantity
    product {
      ...subscriptionItemProductFragment
    }
    fulfillmentMethod
    parentItemCode
    isOnetimeItem
    localeCode
    purchaseLocation
    lineId
    extendedTotal
    taxableTotal
    discountedTotal
    itemTaxTotal
    shippingTaxTotal
    shippingTotal
    handlingAmount
    feeTotal
    unitPrice {
      listAmount
      saleAmount
    }
    productDiscounts {
      discountQuantity
      couponCode
    }
    data
    shippingAmountBeforeDiscountsAndAdjustments
    weightedOrderAdjustment
    weightedOrderDiscount
    adjustedLineItemSubtotal
    totalWithoutWeightedShippingAndHandling
    weightedOrderTax
    weightedOrderShipping
    weightedOrderShippingDiscount
    weightedOrderShippingManualAdjustment
    weightedOrderShippingTax
    weightedOrderHandlingFee
    weightedOrderHandlingFeeTax
    weightedOrderHandlingFeeDiscount
    weightedOrderDuty
    totalWithWeightedShippingAndHandling
    weightedOrderHandlingAdjustment
    autoAddDiscountId
    isAssemblyRequired
    childItemIds
    parentItemId
    lineItemAdjustment
  }
  ${subscriptionItemProductFragment}
`

export const SBbillingContactFragment = /* GraphQL */ `
  fragment SBbillingContactFragment on SBContact {
    id
    firstName
    middleNameOrInitial
    lastNameOrSurname
    email
    address {
      address1
      address2
      address3
      addressType
      stateOrProvince
      postalOrZipCode
      cityOrTown
      countryCode
      isValidated
    }
    phoneNumbers {
      home
    }
  }
`

export const subscriptionPaymentFragment = /* GraphQL */ `
  fragment subscriptionPaymentFragment on SBPayment {
    id
    paymentType
    status
    paymentWorkflow
    amountCollected
    amountCredited
    amountRequested
    billingInfo {
      billingContact {
        ...SBbillingContactFragment
      }
      isSameBillingShippingAddress
      card {
        paymentServiceCardId
        isTokenized
        paymentOrCardType
        cardNumberPartOrMask
        expireMonth
        expireYear
      }
    }
  }
  ${SBbillingContactFragment}
`

export const subscriptionReasonsFragment = /* GraphQL */ `
  fragment subscriptionReasonsFragment on SubscriptionReason {
    reasonCode
    description
    moreInfo
    actionName
  }
`

export const subscriptionDiscountFragment = /* GraphQL */ `
  fragment subscriptionDiscountFragment on SBAppliedDiscount {
    impact
    discount {
      id
      name
    }
    couponCode
  }
`

export const subscriptionOneTimeProductFragment = /* GraphQL */ `
  fragment subscriptionOneTimeProductFragment on OnetimeProduct {
    fulfillmentLocationCode
    fulfillmentType
    productName
    productCode
    variationProductCode
    quantity
    options {
      name
      value
      attributeFQN
      shopperEnteredValue
    }
  }
`

export const subscriptionFullfillmentInfoFragment = /* GraphQL */ `
  fragment subscriptionFullfillmentInfoFragment on SBFulfillmentInfo {
    shippingMethodCode
    shippingMethodName
    fulfillmentContact {
      address {
        address1
        address2
        addressType
        cityOrTown
        countryCode
        isValidated
        postalOrZipCode
        stateOrProvince
      }
      companyOrOrganization
      email
      firstName
      id
      lastNameOrSurname
      middleNameOrInitial
      phoneNumbers {
        home
      }
    }
  }
`
