import _ from 'underscore'

import { getOrderDetails } from './helper'

import type { Checkout } from '@/lib/gql/types'

const getParams = () => {
  return {
    USER: 'integrations_api1.mozu.com',
    PWD: 'AEACMKZ8RB4AVRJX',
    SIGNATURE: 'AFcWxV21C7fd0v3bYYYRCpSSRl31Ap69TZ0zGzOgodZ--H-KgVyikW8O',
    VERSION: '117.0',
    EMAIL: '',
    PAYMENTREQUEST_0_AMT: 0,
    PAYMENTREQUEST_0_CURRENCYCODE: '',
    PAYMENTREQUEST_0_INVNUM: '',
    PAYMENTREQUEST_0_TAXAMT: 0,
    PAYMENTREQUEST_0_HANDLINGAMT: 0,
    PAYMENTREQUEST_0_SHIPPINGAMT: 0,
    PAYMENTREQUEST_0_SHIPDISCAMT: 0,
    PAYMENTREQUEST_0_ITEMAMT: 0,
    PAYMENTREQUEST_0_SHIPTONAME: '',
    PAYMENTREQUEST_0_SHIPTOSTREET: '',
    PAYMENTREQUEST_0_SHIPTOSTREET2: '',
    PAYMENTREQUEST_0_SHIPTOCITY: '',
    PAYMENTREQUEST_0_SHIPTOSTATE: '',
    PAYMENTREQUEST_0_SHIPTOZIP: '',
    PAYMENTREQUEST_0_SHIPTOCOUNTRYCODE: '',
    PAYMENTREQUEST_0_SHIPTOPHONENUM: '',
    MAXAMT: 0,
  }
}

const prepareNumber = (num: any, doubleZero = true) => {
  let str = num.toString().replace(',', '.')

  const index = str.indexOf('.')
  if (index > -1) {
    const len = str.substring(index + 1).length
    if (len === 1) {
      str += '0'
    }

    if (len > 2) {
      str = str.substring(0, index + 3)
    }
  } else {
    if (doubleZero || true) {
      str += '.00'
    }
  }

  return str
}

let products: any[] = []
const setProducts = (newProducts: any) => {
  products = newProducts
}

const getItemsParams = () => {
  const params = {} as any
  // Add product information.
  for (let i = 0; i < products.length; i++) {
    if (products[i].name) {
      params['L_PAYMENTREQUEST_0_NAME' + i] = products[i].name
    }

    if (products[i].description) {
      params['L_PAYMENTREQUEST_0_DESC' + i] = products[i].description
    }

    if (products[i].amount) {
      params['L_PAYMENTREQUEST_0_AMT' + i] = prepareNumber(products[i].amount)
    }

    if (products[i].quantity) {
      params['L_PAYMENTREQUEST_0_QTY' + i] = products[i].quantity
    }
  }

  return params
}

const setOrderParams = (order: any) => {
  let params = getParams()

  if (order.email) {
    params.EMAIL = order.email
  }

  if (order.testAmount) params.PAYMENTREQUEST_0_AMT = order.testAmount
  else {
    params.PAYMENTREQUEST_0_AMT = prepareNumber(order.amount)
    if (order.orderNumber) params.PAYMENTREQUEST_0_INVNUM = order.orderNumber

    params.PAYMENTREQUEST_0_CURRENCYCODE = order.currencyCode
    if (order.taxAmount) params.PAYMENTREQUEST_0_TAXAMT = prepareNumber(order.taxAmount)
    if (order.handlingAmount)
      params.PAYMENTREQUEST_0_HANDLINGAMT = prepareNumber(order.handlingAmount)
    if (order.shippingAmount)
      params.PAYMENTREQUEST_0_SHIPPINGAMT = prepareNumber(order.shippingAmount)

    if (order.shippingDiscount)
      params.PAYMENTREQUEST_0_SHIPDISCAMT = prepareNumber(order.shippingDiscount)

    if (order.items) {
      const itemSum = _.reduce(
        order.items,
        // function (sum: string, item: { amount: number; quantity: number }) {
        function (sum: string, item: { amount: number; quantity: number; total: number }) {
          console.log(
            parseFloat(sum) +
              '--' +
              parseFloat(item.amount.toString()) +
              ' -- ' +
              item.quantity.toString()
          )
          return parseFloat(sum) + parseFloat((item.amount * item.quantity).toString())
        } as any,
        0
      )
      console.log('Item sum', itemSum.toFixed(2))
      params.PAYMENTREQUEST_0_ITEMAMT = prepareNumber(itemSum.toFixed(2))
      setProducts(order.items)
      params = _.extend(params, getItemsParams())
    }
  }

  if (order.maxAmount) params.MAXAMT = order.maxAmount

  if (order.shippingAddress) {
    params.PAYMENTREQUEST_0_SHIPTONAME =
      order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName
    params.PAYMENTREQUEST_0_SHIPTOSTREET = order.shippingAddress.address1
    if (order.shippingAddress.address2)
      params.PAYMENTREQUEST_0_SHIPTOSTREET2 = order.shippingAddress.address2
    params.PAYMENTREQUEST_0_SHIPTOCITY = order.shippingAddress.cityOrTown
    params.PAYMENTREQUEST_0_SHIPTOSTATE = order.shippingAddress.stateOrProvince
    params.PAYMENTREQUEST_0_SHIPTOZIP = order.shippingAddress.postalOrZipCode
    params.PAYMENTREQUEST_0_SHIPTOCOUNTRYCODE = order.shippingAddress.countryCode
    params.PAYMENTREQUEST_0_SHIPTOPHONENUM = order.shippingAddress.phone
  }

  return params
}

function parseResponse(response: any) {
  const data = {} as any
  response.split('&').forEach((item: any) => {
    const parts = item.split('=')
    data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
  })
  return data
}

const request = async (params: any) => {
  const sandbox = true
  const url = 'https://' + (sandbox ? 'api-3t.sandbox.paypal.com' : 'api-3t.paypal.com') + '/nvp'
  const encodedParams = new URLSearchParams(params).toString()

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedParams,
    })

    if (!response.ok) {
      console.log('Paypal express Error', response)
      throw { statusCode: response.status, data: response.statusText }
    }

    const body = await response.text()
    const data: any = parseResponse(body)

    if (data.ACK !== 'Success') {
      console.log('Paypal express error', data)
      throw {
        ACK: data.ACK,
        statusText: data.L_LONGMESSAGE0,
        correlationId: data.CORRELATIONID,
        method: params.METHOD,
        statusMessage: data.L_SHORTMESSAGE0,
        errorCode: data.L_ERRORCODE0,
      }
    }

    return data
  } catch (error) {
    console.error('Error occurred:', error)
    throw error
  }
}

const payOptions = {
  REQCONFIRMSHIPPING: 0,
  NOSHIPPING: 0,
  ALLOWNOTE: 0,
  TOTALTYPE: '',
}
const setPayOptions = (requireShipping: number, noShipping: number, allowNote: number) => {
  if (requireShipping !== undefined) {
    payOptions.REQCONFIRMSHIPPING = requireShipping ? 1 : 0
  }

  if (noShipping !== undefined) {
    payOptions.NOSHIPPING = noShipping ? 1 : 0
  }

  if (allowNote !== undefined) {
    payOptions.ALLOWNOTE = allowNote ? 1 : 0
  }

  payOptions.TOTALTYPE = 'EstimatedTotal'
  return payOptions
}

const setExpressCheckoutPayment = async (order: any, returnUrl: any, cancelUrl: any) => {
  let params: any = setOrderParams(order)

  params.PAYMENTREQUEST_0_PAYMENTACTION = 'Authorization'
  params.RETURNURL = returnUrl
  params.CANCELURL = cancelUrl
  params.NOSHIPPING = 1
  params.ALLOWNOTE = 1
  params.REQCONFIRMSHIPPING = 0
  params.METHOD = 'SetExpressCheckout'
  params = _.extend(params, payOptions)

  const data = await request(params)

  const sandbox = true
  const redirect =
    'https://' +
    (sandbox ? 'www.sandbox.paypal.com/cgi-bin/webscr' : 'www.paypal.com/cgi-bin/webscr')

  const response = {
    redirectUrl: redirect + '?cmd=_express-checkout&useraction=commit&token=' + data.TOKEN,
    token: data.TOKEN,
    correlationId: data.CORRELATIONID,
  }

  return response
}

const getToken = async (order: Checkout | any) => {
  const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${order.id}?step=payment&isCart=false`
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${order.id}?step=payment`

  const isMultishipEnabled = false
  const orderObj = getOrderDetails(order, true, null, isMultishipEnabled)

  setPayOptions(1, 0, 0)
  return await setExpressCheckoutPayment(orderObj, redirectUrl, cancelUrl)
}

export { getToken }
