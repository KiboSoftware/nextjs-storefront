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
  fragment contactForOrdersFragment on Contact {
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
    product {
      ...orderItemProductFragment
    }
  }
  ${orderItemProductFragment}
`

export const baseOrderFragment = /* GraphQL */ `
  fragment baseOrderFragment on Order {
    id
    email
    total
    shippingTotal
    discountTotal
    subtotal
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
  }
  ${contactForOrdersFragment}
`

export const orderPaymentFragment = /* GraphQL */ `
  fragment orderPaymentFragment on Payment {
    id
    paymentType
    paymentWorkflow
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
      }
    }
  }
`
