import { renderHook } from '@testing-library/react-hooks'

import { useCreateCheckoutPaymentMethod } from './useCreateCheckoutPaymentMethod'
import { createOrderPaymentActionMock } from '@/__mocks__/stories/createOrderPaymentActionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckoutPaymentMethod', () => {
  it('should use useCreateCheckoutPaymentMethod', async () => {
    const createCheckoutPaymentMethodParams = {
      orderId: '13eaad5a5526f20001d2fab9000074e7',
      paymentAction: {
        currencyCode: 'US',
        amount: 220,
        newBillingInfo: {
          billingContact: {
            email: 'chandradeepta.laha@kibocommerce.com',
            firstName: 'John',
            middleNameOrInitial: null,
            lastNameOrSurname: 'Doe',
            companyOrOrganization: null,
            phoneNumbers: {
              home: '9898495849',
              mobile: null,
              work: null,
            },
            address: {
              address1: 'Lamar Street',
              address2: '23/1',
              address3: null,
              address4: null,
              cityOrTown: 'Austin',
              stateOrProvince: 'TX',
              postalOrZipCode: '87878',
              countryCode: 'US',
              addressType: null,
              isValidated: false,
            },
            id: null,
          },
          card: {
            isCardInfoSaved: false,
            paymentOrCardType: 'VISA',
            expireMonth: 1,
            expireYear: 2026,
            paymentServiceCardId: '91ee65434560404488c382a9295526ae',
            cardNumberPartOrMask: '************1111',
            isUsedRecurring: false,
            isTokenized: true,
          },
          paymentType: 'CreditCard',
          paymentWorkflow: 'Mozu',
          isSameBillingShippingAddress: false,
        },
        actionName: '',
      },
    }

    renderHook(
      async () => {
        const createCheckoutPaymentMethod = useCreateCheckoutPaymentMethod()
        const response = await createCheckoutPaymentMethod.mutateAsync(
          createCheckoutPaymentMethodParams
        )

        expect(response).toStrictEqual(createOrderPaymentActionMock.createOrderPaymentAction)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
