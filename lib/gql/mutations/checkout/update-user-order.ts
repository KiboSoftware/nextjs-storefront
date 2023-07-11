const updateUserOrder = `
mutation updateUserOrder($orderId: String!) {
    updateUserOrder(orderId: $orderId) {
        userId
    }
}

`

export default updateUserOrder
