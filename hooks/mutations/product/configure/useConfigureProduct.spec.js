import { renderHook, waitFor } from '@testing-library/react'

import { useConfigureProduct } from './useConfigureProduct'
import { configuredProductMock } from '@/__mocks__/stories/configuredProductMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useConfigureProduct', () => {
  it('should use useConfigureProduct', async () => {
    const { result } = renderHook(() => useConfigureProduct(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.configureProduct.mutateAsync({
      updatedOptions: [
        {
          attributeFQN: 'tenant~size',
          value: 'Small',
        },
      ],
      productCode: 'BackP_001',
    })

    await waitFor(() => {
      expect(result.current.configureProduct.data).toStrictEqual(
        configuredProductMock.configureProduct
      )
    })
  })
})
