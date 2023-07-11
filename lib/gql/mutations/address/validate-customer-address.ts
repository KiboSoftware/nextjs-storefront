import { addressFragment } from '../../fragments'

const validateCustomerAddress = /* GraphQL */ `
  mutation validateCustomerAddress($addressValidationRequestInput: AddressValidationRequestInput) {
    validateCustomerAddress(addressValidationRequestInput: $addressValidationRequestInput) {
      addressCandidates {
        ...addressFragment
      }
    }
  }

  ${addressFragment}
`
export default validateCustomerAddress
