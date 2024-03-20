import type { SearchSuggestionResult } from '@/lib/gql/types'

export const searchSuggestion2ResultMock: SearchSuggestionResult = {
  suggestionGroups: [
    {
      name: 'Products',
      suggestions: [
        {
          suggestionType: 'Product',
          suggestion: {
            productCode: 'Carhartt-001',
            productImageUrls: [
              '//cdn-sb.sandbox.kibong-qa.com/10777-16188/cms/16188/files/e45eb5f6-c372-4e30-b502-2a0c2c01d42c',
              '//cdn-sb.sandbox.kibong-qa.com/10777-16188/cms/16188/files/1de17659-b31a-4507-999a-51795aad54ed',
              '//cdn-sb.sandbox.kibong-qa.com/10777-16188/cms/16188/files/fc433aae-ec54-4675-ab89-9a7c690368d7',
              '//cdn-sb.sandbox.kibong-qa.com/10777-16188/cms/16188/files/5a9d3103-e1db-4bda-a54d-3a8577cd72d8',
            ],
            productName: 'Carhartt Jacket',
            productTypeId: 10,
          },
        },
      ],
    },
    {
      name: 'Categories',
      suggestions: [
        {
          suggestionType: 'Category',
          suggestion: {
            categoryCategoryCode: '9',
            categoryName: 'Jackets',
            categorySeoSlug: 'jackets',
          },
        },
        {
          suggestionType: 'Category',
          suggestion: {
            categoryCategoryCode: '2494-1',
            categoryName: 'Carhartt Jackets',
            categorySeoSlug: 'carhartt-jackets',
          },
        },
      ],
    },
  ],
}

export const searchSuggestion2Mock: { suggestionSearch2: SearchSuggestionResult } = {
  suggestionSearch2: searchSuggestion2ResultMock,
}
