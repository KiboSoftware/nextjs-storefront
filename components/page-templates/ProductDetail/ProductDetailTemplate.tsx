import React from 'react'

import { StarRounded } from '@mui/icons-material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Box, Grid, Rating, Button, Typography, Divider, Link as MuiLink } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { FulfillmentOptions, Price, QuantitySelector } from '@/components/common'
import { KiboBreadcrumbs, ImageGallery } from '@/components/core'
import { AddToCartDialog, StoreLocatorDialog } from '@/components/dialogs'
import { CmsComponent } from '@/components/home'
import {
  ColorSelector,
  ProductInformation,
  ProductOptionCheckbox,
  ProductOptionSelect,
  ProductOptionTextBox,
  ProductQuickViewDialog,
  ProductVariantSizeSelector,
} from '@/components/product'
import { useModalContext } from '@/context/ModalContext'
import {
  useProductDetailTemplate,
  usePurchaseLocationQueries,
  useAddToCartMutation,
  useWishlist,
  useProductLocationInventoryQueries,
} from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
import { productGetters, wishlistGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
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
  breadcrumbs?: BreadCrumb[]
  cmsProducts?: any
  isQuickViewModal?: boolean
}

const styles = {
  moreDetails: {
    typography: 'body2',
    textDecoration: 'underline',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'right',
    padding: '0.5rem 0',
    cursor: 'pointer',
    paddingLeft: '30rem',
  },
}
const ProductDetailTemplate = (props: ProductDetailTemplateProps) => {
  const { getProductLink } = uiHelpers()
  const { product, breadcrumbs = [], isQuickViewModal = false, cmsProducts } = props
  const { t } = useTranslation('common')
  const { showModal, closeModal } = useModalContext()
  const { addToCart } = useAddToCartMutation()
  const { data: purchaseLocation } = usePurchaseLocationQueries()

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
  const { data: locationInventory } = useProductLocationInventoryQueries(
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
  } = productGetters.getProductDetails({
    ...currentProduct,
    fulfillmentMethod: selectedFulfillmentOption?.method,
    purchaseLocationCode: selectedFulfillmentOption?.location?.code as string,
  })
  const quantityLeft = productGetters.getAvailableItemCount(
    currentProduct,
    locationInventory,
    selectedFulfillmentOption?.method
  )
  const fulfillmentOptions = productGetters.getProductFulfillmentOptions(
    product,
    {
      name: selectedFulfillmentOption?.location?.name,
    },
    locationInventory
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
        isNested: isQuickViewModal,
        NestedDialog: isQuickViewModal ? ProductQuickViewDialog : null,
        nestedDialogProps: { product: currentProduct, isQuickViewModal: true },
        onNestedDialogClose: () => {
          showModal({
            Component: ProductQuickViewDialog,
            props: {
              product: currentProduct,
              isQuickViewModal: true,
            },
          })
        },
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
          ? t<string>('currency', { val: priceRange?.lower?.price })
          : null,
        salePrice: priceRange?.lower?.salePrice
          ? t<string>('currency', { val: priceRange?.lower?.salePrice })
          : null,
      },
      upper: {
        price: priceRange?.upper?.price
          ? t<string>('currency', { val: priceRange?.upper?.price })
          : null,
        salePrice: priceRange?.upper?.salePrice
          ? t<string>('currency', { val: priceRange?.upper?.salePrice })
          : null,
      },
    }
  }

  const handleWishList = async () => {
    try {
      if (!wishlistGetters.isAvailableToAddToWishlist(currentProduct)) return

      await addOrRemoveWishlistItem({ product: currentProduct })
    } catch (error) {
      console.log('Error: add or remove wishlist item from PDP', error)
    }
  }

  return (
    <Grid container>
      {!isQuickViewModal && (
        <Grid item xs={12} alignItems="center" sx={{ paddingBlock: 4 }}>
          <KiboBreadcrumbs breadcrumbs={breadcrumbs} />
        </Grid>
      )}
      <Grid item xs={12} md={6} sx={{ pb: { xs: 3, md: 0 } }}>
        <ImageGallery images={productGallery as ProductImage[]} title={''} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '100%', pl: { xs: 0, md: 5 } }}>
        <Typography variant="h1" gutterBottom>
          {productName}
        </Typography>
        <Price
          price={t<string>('currency', { val: productPrice.regular })}
          {...(productPrice.special && {
            salePrice: t<string>('currency', { val: productPrice.special }),
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
          {isQuickViewModal && (
            <Link href={getProductLink(product?.productCode as string)} passHref>
              <MuiLink
                aria-label={t('more-details')}
                sx={{ ...styles.moreDetails }}
                onClick={() => closeModal()}
              >
                {t('more-details')}
              </MuiLink>
            </Link>
          )}
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
            {selectedFulfillmentOption?.method && `${quantityLeft} ${t('item-left')}`}
          </Typography>
          <MuiLink
            color="inherit"
            variant="body2"
            sx={{ cursor: 'pointer' }}
            onClick={() => handleProductPickupLocation(t('check-nearby-store'))}
          >
            {t('nearby-stores')}
          </MuiLink>
        </Box>
        <Box paddingY={1} display="flex" flexDirection={'column'} gap={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleAddToCart()}
            {...(!(isValidForAddToCart && quantityLeft > 0) && { disabled: true })}
          >
            {t('add-to-cart')}
          </Button>
          <Box display="flex" gap={3}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleWishList}
              sx={{ padding: '0.375rem 0.5rem' }}
              {...(!wishlistGetters.isAvailableToAddToWishlist(currentProduct) && {
                disabled: true,
              })}
            >
              {isProductInWishlist ? (
                <FavoriteRoundedIcon sx={{ color: 'red.900', marginRight: '14px' }} />
              ) : (
                <FavoriteBorderRoundedIcon sx={{ color: 'grey.600', marginRight: '14px' }} />
              )}
              {t('add-to-wishlist')}
            </Button>
            <Button variant="contained" color="inherit" fullWidth>
              {t('one-click-checkout')}
            </Button>
          </Box>
        </Box>
      </Grid>
      {!isQuickViewModal && (
        <>
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
        </>
      )}
    </Grid>
  )
}

export default ProductDetailTemplate
