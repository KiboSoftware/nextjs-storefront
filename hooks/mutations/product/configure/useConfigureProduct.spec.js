import { renderHook } from '@testing-library/react-hooks'

import { useConfigureProduct } from './useConfigureProduct'
import { configuredProductMock } from '@/__mocks__/stories/configuredProductMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useConfigureProduct', () => {
  it('should use useConfigureProduct', async () => {
    const configureProductDetails = {
      updatedOptions: [
        {
          attributeFQN: 'tenant~size',
          value: 'Small',
        },
      ],
      productCode: 'BackP_001',
    }

    renderHook(
      async () => {
        const { configureProduct } = useConfigureProduct()
        const response = await configureProduct.mutateAsync(configureProductDetails)
        expect(response).toStrictEqual(configuredProductMock.configureProduct)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
