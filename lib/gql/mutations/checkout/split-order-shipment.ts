import { shipmentItemFragment } from '../../fragments'

const splitOrderShipment = /* GraphQL */ `
  mutation splitOrderShipment(
    $orderId: String!
    $shipmentNumber: String!
    $splitShipmentsObjectInput: SplitShipmentsObjectInput
  ) {
    splitOrderShipment(
      orderId: $orderId
      shipmentNumber: $shipmentNumber
      splitShipmentsObjectInput: $splitShipmentsObjectInput
    ) {
      externalShipmentId
      number
      orderId
      orderNumber
      originalShipmentNumber
      customerAccountId
      shipmentType
      shippingMethodCode
      shippingMethodName
      fulfillmentLocationCode
      items {
        ...shipmentItemFragment
      }
    }
  }
  ${shipmentItemFragment}
`

export default splitOrderShipment
