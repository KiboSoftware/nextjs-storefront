import React from 'react'

import { StarRounded } from '@mui/icons-material'
import { Box, Grid, Rating, Button, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import FulfillmentOptions from '@/components/common/FulfillmentOptions/FulfillmentOptions'
import Price from '@/components/common/Price/Price'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'
import KiboBreadcrumbs from '@/components/core/Breadcrumbs/KiboBreadcrumbs'
import ImageGallery from '@/components/core/ImageGallery/ImageGallery'
import { AddToCartDialog } from '@/components/dialogs'
import { StoreLocatorDialog } from '@/components/dialogs'
import {
  ColorSelector,
  ProductInformation,
  ProductOptionCheckbox,
  ProductOptionSelect,
  ProductOptionTextBox,
  ProductRecommendations,
  ProductVariantSizeSelector,
} from '@/components/product'
import { useModalContext } from '@/context/ModalContext'
import { useProductDetailTemplate, usePurchaseLocation, useCartMutation } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'
import type { ProductCustom, BreadCrumb, PriceRange, LocationCustom } from '@/lib/types'

import type {
  AttributeDetail,
  ProductImage,
  ProductOption,
  ProductOptionValue,
  ProductPriceRange,
} from '@/lib/gql/types'

interface ProductDetailTemplateProps {
  product: ProductCustom
  breadcrumbs: BreadCrumb[]
}

const ProductDetailTemplate = (props: ProductDetailTemplateProps) => {
  const { product, breadcrumbs } = props
  const { t } = useTranslation(['product', 'common'])
  const { showModal, closeModal } = useModalContext()
  const { addToCart } = useCartMutation()
  const { data: purchaseLocation } = usePurchaseLocation()

  // Data hook
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
    fulfillmentMethod: selectedFulfillmentOption.method,
    purchaseLocationCode: selectedFulfillmentOption.location?.code as string,
  })
  const fulfillmentOptions = productGetters.getProductFulfillmentOptions(product, {
    name: selectedFulfillmentOption.location?.name,
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
          purchaseLocationCode: selectedFulfillmentOption.location?.code,
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
    } catch (err) {}
  }

  const handleFulfillmentOptionChange = (value: string) => {
    setSelectedFulfillmentOption({
      method: value,
      location: value === 'Pickup' ? storeLocationGetters.getLocation(purchaseLocation) : undefined,
    })
  }

  const handleProductPickupLocation = () => {
    showModal({
      Component: StoreLocatorDialog,
      props: {
        handleSetStore: async (selectedStore: LocationCustom) => {
          setSelectedFulfillmentOption({
            method: 'Pickup',
            location: selectedStore,
          })
          closeModal()
        },
      },
    })
  }

  // Cloning the price range object to trnaslate the currency values
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
              selected={selectedFulfillmentOption.method}
              onFullfillmentOptionChange={(value: string) => handleFulfillmentOptionChange(value)}
              onStoreSetOrUpdate={() => handleProductPickupLocation()} // change store: Open storelocator modal. Should not change global store.
            />
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
              <Button variant="contained" color="secondary" fullWidth>
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
          {properties?.length && (
            <Box paddingY={3}>
              <ProductInformation productFullDescription={description} options={properties} />
            </Box>
          )}
        </Grid>

        {/* This section is hardcoded for now */}
        <ProductRecommendations title={t('product-recommendations')} />
        <ProductRecommendations title={t('customers-also-bought')} />
      </Grid>
    </>
  )
}

export default ProductDetailTemplate
