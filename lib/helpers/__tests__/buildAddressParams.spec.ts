import { buildAddressParams } from '../buildAddressParams'
import { AddressParams } from '@/lib/types'

describe('buildAddressParams', () => {
  it('should build the address parameters with contactId when address has a contact', () => {
    // Arrange
    const params = {
      accountId: 1,
      address: {
        contact: {
          id: 1234,
          firstName: 'John',
          lastNameOrSurname: 'Doe',
          address: {
            address1: 'test-address',
            address2: 'test-address',
            cityOrTown: 'test-city',
            postalOrZipCode: '12345',
            stateOrProvince: 'TX',
            countryCode: 'US',
          },
          phoneNumbers: {
            home: '111111111',
          },
        },
      },
      isDefaultAddress: true,
      addressType: 'billing',
    }

    // Act
    const result = buildAddressParams(params)

    // Assert
    expect(result).toEqual({
      accountId: 1,
      customerContactInput: {
        id: 1234,
        firstName: 'John',
        lastNameOrSurname: 'Doe',
        address: {
          address1: 'test-address',
          address2: 'test-address',
          cityOrTown: 'test-city',
          postalOrZipCode: '12345',
          stateOrProvince: 'TX',
          countryCode: 'US',
        },
        phoneNumbers: {
          home: '111111111',
        },
        types: [
          {
            name: 'billing',
            isPrimary: true,
          },
        ],
        accountId: 1,
      },
      contactId: 1234,
    })
  })

  it('should build the address parameters without contactId when address does not have a contact', () => {
    // Arrange
    const params: AddressParams = {
      accountId: 1,
      address: {
        // No contact provided
        contact: {
          firstName: 'John',
          lastNameOrSurname: 'Doe',
          address: {
            address1: 'test-address',
            address2: 'test-address',
            cityOrTown: 'test-city',
            postalOrZipCode: '12345',
            stateOrProvince: 'TX',
            countryCode: 'US',
          },
          phoneNumbers: {
            home: '111111111',
          },
        },
      },
      isDefaultAddress: false,
      addressType: 'shipping',
    }

    // Act
    const result = buildAddressParams(params)

    // Assert
    expect(result).toEqual({
      accountId: 1,
      customerContactInput: {
        firstName: 'John',
        lastNameOrSurname: 'Doe',
        address: {
          address1: 'test-address',
          address2: 'test-address',
          cityOrTown: 'test-city',
          postalOrZipCode: '12345',
          stateOrProvince: 'TX',
          countryCode: 'US',
        },
        phoneNumbers: {
          home: '111111111',
        },
        types: [
          {
            name: 'shipping',
            isPrimary: false,
          },
        ],
        accountId: 1,
      },
    })
  })
})
