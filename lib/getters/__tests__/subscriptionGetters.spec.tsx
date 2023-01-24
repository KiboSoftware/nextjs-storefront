import { subscriptionGetters } from '../subscriptionGetters'
import { subscriptionCollectionMock, ProductCustomMock } from '@/__mocks__/stories'

const subscriptionItems = subscriptionCollectionMock.subscriptions.items || []
const items = subscriptionItems[0]?.items || []
const properties = items[0]?.product?.properties || []

describe('[getters] subscriptionGetters', () => {
  it('should return frequency values', () => {
    expect(subscriptionGetters.getFrequencyValues(ProductCustomMock)).toEqual(
      properties[1]?.values || []
    )
  })

  it('should return true if subscription mode available', () => {
    expect(subscriptionGetters.isSubscriptionModeAvailable(ProductCustomMock)).toEqual(true)
  })

  it('should return subscription frequency unit and value', () => {
    expect(subscriptionGetters.getFrequencyUnitAndValue('45 Days')).toEqual({
      value: 45,
      unit: 'Day',
    })
  })
})
