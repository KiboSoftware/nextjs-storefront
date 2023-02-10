export const subscriptionMock = {
  subscription: {
    id: '149ceaac15c2eb00016c498e000045a4',
    parentOrderId: '149cea5a64f5110001a46c10000045a4',
    number: 1,
    status: 'Active',
    items: [
      {
        id: '5f9a38df85824d17a2a0af6d00fcbe06',
        quantity: 10,
      },
    ],
    fulfillmentInfo: {
      fulfillmentContact: {
        firstName: 'sushant',
        middleNameOrInitial: 'v',
        lastNameOrSurname: 'jadhav',
        email: 'sushant2009@gmail.com',
        address: {
          address1: 'address 1',
          address2: 'address 2',
          address3: 'address 3',
          address4: 'address 4',
          cityOrTown: 'cityOrTown 1',
          stateOrProvince: 'stateOrProvince 1',
          postalOrZipCode: 'postalOrZipCode 1',
          countryCode: 'US',
          addressType: null,
          isValidated: false,
        },
        phoneNumbers: {
          home: '123456',
          mobile: null,
          work: null,
        },
      },
      shippingMethodCode: '691f94b2b57e47239456ada600cdcc9e',
      shippingMethodName: 'Flat Rate',
    },
    frequency: {
      unit: 'Month',
      value: 1,
    },
    nextOrderDate: 1683072000000,
  },
}
