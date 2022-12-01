[next-storefront](../README.md) / [Exports](../modules.md) / custom_useProductDetailTemplate

# Module: custom_useProductDetailTemplate

## Table of contents

### Functions

- [useProductDetailTemplate](custom_useProductDetailTemplate.md#useproductdetailtemplate)

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

[custom/useProductDetailTemplate/useProductDetailTemplate.ts:34](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/custom/useProductDetailTemplate/useProductDetailTemplate.ts#L34)
