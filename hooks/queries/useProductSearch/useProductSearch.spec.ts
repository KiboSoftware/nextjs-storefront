import { renderHook } from '@testing-library/react-hooks'

import { useProductSearch } from './useProductSearch'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useProductSearch', () => {
  it('should return product search result when facet filters is selected', async () => {
    const { result, waitFor } = renderHook(
      () =>
        useProductSearch(
          { categoryCode: '41', filters: ['Tenant~color:black,Tenant~color:blue'] },
          productSearchResultMock
        ),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(productSearchResultMock)
  })
})
