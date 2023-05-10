import { renderHook } from '@testing-library/react-hooks'

import { useGetCategoryTree } from './useGetCategoryTree'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCategoryTree', () => {
  it('should return category tree if initial data not passed', async () => {
    const { result, waitFor } = renderHook(() => useGetCategoryTree({}), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(categoryTreeDataMock.categoriesTree.items)
  })
})
