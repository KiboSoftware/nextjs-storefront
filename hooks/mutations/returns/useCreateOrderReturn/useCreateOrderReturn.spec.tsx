import { renderHook } from '@testing-library/react-hooks'

import { useCreateOrderReturn } from './useCreateOrderReturn'
import { createReturnMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateOrderReturn', () => {
  it('should use useCreateOrderReturn', async () => {
    const expectedReturn = createReturnMock?.createReturn

    renderHook(
      async () => {
        const { createReturnItems } = useCreateOrderReturn()
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
