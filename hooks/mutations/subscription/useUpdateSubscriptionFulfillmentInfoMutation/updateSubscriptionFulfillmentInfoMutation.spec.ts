import { renderHook } from '@testing-library/react-hooks'

import { useUpdateSubscriptionFulfillmentInfoMutation } from './updateSubscriptionFulfillmentInfoMutation'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] updateSubscriptionFulfillmentInfo', () => {
  it('should use updateSubscriptionFulfillmentInfo', async () => {
    const params = {
      subscriptionId: '149ceaac15c2eb00016c498e000045a4',
      fulfillmentInfoInput: {
        fulfillmentContact: {
          id: 1,
          email: 'sushant2009@gmail.com',
          firstName: 'sushant',
          middleNameOrInitial: 'v',
          lastNameOrSurname: 'jadhav',
          companyOrOrganization: '',
          phoneNumbers: {
            home: 'home 1',
            mobile: 'mobile 1',
            work: 'work 1',
          },
          address: {
            address1: 'address 1',
            address2: 'address 2',
            address3: 'address 3',
            address4: 'address 4',
            cityOrTown: 'cityOrTown 1',
            stateOrProvince: 'stateOrProvince 1',
            postalOrZipCode: 'postalOrZipCode 1',
            countryCode: 'US',
          },
        },
        shippingMethodCode: '$15',
        shippingMethodName: 'direct',
      },
    }

    renderHook(
      async () => {
        const { updateSubscriptionFulfillmentInfoMutation } =
          useUpdateSubscriptionFulfillmentInfoMutation()
        const response = await updateSubscriptionFulfillmentInfoMutation.mutateAsync(params)

        expect(response).toStrictEqual(subscriptionMock.subscription.fulfillmentInfo)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
