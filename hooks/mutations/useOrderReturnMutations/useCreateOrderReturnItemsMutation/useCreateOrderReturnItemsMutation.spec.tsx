import { renderHook } from '@testing-library/react-hooks'

import { useCreateOrderReturnItemsMutation } from './useCreateOrderReturnItemsMutation'
import { createReturnMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateOrderReturnItemsMutation', () => {
  it('should use useCreateOrderReturnItemsMutation', async () => {
    const expectedReturn = createReturnMock?.createReturn

    renderHook(
      async () => {
        const { createReturnItems } = useCreateOrderReturnItemsMutation()
        const response = await createReturnItems.mutateAsync({
          returnType: 'Replace',
          reason: 'Damaged',
          originalOrderId: '',
          items: [],
          locationCode: '',
        })
        expect(response).toEqual(expectedReturn)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
