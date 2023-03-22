[next-storefront](../README.md) / useConfigureProduct

# Module: useConfigureProduct

## Table of contents

### Functions

- [useConfigureProduct](useConfigureProduct.md#useconfigureproduct)

## Functions

### useConfigureProduct

▸ **useConfigureProduct**(): `Object`

[Mutation hook] useConfigureProduct uses the graphQL mutation

</b>configureProduct(productCode: String!, includeOptionDetails: Boolean, skipInventoryCheck: Boolean, quantity: Int, purchaseLocation: String, variationProductCodeFilter: String, productOptionSelectionsInput: ProductOptionSelectionsInput): ConfiguredProduct</b>

Description : Update the product configurations

Parameters passed to internal function configureProduct(params: ConfigureProductDetails) => expects object containing productCode and updatedOptions.

#### Returns

`Object`

'response?.configureProduct', which has product details like productCode, purchaseLocation, options, productImages etc.

| Name | Type |
| :------ | :------ |
| `configureProduct` | `UseMutationResult`<`any`, `unknown`, `ConfigureProductDetails`, `unknown`\> |

#### Defined in

[mutations/product/configure/useConfigureProduct.ts:51](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/product/configure/useConfigureProduct.ts#L51)
