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
    fulfillmentMethod
    id
    total
    subtotal
    discountTotal
    quantity
    product {
      ...checkoutItemProductFragment
    }
    fulfillmentMethod
  }
  ${checkoutItemProductFragment}
`

export const baseCheckoutFragment = /* GraphQL */ `
  fragment baseCheckoutFragment on Order {
    id
    email
    total
    shippingTotal
    discountTotal
    subtotal
    taxTotal
    orderNumber
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
  fragment billingContactFragment on Contact {
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
  fragment fullfillmentInfoFragment on FulfillmentInfo {
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
  fragment checkoutPaymentFragment on Payment {
    id
    paymentType
    paymentWorkflow
    billingInfo {
      billingContact {
        ...billingContactFragment
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
  ${billingContactFragment}
`
