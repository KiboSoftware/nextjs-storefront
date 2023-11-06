export const orderItemProductFragment = /* GraphQL */ `
  fragment orderItemProductFragment on CrProduct {
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

export const contactForOrdersFragment = /* GraphQL */ `
  fragment contactForOrdersFragment on CrContact {
    id
    firstName
    middleNameOrInitial
    lastNameOrSurname
    email
    companyOrOrganization
    address {
      address1
      address2
      address3
      address4
      addressType
      stateOrProvince
      postalOrZipCode
      cityOrTown
      countryCode
      isValidated
    }
    phoneNumbers {
      home
      mobile
      work
    }
  }
`

export const orderItemFragment = /* GraphQL */ `
  fragment orderItemFragment on CrOrderItem {
    fulfillmentMethod
    id
    total
    subtotal
    discountTotal
    quantity
    fulfillmentLocationCode
    lineId
    originalCartItemId
    product {
      ...orderItemProductFragment
    }
  }
  ${orderItemProductFragment}
`

export const baseOrderFragment = /* GraphQL */ `
  fragment baseOrderFragment on CrOrder {
    id
    email
    total
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
    submittedDate
    status
    orderDiscounts {
      impact
      discount {
        id
        name
      }
      couponCode
    }
    invalidCoupons {
      couponCode
    }
    couponCodes
    billingInfo {
      billingContact {
        ...contactForOrdersFragment
      }
    }

    fulfillmentInfo {
      shippingMethodCode
      shippingMethodName
      fulfillmentContact {
        ...contactForOrdersFragment
      }
    }
    returnStatus
  }
  ${contactForOrdersFragment}
`

export const orderPaymentFragment = /* GraphQL */ `
  fragment orderPaymentFragment on CrPayment {
    id
    paymentType
    paymentWorkflow
    status
    billingInfo {
      billingContact {
        ...contactForOrdersFragment
      }
      isSameBillingShippingAddress
      card {
        paymentServiceCardId
        isTokenized
        paymentOrCardType
        cardNumberPartOrMask
        expireMonth
        expireYear
        isCardInfoSaved
      }
      purchaseOrder {
        purchaseOrderNumber
        paymentTerm {
          code
          description
        }
      }
    }
  }
`
export const orderShipmentFragment = /* GraphQL */ `
  fragment orderShipmentFragment on CrShipment {
    id
    externalShipmentId
    number
    orderId
    orderNumber
    packages {
      shipmentId
      code
      carrier
      packageId
      trackingNumber
      trackingNumbers
      trackings {
        number
        attributes
      }
      status
      returnCarrier
      returnTrackingNumbers
      returnTrackings {
        number
        attributes
      }
    }
  }
`
