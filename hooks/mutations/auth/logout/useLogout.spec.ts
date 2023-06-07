import { renderHook } from '@testing-library/react-hooks'

import { useLogout } from './useLogout'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useLogout', () => {
  it('should use useLogout', async () => {
    renderHook(
      async () => {
        const { mutateAsync } = useLogout(() => {
          console.log('logged out successfully')
        })
        const response = await mutateAsync()

        expect(response).toStrictEqual(true)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
