import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchSuggestions from './SearchSuggestions'

import { SearchSuggestionResult } from '@/lib/gql/types'

const suggestionSearch: SearchSuggestionResult = {
  suggestionGroups: [
    {
      name: 'Pages',
      suggestions: [
        {
          suggestion: {
            productCode: 'MS-JKT-005',
            productImageUrls: [
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/81fbecbf-ab96-4d94-a7d5-71f24a40ac08',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/e6289d12-b588-4775-aa5e-d14d7c6de164',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/72cdaa3a-2272-4743-9b24-f5db3720d8ce',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/77492a74-37c0-4d67-8f8c-1cd62791452e',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/d1955362-a535-40b1-9902-17b352c4d165',
            ],
            productName: 'Dynamics Jacket',
            productTypeId: 5,
            content: {
              productName: 'Dynamics Jacket',
              productImages: [
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/81fbecbf-ab96-4d94-a7d5-71f24a40ac08',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/e6289d12-b588-4775-aa5e-d14d7c6de164',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/72cdaa3a-2272-4743-9b24-f5db3720d8ce',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/77492a74-37c0-4d67-8f8c-1cd62791452e',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/d1955362-a535-40b1-9902-17b352c4d165',
                },
              ],
            },
          },
        },
        {
          suggestion: {
            productCode: 'MS-JKT-013',
            productImageUrls: [
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/3c91a829-7b51-4542-81e9-2594a49380c4',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/08093d35-e328-4ff6-8e42-ac782876fa07',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/9f6c6b01-44a6-4fd4-89dc-2bbc25126e13',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/245869bb-c8e1-4e3f-b823-0fab69243218',
            ],
            productName: 'Stingray Shell Jacket',
            productTypeId: 5,
            content: {
              productName: 'Stingray Shell Jacket',
              productImages: [
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/3c91a829-7b51-4542-81e9-2594a49380c4',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/08093d35-e328-4ff6-8e42-ac782876fa07',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/9f6c6b01-44a6-4fd4-89dc-2bbc25126e13',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/245869bb-c8e1-4e3f-b823-0fab69243218',
                },
              ],
            },
          },
        },
        {
          suggestion: {
            productCode: 'MS-JKT-014',
            productImageUrls: [
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/0c8926f6-3340-4258-8891-adea03004913',
            ],
            productName: 'Uproar Insulated Jacket',
            productTypeId: 5,
            content: {
              productName: 'Uproar Insulated Jacket',
              productImages: [
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/0c8926f6-3340-4258-8891-adea03004913',
                },
              ],
            },
          },
        },
        {
          suggestion: {
            productCode: 'MS-JKT-001',
            productImageUrls: [
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/3cc200c5-da4e-4970-a489-918eac28c163',
            ],
            productName: 'Brynn Insulated Jacket',
            productTypeId: 5,
            content: {
              productName: 'Brynn Insulated Jacket',
              productImages: [
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/3cc200c5-da4e-4970-a489-918eac28c163',
                },
              ],
            },
          },
        },
        {
          suggestion: {
            productCode: 'MS-EYE-003',
            productImageUrls: [
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/bd79642e-3405-4b47-a381-246c60bcbc13',
            ],
            productName: 'Oakley Half Jacket 2.0',
            productTypeId: 12,
            content: {
              productName: 'Oakley Half Jacket 2.0',
              productImages: [
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/bd79642e-3405-4b47-a381-246c60bcbc13',
                },
              ],
            },
          },
        },
        {
          suggestion: {
            productCode: 'MS-JKT-011',
            productImageUrls: [
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/b2f1b5f6-2a32-4acf-a8b6-eb3939e69f85',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/39472852-e304-4502-affb-cee73114f986',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/b819905b-76ee-4e65-8fa2-8e64f880f4f3',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/b1ee38a4-7fde-4f48-ab7d-580d2e02b591',
            ],
            productName: 'Sidewinder SV Shell Jacket',
            productTypeId: 5,
            content: {
              productName: 'Sidewinder SV Shell Jacket',
              productImages: [
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/b2f1b5f6-2a32-4acf-a8b6-eb3939e69f85',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/39472852-e304-4502-affb-cee73114f986',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/b819905b-76ee-4e65-8fa2-8e64f880f4f3',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/b1ee38a4-7fde-4f48-ab7d-580d2e02b591',
                },
              ],
            },
          },
        },
        {
          suggestion: {
            productCode: 'MS-JKT-007',
            productImageUrls: [
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/7a5e0370-5e11-40c6-94da-2045165006c8',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/661d18e2-aa2a-4b7b-b172-8687645af9c1',
              '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/ab0a67ba-c8ae-4de6-8257-955a6a2b23cd',
            ],
            productName: 'Great Scott Shell Jacket',
            productTypeId: 5,
            content: {
              productName: 'Great Scott Shell Jacket',
              productImages: [
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/7a5e0370-5e11-40c6-94da-2045165006c8',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/661d18e2-aa2a-4b7b-b172-8687645af9c1',
                },
                {
                  imageUrl:
                    '//d1slj7rdbjyb5l.cloudfront.net/17194-21127/cms/21127/files/ab0a67ba-c8ae-4de6-8257-955a6a2b23cd',
                },
              ],
            },
          },
        },
      ],
    },
    {
      name: 'Categories',
      suggestions: [
        {
          suggestion: {
            categoryId: 0,
            categoryType: 0,
            categoryCode: '53',
            content: {
              name: 'Jackets',
            },
            isDisplayed: true,
            count: 0,
            updateDate: '0001-01-01T00:00:00.000Z',
            shouldSlice: false,
          },
        },
        {
          suggestion: {
            categoryId: 0,
            categoryType: 0,
            categoryCode: '34',
            content: {
              name: 'Ski Jackets',
            },
            isDisplayed: true,
            count: 0,
            updateDate: '0001-01-01T00:00:00.000Z',
            shouldSlice: false,
          },
        },
      ],
    },
  ],
}

// Common
export default {
  title: 'Layout/SearchSuggestions',
  component: SearchSuggestions,
} as ComponentMeta<typeof SearchSuggestions>

const Template: ComponentStory<typeof SearchSuggestions> = (args) => <SearchSuggestions {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  suggestionSearch,
  gap: 0.25,
}
