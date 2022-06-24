import type { CategoryFacetData } from '@/components/product-listing/CategoryFacet/CategoryFacet'

export const categoryFacetDataMock: CategoryFacetData = {
  header: 'Apparel',
  childrenCategories: [
    {
      label: 'Bottoms',
      count: 16,
      value: '10',
      filterValue: 'categoryCode:10',
      isDisplayed: true,
    },
    {
      label: 'Jackets',
      count: 15,
      value: '23',
      filterValue: 'categoryCode:23',
      isDisplayed: true,
    },
    {
      label: 'Footwear',
      count: 50,
      value: '44',
      filterValue: 'categoryCode:44',
      isDisplayed: true,
    },
    {
      label: 'Tops',
      count: 25,
      value: '88',
      filterValue: 'categoryCode:88',
      isDisplayed: true,
    },
    {
      label: 'Road',
      count: 18,
      value: '77',
      filterValue: 'categoryCode:77',
      isDisplayed: true,
    },
    {
      label: 'Mountain',
      count: 21,
      value: '38',
      filterValue: 'categoryCode:38',
      isDisplayed: true,
    },
    {
      label: 'Paddles',
      count: 22,
      value: '99',
      filterValue: 'categoryCode:99',
      isDisplayed: true,
    },
    {
      label: 'Tent',
      count: 20,
      value: '79',
      filterValue: 'categoryCode:79',
      isDisplayed: true,
    },
  ],
}
