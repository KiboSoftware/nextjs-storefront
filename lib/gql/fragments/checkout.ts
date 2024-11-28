export const checkoutItemProductFragment = /* GraphQL */ `
  fragment checkoutItemProductFragment on CrProduct {
    productCode
    name
    description
    imageUrl
    options {
      attributeFQN
      name
      value
      shopperEnteredValue
    }
    properties {
      attributeFQN
      name
      values {
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
export const checkoutLineItemFragment = /* GraphQL */ `
  fragment checkoutLineItemFragment on CrOrderItem {
    fulfillmentLocationCode
    fulfillmentMethod
    purchaseLocation
    id
    total
    subtotal
    discountTotal
    quantity
    productDiscounts {
      discountQuantity
      productQuantity
      impactPerUnit
      impact
      excluded
      discount {
        id
        name
        hasMultipleTargetProducts
      }
    }
    product {
      ...checkoutItemProductFragment
    }
    fulfillmentMethod
  }
  ${checkoutItemProductFragment}
`

export const baseCheckoutFragment = /* GraphQL */ `
  fragment baseCheckoutFragment on CrOrder {
    id
    email
    continuityOrderOrdinal
    totalCollected
    amountAvailableForRefund
    amountRemainingForPayment
    amountRefunded
    handlingAmount
    handlingSubTotal
    handlingTotal
    handlingTaxTotal
    handlingDiscounts {
      impact
      discount {
        id
        name
        itemIds
      }
      couponCode
      excluded
    }
    total
    shippingDiscounts {
      methodCode
      discount {
        impact
        couponCode
        excluded
        discount {
          id
          name
        }
      }
    }
    shippingTotal
    shippingTaxTotal
    shippingSubTotal
    discountTotal
    discountedSubtotal
    discountedTotal
    subtotal
    lineItemSubtotalWithOrderAdjustments
    itemTaxTotal
    taxTotal
    orderNumber
    couponCodes
    currencyCode
    invalidCoupons {
      couponCode
      reason
    }
    orderDiscounts {
      impact
      discount {
        id
        name
      }
      couponCode
    }

    billingInfo {
      billingContact {
        id
        email
        firstName
        middleNameOrInitial
        lastNameOrSurname
        companyOrOrganization
        phoneNumbers {
          home
          mobile
          work
        }
        address {
          address1
          address2
          address3
          address4
          cityOrTown
          stateOrProvince
          postalOrZipCode
          countryCode
          addressType
          isValidated
        }
      }
    }

    fulfillmentInfo {
      shippingMethodCode
      shippingMethodName
      fulfillmentContact {
        id
        email
        firstName
        middleNameOrInitial
        lastNameOrSurname
        companyOrOrganization
        phoneNumbers {
          home
          mobile
          work
        }
        address {
          address1
          address2
          address3
          address4
          cityOrTown
          stateOrProvince
          postalOrZipCode
          countryCode
          addressType
          isValidated
        }
      }
    }
  }
`
export const billingContactFragment = /* GraphQL */ `
  fragment billingContactFragment on CrContact {
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

export const fullfillmentInfoFragment = /* GraphQL */ `
  fragment fullfillmentInfoFragment on CrFulfillmentInfo {
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

export const checkoutPaymentFragment = /* GraphQL */ `
  fragment checkoutPaymentFragment on CrPayment {
    id
    paymentType
    status
    paymentWorkflow
    amountCollected
    amountCredited
    amountRequested
    billingInfo {
      billingContact {
        ...billingContactFragment
      }
      isSameBillingShippingAddress
      purchaseOrder {
        purchaseOrderNumber
        paymentTerm {
          description
          code
        }
      }
      card {
        paymentServiceCardId
        isTokenized
        paymentOrCardType
        cardNumberPartOrMask
        expireMonth
        expireYear
        isCardInfoSaved
      }
    }
  }
  ${billingContactFragment}
`

export const shipmentItemFragment = /* GraphQL */ `
  fragment shipmentItemFragment on ShipmentItem {
    items {
      productCode
      variationProductCode
      originalOrderItemId
      name
      imageUrl
      quantity
      parentItemId

      options {
        attributeFQN
        name
        value
        shopperEnteredValue
      }
    }
  }
`

export const checkoutGroupingsFragment = /* GraphQL */ `
  fragment checkoutGroupingsFragment on CheckoutGrouping {
    id
    destinationId
    orderItemIds
    fulfillmentMethod
    shippingMethodCode
    shippingMethodName
    dutyTotal
    shippingSubTotal
    itemLevelShippingDiscountTotal
    orderLevelShippingDiscountTotal
    shippingTaxTotal
    shippingTotal
    handlingSubTotal
    itemLevelHandlingDiscountTotal
    orderLevelHandlingDiscountTotal
    handlingTaxTotal
    handlingTotal
  }
`
export const baseMultiShipCheckoutFragment = /* GraphQL */ `
  fragment baseMultiShipCheckoutFragment on Checkout {
    id
    email
    siteId
    tenantId
    number
    originalCartId
    submittedDate
    type
    feeTotal
    subTotal
    itemTaxTotal
    itemTotal
    shippingSubTotal
    shippingTaxTotal
    itemLevelShippingDiscountTotal
    orderLevelShippingDiscountTotal
    shippingTotal
    handlingSubTotal
    itemLevelHandlingDiscountTotal
    orderLevelHandlingDiscountTotal
    handlingTaxTotal
    handlingTotal
    total
    amountRemainingForPayment
    itemLevelProductDiscountTotal
    orderLevelProductDiscountTotal
  }
`
