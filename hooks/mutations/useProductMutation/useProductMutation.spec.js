import { renderHook } from '@testing-library/react-hooks'

import { configuredProductDataMock } from '../../../__mocks__/stories/configuredProductDataMock'
import { createQueryClientWrapper } from '../../../__test__/utils/renderWithQueryClient'
import { useProductMutation } from './useProductMutation'

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
        expect(response).toStrictEqual(configuredProductDataMock.configureProduct)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
