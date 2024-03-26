import _ from 'underscore'

import type { Checkout, CrAppliedDiscount } from '@/lib/gql/types'

const getStoreCredits = (order: Checkout | any) => {
  const filter = (payment: any) => {
    const result =
      (payment.paymentType === 'StoreCredit' || payment.paymentType === 'GiftCard') &&
      payment.status != 'Voided'

    return result
  }

  const storeCredits = _.filter(order.payments, filter)

  return _.map(storeCredits, function (credit) {
    return {
      name: credit.paymentType,
      quantity: 1,
      amount: -credit.amountRequested,
      lineId: 0,
    }
  })
}

const getActiveDiscountItems = (discounts: any) => {
  let activeDiscounts = _.filter(discounts, function (discount) {
    return discount.excluded === false
  })
  if (activeDiscounts.length === 0)
    activeDiscounts = _.filter(discounts, function (discount) {
      return discount.discount.excluded === false
    })

  return _.map(activeDiscounts, function (discount) {
    return {
      name: discount.discount.name || discount.discount.discount.name,
      quantity: 1,
      amount: -discount.impact || -discount.discount.impact,
      lineId: 0,
    }
  })
}

const getItems = (order: Checkout | any, includeStoreCredits: any) => {
  let items = _.map(order.items, function (item) {
    return {
      name: item.product.name,
      quantity: item.quantity,
      // amount: parseFloat((item.discountedTotal / item.quantity).toString()).toFixed(2),
      amount: parseFloat((item.subtotal / item.quantity).toString()).toFixed(2) as any,
      lineId: item.lineId,
      //taxAmount: item.itemTaxTotal
    }
  })

  if (order.orderDiscounts) {
    items = _.union(items, getActiveDiscountItems(order.orderDiscounts))
  }

  if (order.handlingDiscounts) {
    items = _.union(items, getActiveDiscountItems(order.handlingDiscounts))
  }

  const storeCredits = getStoreCredits(order)
  if (storeCredits.length > 0) {
    items = _.union(items, storeCredits)
  }

  return items
}

const getShippingDiscountAmount = (order: any) => {
  const items = getActiveDiscountItems(order.shippingDiscounts)
  return _.reduce(
    items,
    function (sum, item) {
      return sum + item.amount
    },
    0
  )
}

const getOrderDetails = (
  order: Checkout | any,
  includeShipping: boolean,
  paymentAction: any,
  isMultishipEnabled = false
) => {
  const orderDetails = {
    taxAmount:
      order.taxTotal ||
      ((order.itemTaxTotal + order.shippingTaxTotal + order.handlingTaxTotal + 0.00001) * 100) /
        100,
    handlingAmount: order.groupings
      ? order.handlingTotal - order.handlingTaxTotal
      : order.handlingTotal,
    shippingAmount: isMultishipEnabled
      ? order.shippingSubTotal - order.itemLevelShippingDiscountTotal
      : order.shippingSubTotal,
    shippingDiscount: isMultishipEnabled
      ? order.orderLevelShippingDiscountTotal
      : getShippingDiscountAmount(order),
    items: getItems(order, false),
    amount: 0,
    currencyCode: '',
    orderNumber: '',
    email: '',
    shippingAddress: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      cityOrTown: '',
      stateOrProvince: '',
      postalOrZipCode: '',
      countryCode: '',
      phone: '',
    },
    requiresShipping: false,
  }

  if (order.dutyTotal)
    orderDetails.handlingAmount = ((orderDetails.handlingAmount + order.dutyTotal) * 100) / 100

  if (paymentAction) {
    orderDetails.amount = paymentAction.amount
    orderDetails.currencyCode = paymentAction.currencyCode
    orderDetails.orderNumber = order.orderNumber?.toString()
  } else {
    const storeCredits = getStoreCredits(order)
    const storeCreditTotal = _.reduce(
      storeCredits,
      function (sum, item) {
        return sum + item.amount
      },
      0
    )
    orderDetails.amount = ((order.total + storeCreditTotal + 0.00001) * 100) / 100
    orderDetails.currencyCode = order.currencyCode
  }

  if (includeShipping) orderDetails.email = order.email

  const hasNonDigital = _.find(order.items, function (item) {
    return item.fulfillmentMethod !== 'Digital'
  })

  if (hasNonDigital) {
    let contact = null

    if (order.fulfillmentInfo && order.fulfillmentInfo.fulfillmentContact && includeShipping) {
      contact = order.fulfillmentInfo.fulfillmentContact
    } else if (order.destinations) {
      let itemDestinations = _.pluck(order.items, 'destinationId')
      itemDestinations = _.uniq(itemDestinations)
      if (itemDestinations.length == 1) {
        const destination = _.find(order.destinations, function (destination) {
          return destination.id == itemDestinations[0]
        })
        if (destination) contact = destination.destinationContact
      }
    }

    if (contact) {
      orderDetails.shippingAddress = {
        firstName: contact.firstName,
        lastName: contact.lastNameOrSurname,
        address1: contact.address.address1,
        address2: contact.address.address2,
        cityOrTown: contact.address.cityOrTown,
        stateOrProvince: contact.address.stateOrProvince,
        postalOrZipCode: contact.address.postalOrZipCode,
        countryCode: contact.address.countryCode,
        phone: contact.phoneNumbers ? contact.phoneNumbers.home : '',
      }
    }

    orderDetails.requiresShipping = true
  } else orderDetails.requiresShipping = false

  //check if shipping is required
  const shipItems = _.findWhere(order.items, function (item: any) {
    return item.fulfillmentMethod === 'ship'
  })
  if (!shipItems) orderDetails.requiresShipping = false

  return orderDetails
}

export { getOrderDetails }
