import React, { useState } from 'react'

import {
  Box,
  CircularProgress,
  Collapse,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

import { b2bProductSearchStyle } from './B2BProductSearch.style'
import { KiboTextBox, ProductItem } from '@/components/common'
import { useDebounce, useGetSearchedProducts } from '@/hooks'
import { productGetters } from '@/lib/getters'

import { Product } from '@/lib/gql/types'

export interface B2BProductSearchProps {
  onAddProduct: (params?: Product) => void
}

const B2BProductSearch = (props: B2BProductSearchProps) => {
  const { onAddProduct } = props
  const { t } = useTranslation('common')
  const { publicRuntimeConfig } = getConfig()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data: productSearchResult, isLoading } = useGetSearchedProducts({
    search: useDebounce(searchTerm, publicRuntimeConfig.debounceTimeout),
    pageSize: publicRuntimeConfig?.b2bProductSearchPageSize,
  })

  const b2bProductSearchResult = productSearchResult?.items ?? ([] as Product[])
  const isPopperOpen: boolean = searchTerm.trim() ? true : false

  const handleSearch = (_: string, userEnteredValue: string) => setSearchTerm(userEnteredValue)
  const handleProductClick = async (event: any, value: any) => {
    if (value) {
      onAddProduct(value)
    }
    setSearchTerm('')
  }

  return (
    <Stack sx={{ position: 'relative' }}>
      <KiboTextBox
        label={t('search-for-product')}
        value={searchTerm}
        placeholder={t('search-by-name-or-code')}
        autoComplete="off"
        onChange={handleSearch}
      />
      <Collapse in={isPopperOpen} timeout="auto" unmountOnExit role="contentinfo">
        <Paper
          elevation={3}
          sx={(theme) => ({
            borderRadius: 0,
            position: 'absolute',
            top: '80%',
            zIndex: theme.zIndex.modal,
            width: '100%',
          })}
        >
          {isLoading && (
            <Box width="100%" display={'flex'} justifyContent={'center'} p={2}>
              <CircularProgress size={20} />
            </Box>
          )}
          {!isLoading && !b2bProductSearchResult.length ? (
            <Box width="100%" display={'flex'} justifyContent={'center'} pt={2}>
              <Typography>{t('no-products-found')}</Typography>
            </Box>
          ) : null}
          {!isLoading && (
            <List sx={b2bProductSearchStyle.dropDown}>
              {b2bProductSearchResult.map((option) => {
                return (
                  <ListItemButton
                    key={productGetters.getProductId(option as Product)}
                    onClick={(evt) => handleProductClick(evt, option)}
                  >
                    <ProductItem
                      image={
                        productGetters.getCoverImage(option as Product) &&
                        productGetters.handleProtocolRelativeUrl(
                          productGetters.getCoverImage(option as Product)
                        )
                      }
                      name={productGetters.getName(option as Product)}
                      productCode={productGetters.getProductId(option as Product)}
                      isQuickOrder={true}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          )}
        </Paper>
      </Collapse>
    </Stack>
  )
}

export default B2BProductSearch
