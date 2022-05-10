import { ProductDataMock } from '../../../__mocks__/stories/ProductDataMock'
import { productGetters } from '../productGetters'

describe('[getters] productGetters', () => {
  it('should return the product name', () => {
    expect(productGetters.getName(ProductDataMock)).toBe('Diamondback Sortie')
  })

  it('should return the product rating', () => {
    expect(productGetters.getRating(ProductDataMock)).toBe(3)
  })

  it('should return the product total reviews', () => {
    expect(productGetters.getProductTotalReviews(ProductDataMock)).toBe(0)
  })

  it('should return the product price', () => {
    expect(productGetters.getPrice(ProductDataMock)).toStrictEqual({
      regular: 2300,
      special: null,
    })
  })

  it('should return the product price range', () => {
    expect(productGetters.getPriceRange(ProductDataMock)).toBeNull()
  })

  it('should return the product description', () => {
    expect(productGetters.getDescription(ProductDataMock)).toStrictEqual(
      ProductDataMock.content.productFullDescription
    )
  })

  it('should return the product short description', () => {
    expect(productGetters.getShortDescription(ProductDataMock)).toStrictEqual(
      ProductDataMock.content.productShortDescription
    )
  })

  it('should return the product Gallery', () => {
    expect(productGetters.getProductGallery(ProductDataMock)).toStrictEqual(
      ProductDataMock.content.productImages
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
        link: `/c/30`,
      },
      {
        text: 'Mountain',
        link: `/c/42`,
      },
    ]
    expect(productGetters.getBreadcrumbs(ProductDataMock)).toStrictEqual(breadcrumbs)
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

    expect(productGetters.getProperties(ProductDataMock)).toStrictEqual(properties)
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
    expect(productGetters.getOptionName(ProductDataMock.options[0])).toStrictEqual(
      ProductDataMock.options[0].attributeDetail.name
    )
  })

  it('should return the product options', () => {
    expect(productGetters.getOptions(ProductDataMock)).toStrictEqual(ProductDataMock.options)
  })

  it('should return the product segregated options', () => {
    const segregatedOptions = {
      colourOptions: ProductDataMock.options[0],
      sizeOptions: ProductDataMock.options[1],
      selectOptions: [ProductDataMock.options[2]],
      yesNoOptions: [ProductDataMock.options[3]],
      textBoxOptions: [ProductDataMock.options[4]],
    }
    expect(productGetters.getSegregatedOptions(ProductDataMock)).toStrictEqual(segregatedOptions)
  })

  it('should return the product fulfillment method', () => {
    expect(productGetters.getSelectedFullfillmentOption(ProductDataMock)).toBe(
      ProductDataMock.fulfillmentMethod
    )
  })

  it('should return if the product is validated to add to cart', () => {
    expect(productGetters.validateAddToCart(ProductDataMock)).toBeFalsy()
  })

  it('should return url added with protocol if not provided', () => {
    const urlWithoutProtocol =
      '//cdn-sb.mozu.com/30294-50525/cms/50525/files/d2249f22-a56f-42fe-be08-702801c97e4e'
    const urlWithProtocol =
      'https://cdn-sb.mozu.com/30294-50525/cms/50525/files/d2249f22-a56f-42fe-be08-702801c97e4e'

    expect(productGetters.handleProtocolRelativeUrl(urlWithoutProtocol)).toBe(urlWithProtocol)
  })
})
