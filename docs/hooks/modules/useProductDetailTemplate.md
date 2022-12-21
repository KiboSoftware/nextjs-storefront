[next-storefront](../README.md) / useProductDetailTemplate

# Module: useProductDetailTemplate

## Table of contents

### Functions

- [useProductDetailTemplate](useProductDetailTemplate.md#useproductdetailtemplate)

## Functions

### useProductDetailTemplate

▸ **useProductDetailTemplate**(`props`): `Object`

[Custom Hook] Updates shopper entered values for product, sets selected fulfillment and product options

Description : It has 2 functions

1. updateShopperEnteredValues => It updates user entered value for the products
2. selectProductOption => It sets user selected productOption for the variant product type example:color, size

#### Parameters

| Name    | Type                            | Description                                                                                            |
| :------ | :------------------------------ | :----------------------------------------------------------------------------------------------------- |
| `props` | `UseProductDetailTemplateProps` | Expects object { product : holds product details value , purchaseLocation : purchaseLocation of user } |

#### Returns

`Object`

User selected product quantity, fulfillmentOption (location) of user, product option selected by user

| Name                           | Type                                                                                                               |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `currentProduct`               | `ProductCustom`                                                                                                    |
| `quantity`                     | `number`                                                                                                           |
| `selectProductOption`          | (`attributeFQN`: `string`, `value`: `string`, `shopperEnteredValue?`: `string` \| `boolean`) => `Promise`<`void`\> |
| `selectedFulfillmentOption`    | `SelectedFulfillmentOption`<`Location`\>                                                                           |
| `setQuantity`                  | `Dispatch`<`SetStateAction`<`number`\>\>                                                                           |
| `setSelectedFulfillmentOption` | `Dispatch`<`SetStateAction`<`SelectedFulfillmentOption`<`Location`\>\>\>                                           |
| `updatedShopperEnteredValues`  | `ProductOptionSelectionInput`[]                                                                                    |

#### Defined in

[custom/useProductDetailTemplate/useProductDetailTemplate.ts:34](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/custom/useProductDetailTemplate/useProductDetailTemplate.ts#L34)
