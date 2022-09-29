import { renderHook } from '@testing-library/react-hooks'

import { useProductMutation } from './useProductMutation'
import { configuredProductMock } from '@/__mocks__/stories/configuredProductMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useProductMutation', () => {
  it('should use useProductMutation', async () => {
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
        const { configureProduct } = useProductMutation()
        const response = await configureProduct.mutateAsync(configureProductDetails)
        expect(response).toStrictEqual(configuredProductMock.configureProduct)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
