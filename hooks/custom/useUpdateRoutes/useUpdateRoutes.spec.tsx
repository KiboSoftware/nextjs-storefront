import '@testing-library/jest-dom'
import { useUpdateRoutes } from './useUpdateRoutes'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementation(() => ({
  query: { categoryCode: '41', filters: 'Tenant~color:black,Tenant~color:blue' },
  push,
}))

describe('useUpdateRoutes', () => {
  const { changeFilters, updateRoute } = useUpdateRoutes()
  it('should add the filter to the url if filter is not present', () => {
    updateRoute('Tenant~color:black')
    expect(push).toHaveBeenCalledWith({
      pathname: undefined,
      query: { categoryCode: '41', filters: 'Tenant~color:blue' },
    })
  })

  it('should remove the filter to the url if filter is present', () => {
    updateRoute('Tenant~color:red')
    expect(push).toHaveBeenCalled()
  })

  it('should remove all the filters', () => {
    changeFilters('')
    expect(push).toHaveBeenCalled()
  })
})
