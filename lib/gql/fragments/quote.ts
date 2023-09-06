import { quoteAuditInfoFragment } from './b2b/quote-audit-info'

export const quoteFragment = `
fragment quoteFragment on Quote {
        id
        name
        siteId
        tenantId
        number
        hasDraft
        submittedDate 
        expirationDate
        email
        itemTotal
        total
        shippingTotal
        status 
        subTotal        
        shippingSubTotal
        handlingTotal
        handlingSubTotal
        itemTaxTotal
        shippingTaxTotal
        handlingTaxTotal
        dutyTotal
        handlingAdjustment {
            amount
            description
        }
        shippingAdjustment  {
            amount
            description
        }
        adjustment {
            amount
            description
        }
        items {
            id
            quantity
            fulfillmentMethod 
            fulfillmentLocationCode
            unitPrice {
            listAmount
            saleAmount
            }
            discountTotal
            discountedTotal
            total            
            shippingTotal        
            dutyAmount
            product {
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
        }
        auditInfo {
            updateDate
            createDate
            updateBy
            createBy
        }
        auditHistory {
            auditInfo {
            ...quoteAuditInfoFragment
            }
            changes {
                type
                path
                fields {
                    name
                    oldValue
                    newValue
                }
            }
        }
        comments {
            id
            text
            auditInfo {
            updateDate
            createDate
            updateBy
            createBy
            }
        }
        fulfillmentInfo {
            fulfillmentContact {
                id
                email
                firstName
                lastNameOrSurname
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
                    addressType 
                    isValidated
                    countryCode
                }
            }
            shippingMethodCode
            shippingMethodName
        }
        userId
        customerAccountId
  }
  ${quoteAuditInfoFragment}
`
