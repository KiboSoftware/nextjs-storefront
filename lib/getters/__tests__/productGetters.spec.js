import { ProductCustomMock } from '../../../__mocks__/stories/ProductCustomMock'
import { productGetters } from '../productGetters'

describe('[getters] productGetters', () => {
  it('should return the product name', () => {
    expect(productGetters.getName(ProductCustomMock)).toBe('Diamondback Sortie')
  })

  it('should return the product rating', () => {
    expect(productGetters.getRating(ProductCustomMock)).toBe(3)
  })

  it('should return the product coverImage', () => {
    expect(productGetters.getCoverImage(ProductCustomMock)).toBe(
      ProductCustomMock?.content?.productImages[0].imageUrl
    )
  })

  it('should return the product id', () => {
    expect(productGetters.getProductId(ProductCustomMock)).toBe(ProductCustomMock?.productCode)
  })

  it('should return the product variation product code or code', () => {
    expect(productGetters.getVariationProductCodeOrProductCode(ProductCustomMock)).toBe(
      ProductCustomMock?.variationProductCode
    )
  })

  it('should return the product total reviews', () => {
    expect(productGetters.getProductTotalReviews(ProductCustomMock)).toBe(0)
  })

  it('should return the product price', () => {
    expect(productGetters.getPrice(ProductCustomMock)).toStrictEqual({
      regular: 2300,
      special: null,
    })
  })

  it('should return the product price range', () => {
    expect(productGetters.getPriceRange(ProductCustomMock)).toBeNull()
  })

  it('should return the product description', () => {
    expect(productGetters.getDescription(ProductCustomMock)).toStrictEqual(
      ProductCustomMock.content.productFullDescription
    )
  })

  it('should return the product short description', () => {
    expect(productGetters.getShortDescription(ProductCustomMock)).toStrictEqual(
      ProductCustomMock.content.productShortDescription
    )
  })

  it('should return the product Gallery', () => {
    expect(productGetters.getProductGallery(ProductCustomMock)).toStrictEqual(
      ProductCustomMock.content.productImages
    )
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

  it('should return the product properties', () => {
    const properties = [
      {
        name: 'Product Cross-Sells',
        value: 'BIKE1, BIKE2, BOT1',
      },
      {
        name: 'Popularity',
        value: '1',
      },
    ]

    expect(productGetters.getProperties(ProductCustomMock)).toStrictEqual(properties)
  })

  it('should return the product selected option value', () => {
    const option = {
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
          isSelected: true,
          deltaPrice: null,
          stringValue: 'Orange',
        },
        {
          value: 'Purple',
          isSelected: false,
          deltaPrice: null,
          stringValue: 'Purple',
        },
      ],
    }

    expect(productGetters.getOptionSelectedValue(option)).toStrictEqual('Orange')
  })

  it('should return the product option name', () => {
    expect(productGetters.getOptionName(ProductCustomMock.options[0])).toStrictEqual(
      ProductCustomMock.options[0].attributeDetail.name
    )
  })

  it('should return the product options', () => {
    expect(productGetters.getOptions(ProductCustomMock)).toStrictEqual(ProductCustomMock.options)
  })

  it('should return the product segregated options', () => {
    const segregatedOptions = {
      colourOptions: ProductCustomMock.options[0],
      sizeOptions: ProductCustomMock.options[1],
      selectOptions: [ProductCustomMock.options[2]],
      yesNoOptions: [ProductCustomMock.options[3]],
      textBoxOptions: [ProductCustomMock.options[4]],
    }
    expect(productGetters.getSegregatedOptions(ProductCustomMock)).toStrictEqual(segregatedOptions)
  })

  it('should return the product fulfillment method', () => {
    expect(productGetters.getSelectedFullfillmentOption(ProductCustomMock)).toBe(
      ProductCustomMock.fulfillmentMethod
    )
  })

  it('should return if the product is validated to add to cart', () => {
    expect(productGetters.validateAddToCart(ProductCustomMock)).toBeTruthy()
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
