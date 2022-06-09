import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'

import CategoryPage, { getServerSideProps } from '../../../pages/category/[categoryCode]'

nextRouter.useRouter = jest.fn()
const imageBaseURL = 'https://cdn-sb.mozu.com/30294-50525/cms/50525/files/'
jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        products: {
          totalCount: 1,
          pageSize: 20,
          pageCount: 3,
          startIndex: 0,
          items: [
            {
              productCode: 'SHOE12',
              productUsage: 'Configurable',
              isPackagedStandAlone: false,
              categories: [
                {
                  categoryCode: '37',
                  categoryId: 8,
                  isDisplayed: true,
                  parentCategory: {
                    categoryId: 2,
                    categoryCode: '27',
                    isDisplayed: true,
                    content: {
                      name: 'Camping',
                      slug: 'camping',
                    },
                  },
                  content: {
                    name: 'Shoes',
                    slug: 'shoes',
                  },
                },
              ],
              purchasableState: {
                isPurchasable: false,
              },
              price: {
                price: 85,
                salePrice: null,
              },
              priceRange: null,
              properties: [
                {
                  attributeFQN: 'tenant~product-crosssell',
                  attributeDetail: {
                    name: 'Product Cross-Sells',
                  },
                  isHidden: false,
                },
              ],
              content: {
                productFullDescription: '',
                productShortDescription:
                  'This comfort fit cycling shoe is sure to make your cycling experience a blast. Throw on a pair of these bad boys and hit the road!',
                seoFriendlyUrl: 'izumi-bike-shoes',
                productName: 'Izumi Bike Shoes',
                productImages: [
                  {
                    imageUrl: `${imageBaseURL}3e86a4ad-502e-4477-9258-a40b00be7488`,
                    imageLabel: null,
                    mediaType: null,
                  },
                ],
              },
              options: [
                {
                  attributeFQN: 'tenant~color',
                  attributeDetail: {
                    name: 'Color',
                    inputType: 'List',
                  },
                  isProductImageGroupSelector: false,
                  isRequired: true,
                  isMultiValue: false,
                  values: [
                    {
                      value: 'Orange',
                      isSelected: false,
                      deltaPrice: null,
                      stringValue: 'Orange',
                    },
                  ],
                },
              ],
            },
          ],
          facets: [
            {
              label: 'Category',
              facetType: 'Hierarchy',
              field: 'CategoryId',
              values: [
                {
                  label: 'Skiing',
                  value: '1',
                  filterValue: 'categoryId:1',
                  isDisplayed: true,
                  count: 30,
                  isApplied: null,
                  childrenFacetValues: [
                    {
                      label: 'Ski Jackets',
                      count: 15,
                      value: '16',
                      filterValue: 'categoryId:16',
                      isDisplayed: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        categoriesTree: {
          items: [
            {
              count: 28,
              categoryId: 1,
              categoryCode: 'M',
              isDisplayed: null,
              content: {
                name: 'Men',
                slug: 'mens',
                description: 'Mens stuff',
              },
              childrenCategories: [
                {
                  count: 0,
                  categoryId: 17,
                  categoryCode: 'MS',
                  isDisplayed: true,
                  content: {
                    name: 'Swim',
                    slug: 'swim',
                    description: 'Marco! Marco!',
                  },
                  childrenCategories: [],
                },
                {
                  count: 14,
                  categoryId: 15,
                  categoryCode: 'MA',
                  isDisplayed: true,
                  content: {
                    name: 'Active',
                    slug: 'active',
                    description: 'Be like an old spice commercial',
                  },
                  childrenCategories: [
                    {
                      count: 3,
                      categoryId: 33,
                      categoryCode: 'MAF',
                      isDisplayed: true,
                      content: {
                        name: 'Footwear',
                        slug: 'footwear',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 10,
                      categoryId: 31,
                      categoryCode: 'MAT',
                      isDisplayed: true,
                      content: {
                        name: 'Shirts',
                        slug: 'tops',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 1,
                      categoryId: 30,
                      categoryCode: 'MAB',
                      isDisplayed: true,
                      content: {
                        name: 'Bottoms',
                        slug: 'bottoms',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                  ],
                },
                {
                  count: 14,
                  categoryId: 21,
                  categoryCode: 'MC',
                  isDisplayed: true,
                  content: {
                    name: 'Casual',
                    slug: 'casual',
                    description: 'Because sweating is overrated',
                  },
                  childrenCategories: [
                    {
                      count: 1,
                      categoryId: 35,
                      categoryCode: 'MCB',
                      isDisplayed: true,
                      content: {
                        name: 'Bottoms',
                        slug: 'bottoms',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 3,
                      categoryId: 32,
                      categoryCode: 'MCF',
                      isDisplayed: true,
                      content: {
                        name: 'Footwear',
                        slug: 'footwear',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 10,
                      categoryId: 34,
                      categoryCode: 'MCT',
                      isDisplayed: true,
                      content: {
                        name: 'Shirts',
                        slug: 'tops',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                  ],
                },
              ],
            },
            {
              count: 21,
              categoryId: 2,
              categoryCode: '27',
              isDisplayed: true,
              content: {
                name: 'Camping',
                slug: 'camping',
                description: '',
              },
              childrenCategories: [
                {
                  count: 3,
                  categoryId: 10,
                  categoryCode: '32',
                  isDisplayed: true,
                  content: {
                    name: 'Tents',
                    slug: 'tents',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 12,
                  categoryId: 11,
                  categoryCode: '34',
                  isDisplayed: true,
                  content: {
                    name: 'Jackets',
                    slug: 'jackets',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 3,
                  categoryId: 6,
                  categoryCode: '36',
                  isDisplayed: true,
                  content: {
                    name: 'Backpacks',
                    slug: 'backpacks',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 3,
                  categoryId: 8,
                  categoryCode: '37',
                  isDisplayed: true,
                  content: {
                    name: 'Shoes',
                    slug: 'shoes',
                    description: '',
                  },
                  childrenCategories: [],
                },
              ],
            },
            {
              count: 15,
              categoryId: 5,
              categoryCode: '40',
              isDisplayed: true,
              content: {
                name: 'Womens',
                slug: 'womens',
                description: '',
              },
              childrenCategories: [
                {
                  count: 11,
                  categoryId: 18,
                  categoryCode: '51',
                  isDisplayed: true,
                  content: {
                    name: 'Tops',
                    slug: 'tops',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 3,
                  categoryId: 20,
                  categoryCode: '50',
                  isDisplayed: true,
                  content: {
                    name: 'Footwear',
                    slug: 'footwear',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 1,
                  categoryId: 19,
                  categoryCode: '49',
                  isDisplayed: true,
                  content: {
                    name: 'Bottoms',
                    slug: 'bottoms',
                    description: '',
                  },
                  childrenCategories: [],
                },
              ],
            },
            {
              count: 3,
              categoryId: 4,
              categoryCode: '30',
              isDisplayed: true,
              content: {
                name: 'Biking',
                slug: 'biking',
                description: '',
              },
              childrenCategories: [
                {
                  count: 1,
                  categoryId: 14,
                  categoryCode: '42',
                  isDisplayed: true,
                  content: {
                    name: 'Mountain',
                    slug: 'mountain',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 1,
                  categoryId: 22,
                  categoryCode: '47',
                  isDisplayed: true,
                  content: {
                    name: 'Road',
                    slug: 'road',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 1,
                  categoryId: 16,
                  categoryCode: '48',
                  isDisplayed: true,
                  content: {
                    name: 'Hybrid',
                    slug: 'hybrid',
                    description: '',
                  },
                  childrenCategories: [],
                },
              ],
            },
            {
              count: 8,
              categoryId: 12,
              categoryCode: 'K',
              isDisplayed: null,
              content: {
                name: 'Kids',
                slug: 'kids',
                description: '',
              },
              childrenCategories: [
                {
                  count: 4,
                  categoryId: 25,
                  categoryCode: 'KA',
                  isDisplayed: true,
                  content: {
                    name: 'Active',
                    slug: 'active',
                    description: 'because your kids have way more energy than you',
                  },
                  childrenCategories: [
                    {
                      count: 0,
                      categoryId: 40,
                      categoryCode: 'KAT',
                      isDisplayed: true,
                      content: {
                        name: 'Tops',
                        slug: 'tops',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 1,
                      categoryId: 36,
                      categoryCode: 'KAB',
                      isDisplayed: true,
                      content: {
                        name: 'Bottoms',
                        slug: 'bottoms',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 3,
                      categoryId: 42,
                      categoryCode: 'KAF',
                      isDisplayed: true,
                      content: {
                        name: 'Footwear',
                        slug: 'footwear',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                  ],
                },
                {
                  count: 4,
                  categoryId: 26,
                  categoryCode: 'KC',
                  isDisplayed: true,
                  content: {
                    name: 'Casual',
                    slug: 'casual',
                    description: "because nap time is a parent's best friend",
                  },
                  childrenCategories: [
                    {
                      count: 0,
                      categoryId: 53,
                      categoryCode: 'KCT',
                      isDisplayed: true,
                      content: {
                        name: 'Tops',
                        slug: 'tops',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 1,
                      categoryId: 48,
                      categoryCode: 'KCB',
                      isDisplayed: true,
                      content: {
                        name: 'Bottoms',
                        slug: 'bottoms',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                    {
                      count: 3,
                      categoryId: 49,
                      categoryCode: 'KCF',
                      isDisplayed: true,
                      content: {
                        name: 'Footwear',
                        slug: 'footwear',
                        description: '',
                      },
                      childrenCategories: [],
                    },
                  ],
                },
                {
                  count: 0,
                  categoryId: 24,
                  categoryCode: 'KS',
                  isDisplayed: true,
                  content: {
                    name: 'Swim',
                    slug: 'swim',
                    description: "there's always that kid who loves to bellyflop",
                  },
                  childrenCategories: [],
                },
              ],
            },
            {
              count: 5,
              categoryId: 13,
              categoryCode: '45',
              isDisplayed: true,
              content: {
                name: 'Pets',
                slug: 'pets',
                description: '',
              },
              childrenCategories: [],
            },
            {
              count: 6,
              categoryId: 27,
              categoryCode: '28',
              isDisplayed: true,
              content: {
                name: 'Kayaking',
                slug: 'kayaking',
                description: '',
              },
              childrenCategories: [
                {
                  count: 3,
                  categoryId: 39,
                  categoryCode: '33',
                  isDisplayed: true,
                  content: {
                    name: 'Kayaks',
                    slug: 'kayaks',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 3,
                  categoryId: 37,
                  categoryCode: '35',
                  isDisplayed: true,
                  content: {
                    name: 'Paddles',
                    slug: 'paddles',
                    description: '',
                  },
                  childrenCategories: [],
                },
              ],
            },
            {
              count: 7,
              categoryId: 3,
              categoryCode: '29',
              isDisplayed: true,
              content: {
                name: 'Skiinggg',
                slug: 'skiing',
                description: 'skiis and stuff',
              },
              childrenCategories: [
                {
                  count: 2,
                  categoryId: 7,
                  categoryCode: '38',
                  isDisplayed: true,
                  content: {
                    name: 'Skis',
                    slug: 'skis',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 3,
                  categoryId: 9,
                  categoryCode: '39',
                  isDisplayed: true,
                  content: {
                    name: 'Accessories',
                    slug: 'accessories',
                    description: '',
                  },
                  childrenCategories: [],
                },
              ],
            },
            {
              count: 42,
              categoryId: 23,
              categoryCode: '46',
              isDisplayed: true,
              content: {
                name: 'New Products!',
                slug: 'new-products-',
                description: '',
              },
              childrenCategories: [],
            },
            {
              count: 2,
              categoryId: 51,
              categoryCode: '67',
              isDisplayed: true,
              content: {
                name: 'Clearance',
                slug: 'clearance',
                description: '',
              },
              childrenCategories: [],
            },
          ],
        },
      },
    })
  }),
}))

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => {
    return Promise.resolve({
      _nextI18Next: {
        initialI18nStore: { 'mock-locale': [{}], en: [{}] },
        initialLocale: 'mock-locale',
        userConfig: { i18n: [{}] },
      },
    })
  }),
}))

const ProductListingTemplateMock = () => <div data-testid="productListingTemplate-mock" />
jest.mock(
  '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.tsx',
  () => ProductListingTemplateMock
)

describe('[page] Category Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      query: {
        categoryCode: '40',
      },
      locale: 'mock-locale',
    }

    const response = await getServerSideProps(context)
    expect(response).toStrictEqual({
      props: {
        results: {
          totalCount: 1,
          pageSize: 20,
          pageCount: 3,
          startIndex: 0,
          items: [
            {
              productCode: 'SHOE12',
              productUsage: 'Configurable',
              isPackagedStandAlone: false,
              categories: [
                {
                  categoryCode: '37',
                  categoryId: 8,
                  isDisplayed: true,
                  parentCategory: {
                    categoryId: 2,
                    categoryCode: '27',
                    isDisplayed: true,
                    content: {
                      name: 'Camping',
                      slug: 'camping',
                    },
                  },
                  content: {
                    name: 'Shoes',
                    slug: 'shoes',
                  },
                },
              ],
              purchasableState: {
                isPurchasable: false,
              },
              price: {
                price: 85,
                salePrice: null,
              },
              priceRange: null,
              properties: [
                {
                  attributeFQN: 'tenant~product-crosssell',
                  attributeDetail: {
                    name: 'Product Cross-Sells',
                  },
                  isHidden: false,
                },
              ],
              content: {
                productFullDescription: '',
                productShortDescription:
                  'This comfort fit cycling shoe is sure to make your cycling experience a blast. Throw on a pair of these bad boys and hit the road!',
                seoFriendlyUrl: 'izumi-bike-shoes',
                productName: 'Izumi Bike Shoes',
                productImages: [
                  {
                    imageUrl: `${imageBaseURL}3e86a4ad-502e-4477-9258-a40b00be7488`,
                    imageLabel: null,
                    mediaType: null,
                  },
                ],
              },
              options: [
                {
                  attributeFQN: 'tenant~color',
                  attributeDetail: {
                    name: 'Color',
                    inputType: 'List',
                  },
                  isProductImageGroupSelector: false,
                  isRequired: true,
                  isMultiValue: false,
                  values: [
                    {
                      value: 'Orange',
                      isSelected: false,
                      deltaPrice: null,
                      stringValue: 'Orange',
                    },
                  ],
                },
              ],
            },
          ],
          facets: [
            {
              label: 'Category',
              facetType: 'Hierarchy',
              field: 'CategoryId',
              values: [
                {
                  label: 'Skiing',
                  value: '1',
                  filterValue: 'categoryId:1',
                  isDisplayed: true,
                  count: 30,
                  isApplied: null,
                  childrenFacetValues: [
                    {
                      label: 'Ski Jackets',
                      count: 15,
                      value: '16',
                      filterValue: 'categoryId:16',
                      isDisplayed: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        categoryTreeResults: {
          categories: [
            {
              count: 15,
              categoryId: 5,
              categoryCode: '40',
              isDisplayed: true,
              content: {
                name: 'Womens',
                slug: 'womens',
                description: '',
              },
              childrenCategories: [
                {
                  count: 11,
                  categoryId: 18,
                  categoryCode: '51',
                  isDisplayed: true,
                  content: {
                    name: 'Tops',
                    slug: 'tops',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 3,
                  categoryId: 20,
                  categoryCode: '50',
                  isDisplayed: true,
                  content: {
                    name: 'Footwear',
                    slug: 'footwear',
                    description: '',
                  },
                  childrenCategories: [],
                },
                {
                  count: 1,
                  categoryId: 19,
                  categoryCode: '49',
                  isDisplayed: true,
                  content: {
                    name: 'Bottoms',
                    slug: 'bottoms',
                    description: '',
                  },
                  childrenCategories: [],
                },
              ],
            },
          ],
        },
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the Category page template', () => {
    nextRouter.useRouter.mockImplementation(() => ({ query: { categoryCode: '41' } }))
    render(<CategoryPage />)

    const productListingTemplate = screen.getByTestId('productListingTemplate-mock')
    expect(productListingTemplate).toBeVisible()
  })
})
