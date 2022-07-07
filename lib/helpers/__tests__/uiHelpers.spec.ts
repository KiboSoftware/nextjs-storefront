import { uiHelpers } from '../uiHelpers'

describe('[helpers] UIHelpers', () => {
  const helper = uiHelpers()
  it('should run getCategoryLink function and return a categorylink', () => {
    const categoryLink = helper.getCategoryLink('CampHike')
    expect(categoryLink).toBe('/category/CampHike')
  })

  it('should run getProductLink function and return a productlink', () => {
    const categoryLink = helper.getProductLink('BTL001')
    expect(categoryLink).toBe('/product/BTL001')
  })
})
