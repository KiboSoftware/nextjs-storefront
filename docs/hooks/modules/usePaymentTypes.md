[next-storefront](../README.md) / usePaymentTypes

# Module: usePaymentTypes

## Table of contents

### Functions

- [usePaymentTypes](usePaymentTypes.md#usepaymenttypes)

## Functions

### usePaymentTypes

▸ **usePaymentTypes**(): `Object`

[Custom Hook] Loads the payment method types

Return function and value:

1. loadPaymentTypes() => Returns the paymentTypes available
2. error => default value returned as null
3. loading => It returns true if request is in process and once completed it return false

#### Returns

`Object`

| Name               | Type        |
| :----------------- | :---------- |
| `error`            | `null`      |
| `loadPaymentTypes` | () => `any` |
| `loading`          | `boolean`   |

#### Defined in

[custom/usePaymentTypes/usePaymentTypes.ts:15](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/custom/usePaymentTypes/usePaymentTypes.ts#L15)
