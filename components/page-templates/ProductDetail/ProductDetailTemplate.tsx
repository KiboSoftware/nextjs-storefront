import React from 'react'

import { StarRounded } from '@mui/icons-material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Box, Grid, Rating, Button, Typography, Divider, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import FulfillmentOptions from '@/components/common/FulfillmentOptions/FulfillmentOptions'
import Price from '@/components/common/Price/Price'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'
import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import ImageGallery from '@/components/core/ImageGallery/ImageGallery'
import { AddToCartDialog, StoreLocatorDialog } from '@/components/dialogs'
import CmsComponent from '@/components/home/CmsComponent/CmsComponent'
import {
  ColorSelector,
  ProductInformation,
  ProductOptionCheckbox,
  ProductOptionSelect,
  ProductOptionTextBox,
  ProductVariantSizeSelector,
} from '@/components/product'
import { useModalContext } from '@/context/ModalContext'
import {
  useProductDetailTemplate,
  usePurchaseLocation,
  useCartMutationAddToCart,
  useWishlist,
  useProductLocationInventory,
} from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
import { productGetters } from '@/lib/getters'
import type { ProductCustom, BreadCrumb, PriceRange, LocationCustom } from '@/lib/types'

import type {
  AttributeDetail,
  ProductImage,
  ProductOption,
  ProductOptionValue,
  ProductPriceRange,
  CrProduct,
} from '@/lib/gql/types'

interface ProductDetailTemplateProps {
  product: ProductCustom
  breadcrumbs: BreadCrumb[]
  cmsProducts: any
}

const ProductDetailTemplate = (props: ProductDetailTemplateProps) => {
  const { product, breadcrumbs, cmsProducts } = props
  const { t } = useTranslation(['product', 'common'])
  const { showModal, closeModal } = useModalContext()
  const { addToCart } = useCartMutationAddToCart()
  const { data: purchaseLocation } = usePurchaseLocation()

  const { addOrRemoveWishlistItem, checkProductInWishlist } = useWishlist()
  const {
    currentProduct,
    quantity,
    updatedShopperEnteredValues,
    selectedFulfillmentOption,
    setQuantity,
    selectProductOption,
    setSelectedFulfillmentOption,
  } = useProductDetailTemplate({
    product,
    purchaseLocation,
  })
  const { data: locationInventory } = useProductLocationInventory(
    product?.productCode as string,
    selectedFulfillmentOption?.location?.code as string
  )

  // Getters
  const {
    productName,
    productCode,
    variationProductCode,
    fulfillmentMethod,
    productPrice,
    productPriceRange,
    productRating,
    description,
    shortDescription,
    productGallery,
    productOptions,
    optionsVisibility,
    properties,
    isValidForAddToCart,
    isPackagedStandAlone,
  } = productGetters.getProductDetails({
    ...currentProduct,
    fulfillmentMethod: selectedFulfillmentOption?.method,
    purchaseLocationCode: selectedFulfillmentOption?.location?.code as string,
  })
  const fulfillmentOptions = productGetters.getProductFulfillmentOptions(product, {
    name: selectedFulfillmentOption?.location?.name,
  })
  const quantityLeft = productGetters.getAvailableItemCount(
    product,
    locationInventory,
    selectedFulfillmentOption?.method
  )

  const isProductInWishlist = checkProductInWishlist({
    productCode,
    variationProductCode,
  })

  // methods
  const handleAddToCart = async () => {
    try {
      const cartResponse = await addToCart.mutateAsync({
        product: {
          productCode,
          variationProductCode,
          fulfillmentMethod,
          options: updatedShopperEnteredValues,
          purchaseLocationCode: selectedFulfillmentOption?.location?.code as string,
        },
        quantity,
      })

      if (cartResponse.id) {
        showModal({
          Component: AddToCartDialog,
          props: {
            cartItem: cartResponse,
          },
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFulfillmentOptionChange = (value: string) => {
    if (
      value === FulfillmentOptionsConstant.SHIP ||
      selectedFulfillmentOption?.location?.name ||
      purchaseLocation.code
    ) {
      setSelectedFulfillmentOption({
        ...selectedFulfillmentOption,
        method: value,
      })
    } else {
      handleProductPickupLocation()
    }
  }

  const handleProductPickupLocation = (title?: string) => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        title: title,
        showProductAndInventory: true,
        product: product as CrProduct,
        quantity: quantity,
        handleSetStore: async (selectedStore: LocationCustom) => {
          setSelectedFulfillmentOption({
            method: FulfillmentOptionsConstant.PICKUP,
            location: selectedStore,
          })
          closeModal()
        },
      },
    })
  }

  // Cloning the price range object to translate the currency values
  const handlePriceRangeTranslation = (priceRange: ProductPriceRange): PriceRange => {
    return {
      lower: {
        price: priceRange?.lower?.price
          ? t<string>('common:currency', { val: priceRange?.lower?.price })
          : null,
        salePrice: priceRange?.lower?.salePrice
          ? t<string>('common:currency', { val: priceRange?.lower?.salePrice })
          : null,
      },
      upper: {
        price: priceRange?.upper?.price
          ? t<string>('common:currency', { val: priceRange?.upper?.price })
          : null,
        salePrice: priceRange?.upper?.salePrice
          ? t<string>('common:currency', { val: priceRange?.upper?.salePrice })
          : null,
      },
    }
  }

  const handleWishList = async () => {
    try {
      const addOrRemoveWishlistItemParams = {
        productCode,
        variationProductCode,
        isPackagedStandAlone,
        options: updatedShopperEnteredValues,
      }
      await addOrRemoveWishlistItem(addOrRemoveWishlistItemParams)
    } catch (error) {
      console.log('Error: add or remove wishlist item from PDP', error)
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} alignItems="center" sx={{ paddingBlock: 4 }}>
          <KiboBreadcrumbs breadcrumbs={breadcrumbs} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ pb: { xs: 3, md: 0 } }}>
          <ImageGallery images={productGallery as ProductImage[]} title={''} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ width: '100%', pl: { xs: 0, md: 5 } }}>
          <Typography variant="h1" gutterBottom>
            {productName}
          </Typography>
          <Price
            price={t<string>('common:currency', { val: productPrice.regular })}
            {...(productPrice.special && {
              salePrice: t<string>('common:currency', { val: productPrice.special }),
            })}
            priceRange={productPriceRange && handlePriceRangeTranslation(productPriceRange)}
          />

          <Box paddingY={1} display={shortDescription ? 'block' : 'none'}>
            <Box
              data-testid="short-description"
              dangerouslySetInnerHTML={{
                __html: shortDescription,
              }}
            />
          </Box>

          <Box data-testid="product-rating">
            <Rating
              name="read-only"
              value={productRating}
              precision={0.5}
              readOnly
              size="small"
              icon={<StarRounded color="primary" />}
              emptyIcon={<StarRounded />}
            />
          </Box>

          <Box paddingX={1} paddingY={3} display={optionsVisibility.color ? 'block' : 'none'}>
            <ColorSelector
              attributeFQN={productOptions?.colourOptions?.attributeFQN as string}
              values={productOptions?.colourOptions?.values as ProductOptionValue[]}
              onColorChange={selectProductOption}
            />
          </Box>

          <Box paddingY={1} display={optionsVisibility.size ? 'block' : 'none'}>
            <ProductVariantSizeSelector
              values={productOptions?.sizeOptions?.values as ProductOptionValue[]}
              attributeFQN={productOptions?.sizeOptions?.attributeFQN as string}
              onSizeChange={selectProductOption}
            />
          </Box>

          <Box paddingY={1} display={optionsVisibility.select ? 'block' : 'none'}>
            {productOptions?.selectOptions?.map((option) => {
              return (
                <ProductOptionSelect
                  key={option?.attributeDetail?.name}
                  name={option?.attributeDetail?.name}
                  optionValues={option?.values as ProductOptionValue[]}
                  value={productGetters.getOptionSelectedValue(option as ProductOption)}
                  label={productGetters.getOptionName(option as ProductOption)}
                  attributeFQN={option?.attributeFQN as string}
                  onDropdownChange={selectProductOption}
                />
              )
            })}
          </Box>

          <Box paddingY={1} display={optionsVisibility.checkbox ? 'block' : 'none'}>
            {productOptions?.yesNoOptions.map((option: ProductOption | null) => {
              const attributeDetail = option?.attributeDetail as AttributeDetail
              return (
                <ProductOptionCheckbox
                  key={attributeDetail.name}
                  label={attributeDetail.name as string}
                  attributeFQN={option?.attributeFQN as string}
                  checked={
                    productGetters.getOptionSelectedValue(option as ProductOption) ? true : false
                  }
                  onCheckboxChange={selectProductOption}
                />
              )
            })}
          </Box>

          <Box paddingY={1} display={optionsVisibility.textbox ? 'block' : 'none'}>
            {productOptions?.textBoxOptions.map((option) => {
              return (
                <ProductOptionTextBox
                  key={option?.attributeDetail?.name}
                  option={option as ProductOption}
                  onBlur={selectProductOption}
                />
              )
            })}
          </Box>

          <Box paddingY={1}>
            <QuantitySelector
              label="Qty"
              quantity={quantity}
              onIncrease={() => setQuantity((prevQuantity: number) => Number(prevQuantity) + 1)}
              onDecrease={() => setQuantity((prevQuantity: number) => Number(prevQuantity) - 1)}
            />
          </Box>

          <Box paddingY={1}>
            <FulfillmentOptions
              fulfillmentOptions={fulfillmentOptions}
              selected={selectedFulfillmentOption?.method}
              onFulfillmentOptionChange={(value: string) => handleFulfillmentOptionChange(value)}
              onStoreSetOrUpdate={() => handleProductPickupLocation()}
            />
          </Box>

          <Box pt={2} display="flex" sx={{ justifyContent: 'space-between' }}>
            <Typography fontWeight="600" variant="body2">
              {selectedFulfillmentOption?.method === FulfillmentOptionsConstant.PICKUP &&
                `${quantityLeft} ${t('item-left')}`}
            </Typography>
            <Link
              color="inherit"
              variant="body2"
              sx={{ cursor: 'pointer' }}
              onClick={() => handleProductPickupLocation(t('common:check-nearby-store'))}
            >
              {t('nearby-stores')}
            </Link>
          </Box>
          <Box paddingY={1} display="flex" flexDirection={'column'} gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleAddToCart()}
              {...(!isValidForAddToCart && { disabled: true })}
            >
              {t('common:add-to-cart')}
            </Button>
            <Box display="flex" gap={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleWishList}
                sx={{ padding: '0.375rem 0.5rem' }}
              >
                {isProductInWishlist ? (
                  <FavoriteRoundedIcon sx={{ color: 'red.900', marginRight: '14px' }} />
                ) : (
                  <FavoriteBorderRoundedIcon sx={{ color: 'grey.600', marginRight: '14px' }} />
                )}

                {t('common:add-to-wishlist')}
              </Button>
              <Button variant="contained" color="inherit" fullWidth>
                {t('common:one-click-checkout')}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} paddingY={3}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {properties?.length > 0 && (
            <Box paddingY={3}>
              <ProductInformation productFullDescription={description} options={properties} />
            </Box>
          )}
        </Grid>

        {cmsProducts?.components?.length > 0 &&
          cmsProducts?.components?.map((data: any) => (
            <CmsComponent key={Object.keys(data)[0]} content={data} />
          ))}
      </Grid>
    </>
  )
}

export default ProductDetailTemplate
