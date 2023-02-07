import { productGetters } from '../productGetters'
import { ProductCustomMock, ProductSubscriptionMock } from '@/__mocks__/stories/ProductCustomMock'

import type { ProductOption } from '@/lib/gql/types'

describe('[getters] productGetters', () => {
  it('should return the product name', () => {
    expect(productGetters.getName(ProductCustomMock)).toBe('Diamondback Sortie')
  })

  it('should return the product rating', () => {
    expect(productGetters.getRating(ProductCustomMock)).toBe(3)
  })

  it('should return the product coverImage', () => {
    if (ProductCustomMock?.content?.productImages) {
      expect(productGetters.getCoverImage(ProductCustomMock)).toBe(
        ProductCustomMock?.content?.productImages[0]?.imageUrl
      )
    }
  })

  it('should return the product id', () => {
    expect(productGetters.getProductId(ProductCustomMock)).toBe(ProductCustomMock?.productCode)
  })

  it('should return the product price', () => {
    expect(productGetters.getPrice(ProductCustomMock)).toStrictEqual({
      regular: 2300,
      special: null,
    })
  })

  it('should return the product subscription price', () => {
    ProductSubscriptionMock.price = {
      price: 100,
      salePrice: 50,
    }
    expect(productGetters.getPDPProductPrice(ProductSubscriptionMock?.price)).toStrictEqual({
      regular: 100,
      special: 50,
    })
  })

  it('should return the product breadcrumbs', () => {
    const breadcrumbs = [
      {
        text: 'Home',
        link: `/`,
      },
      {
        text: 'Biking',
        link: `/category/30`,
      },
      {
        text: 'Mountain',
        link: `/category/42`,
      },
    ]
    expect(productGetters.getBreadcrumbs(ProductCustomMock)).toStrictEqual(breadcrumbs)
  })

  it('should return the product selected option value', () => {
    const option = {
      attributeFQN: 'tenant~color',
      attributeDetail: {
        name: 'Color',
        inputType: 'List',
        dataTypeSequence: 0,
      },
      isProductImageGroupSelector: false,
      isRequired: true,
      isMultiValue: false,
      values: [
        {
          value: 'Orange',
          isSelected: true,
          deltaPrice: null,
          stringValue: 'Orange',
          attributeValueId: 0,
        },
        {
          value: 'Purple',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'Purple',
          attributeValueId: 1,
        },
      ],
    }

    expect(productGetters.getOptionSelectedValue(option)).toStrictEqual('Orange')
  })

  it('should return the product option name', () => {
    if (ProductCustomMock?.options?.length) {
      expect(
        productGetters.getOptionName(ProductCustomMock.options[0] as ProductOption)
      ).toStrictEqual(ProductCustomMock?.options[0]?.attributeDetail?.name)
    }
  })

  it('should return the product options', () => {
    expect(productGetters.getOptions(ProductCustomMock)).toStrictEqual(ProductCustomMock.options)
  })

  it('should return url added with protocol if not provided', () => {
    const urlWithoutProtocol =
      '//cdn-sb.mozu.com/30294-50525/cms/50525/files/d2249f22-a56f-42fe-be08-702801c97e4e'
    const urlWithProtocol =
      'https://cdn-sb.mozu.com/30294-50525/cms/50525/files/d2249f22-a56f-42fe-be08-702801c97e4e'

    expect(productGetters.handleProtocolRelativeUrl(urlWithoutProtocol)).toBe(urlWithProtocol)
  })

  it('should return fulfillment options', () => {
    expect(
      productGetters.getProductFulfillmentOptions(ProductCustomMock, { name: '' })
    ).toStrictEqual([
      {
        value: 'DirectShip',
        name: 'Direct Ship',
        code: 'DS',
        label: 'Ship to Home',
        details: 'Available to Ship',
        fulfillmentLocation: '',
        required: false,
        shortName: 'Ship',
        disabled: false,
      },
      {
        value: 'InStorePickup',
        name: 'In Store Pickup',
        code: 'SP',
        label: 'Pickup in Store',
        details: '',
        fulfillmentLocation: '',
        required: false,
        shortName: 'Pickup',
        disabled: false,
      },
    ])
  })
})
