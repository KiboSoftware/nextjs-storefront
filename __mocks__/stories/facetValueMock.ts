import type { FacetValue } from '@/lib/gql/types'

export const facetValueMock: FacetValue[] = [
  {
    label: 'Black',
    value: 'black',
    filterValue: 'tenant~color:black',
    isDisplayed: true,
    count: 3,
    isApplied: true,
    childrenFacetValues: null,
  },
  {
    label: '50 to 500',
    value: 'price:[50 TO 500]',
    filterValue: 'price:[50 TO 500]',
    isDisplayed: true,
    count: 3,
    isApplied: true,
    childrenFacetValues: null,
  },
  {
    label: 'Columbia',
    value: 'columbia',
    filterValue: 'Tenant~brand:columbia',
    isDisplayed: true,
    count: 2,
    isApplied: true,
    childrenFacetValues: null,
  },
  {
    label: 'Nike',
    value: 'nike',
    filterValue: 'tenant~brand:nike',
    isDisplayed: true,
    count: 1,
    isApplied: true,
    childrenFacetValues: null,
  },
  {
    label: 'Adidas',
    value: 'adidas',
    filterValue: 'tenant~brand:adidas',
    isDisplayed: true,
    count: 1,
    isApplied: true,
    childrenFacetValues: null,
  },
]
