import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import AppsIcon from '@mui/icons-material/Apps'
import ListIcon from '@mui/icons-material/List'
import { Grid, MenuItem, Typography, Box, Button, SxProps, Skeleton } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import CategoryFacet from '@/components/category/CategoryFacet/CategoryFacet'
import CategoryFilterBy from '@/components/category/CategoryFilterBy/CategoryFilterBy'
import CategoryFilterByMobile from '@/components/category/CategoryFilterByMobile/CategoryFilterByMobile'
import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import KiboBreadcrumbs, { Breadcrumb } from '@/components/core/Breadcrumbs/Breadcrumbs'
import ProductCard, { ProductCardProps } from '@/components/product/ProductCard/ProductCard'

import type { Facet as FacetType } from '@/lib/gql/types'

interface SortingValues {
  value: string
  id: string
  selected: boolean
}
interface CategoryFacetChildren {
  label: string
  count: number
  value: string
  filterValue: string
  isDisplayed: boolean
}

interface CategoryFacetData {
  header: string
  childrenCategories: CategoryFacetChildren[]
}
interface CategoryProps {
  breadCrumbsList: Breadcrumb[]
  facetList: FacetType[]
  products: ProductCardProps[]
  sortingValues: SortingValues[]
  categoryFacet: CategoryFacetData
  totalResults: string
  initialProductsToShow: number
  isLoading: boolean
  onChange: (value: string) => void
  onCategoryChildrenSelection: (categoryCode: string) => void
  onBackButtonClick: () => void
}

const styles = {
  breadcrumbsClass: {
    margin: '1.5rem 0',
    padding: {
      md: '0 1.5625rem',
      xs: '0 1rem',
    },
  },
  navBar: {
    borderTop: '1px solid #c7c7c7',
    borderBottom: '1px solid #c7c7c7',
    display: 'flex',
    flexWwrap: 'wrap',
    postion: 'relative',
  },
  navBarMain: {
    display: 'flex',
    flex: 1,
    flexDirection: {
      md: 'row',
      xs: 'column',
    },
    alignItems: {
      md: 'center',
      xs: 'flex-start',
    },
    padding: {
      md: '0.5rem 1.5625rem',
      xs: '2% 1rem',
    },
  },
  navBarSort: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 0 0 auto',
    alignItems: 'center',
    width: { md: 'auto', xs: '100%' },
    padding: '0.5rem 0',
  } as SxProps<Theme> | undefined,
  navBarLabel: {
    whiteSpace: 'noWrap',
    marginRight: '1.5rem',
    typography: 'body1',
    color: 'grey.900',
    display: { md: 'block', xs: 'none' },
  } as SxProps<Theme> | undefined,
  navBarView: {
    margin: '0 0 0 5rem',
    order: 0,
    alignItems: 'center',
    display: {
      md: 'flex',
      xs: 'none',
    },
  },
  mainSection: {
    display: 'flex',
  },
  sideBar: {
    display: {
      md: 'block',
      xs: 'none',
    },
    borderRight: '1px solid #c7c7c7',
    padding: '0 1.5625rem',
    minWidth: {
      md: '13%',
      xs: 'auto',
    },
  },
  productGrid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterByButton: {
    textTransform: 'capitalize',
    border: '1px solid #2b2b2b',
    color: '#2b2b2b',
    justifyContent: 'space-between',
    width: '100%',
    height: '2.188rem',
  },
  navBarMainMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 1rem 1rem',
  },
  showMoreButton: {
    width: { md: '23.5rem', xs: '12.5rem' },
  },
  productResults: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0',
  },
}

// Component
const ProductListingTemplate = (props: CategoryProps) => {
  const {
    breadCrumbsList,
    facetList,
    products,
    sortingValues,
    categoryFacet,
    totalResults,
    isLoading,
    onChange,
    onBackButtonClick,
    onCategoryChildrenSelection,
    initialProductsToShow = 16,
  } = props
  const isShowMoreVisible = products.length > initialProductsToShow
  const [isFilterBy, setFilterBy] = useState<boolean>(false)
  const [isShowMoreButtonVisible, setShowMoreButtonVisible] = useState<boolean>(isShowMoreVisible)
  const [productToShow, setProductsToShow] = useState<ProductCardProps[]>([]) // Setting the initial product count to 16 for skeleton loading

  const { t } = useTranslation('common')

  const handleFilterBy = () => {
    setFilterBy(!isFilterBy)
  }
  const showMoreProducts = () => {
    setShowMoreButtonVisible(!isShowMoreButtonVisible)
  }

  useEffect(() => {
    const noOfItemsToShow = isShowMoreButtonVisible ? initialProductsToShow : products.length
    if (products.length) {
      const sliced = products.slice(0, noOfItemsToShow)
      setProductsToShow([...sliced])
    }
  }, [isShowMoreButtonVisible])

  return (
    <>
      <Box sx={{ ...styles.breadcrumbsClass }}>
        <KiboBreadcrumbs breadcrumbs={breadCrumbsList} />
      </Box>
      {!isFilterBy && (
        <Box sx={{ ...styles.navBar }}>
          <Box sx={{ ...styles.navBarMain }}>
            {!isLoading && (
              <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'grey.900' }}>
                {categoryFacet.header}
              </Typography>
            )}
            {isLoading && (
              <Skeleton
                variant="rectangular"
                sx={{
                  height: { md: '1.75rem', xs: '1.5rem' },
                  width: { md: '15.625rem', xs: '10.75rem' },
                }}
              />
            )}
            {!isFilterBy && (
              <Box sx={{ ...styles.navBarSort }}>
                {!isLoading && <Box sx={{ ...styles.navBarLabel }}>{t('sort-by')}</Box>}
                {isLoading && (
                  <Skeleton
                    variant="rectangular"
                    height={18}
                    width={54}
                    sx={{ ...styles.navBarLabel }}
                  />
                )}
                <Box
                  sx={{
                    minWidth: { md: '11.875rem', xs: '9.313rem' },
                    marginTop: { xs: '0.5rem', md: '0' },
                  }}
                >
                  {!isLoading && (
                    <KiboSelect placeholder={t('best-match')} onChange={onChange}>
                      {sortingValues.map((sortingVal) => (
                        <MenuItem key={sortingVal?.id} value={sortingVal?.value}>
                          {sortingVal?.value}
                        </MenuItem>
                      ))}
                    </KiboSelect>
                  )}
                  {isLoading && <Skeleton variant="rectangular" height={36} />}
                </Box>
                <Box
                  sx={{
                    minWidth: { md: '11.875rem', xs: '9.313rem' },
                    display: { md: 'none' },
                    marginTop: { xs: '0.5rem', md: '0' },
                  }}
                >
                  {!isLoading && (
                    <Button
                      variant="outlined"
                      endIcon={<AddIcon fontSize="small" />}
                      sx={{ ...styles.filterByButton }}
                      onClick={handleFilterBy}
                    >
                      {t('filter-by')}
                    </Button>
                  )}
                  {isLoading && <Skeleton variant="rectangular" height={36} />}
                </Box>
              </Box>
            )}
            {!isLoading && (
              <Box sx={{ ...styles.navBarView }}>
                <Box
                  component="span"
                  sx={{ marginRight: '1rem', typography: 'body1', color: 'grey.900' }}
                >
                  {t('view')}
                </Box>
                <AppsIcon sx={{ fontSize: '2rem', marginRight: '1rem' }} />
                <ListIcon sx={{ fontSize: '2.4rem' }} />
              </Box>
            )}
            {isLoading && (
              <Box sx={{ ...styles.navBarView }}>
                <Skeleton sx={{ marginRight: '1rem' }} height={19} width={34} />
                <Skeleton sx={{ marginRight: '1rem' }} height={40} width={32} />
                <Skeleton height={40} width={32} />
              </Box>
            )}
          </Box>
        </Box>
      )}
      {isFilterBy && (
        <Box
          sx={{
            display: {
              md: 'none',
              xs: 'block',
            },
          }}
        >
          <CategoryFilterByMobile
            facetList={facetList}
            header={categoryFacet.header}
            totalResults={totalResults}
            isLoading={isLoading}
            onFilterByClick={handleFilterBy}
          />
        </Box>
      )}
      {!isFilterBy && (
        <Box sx={{ ...styles.mainSection }}>
          <Box sx={{ ...styles.sideBar }}>
            <CategoryFacet
              categoryFacet={categoryFacet}
              onBackButtonClick={onBackButtonClick}
              onCategoryChildrenSelection={onCategoryChildrenSelection}
            />
            <CategoryFilterBy
              title="Filter By"
              facetList={facetList}
              onFilterByClick={handleFilterBy}
            />
          </Box>
          <Box>
            {!isLoading && (
              <Grid container sx={{ flexWrap: 'wrap' }}>
                {productToShow.map((product, index) => {
                  return (
                    <Grid key={product?.link || index} item lg={3} md={4} sm={4} xs={6}>
                      <ProductCard
                        imageUrl={product?.imageUrl}
                        link={product?.link}
                        price={product?.price}
                        title={product?.title}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            )}
            {isLoading && (
              <Grid container sx={{ flexWrap: 'wrap' }}>
                {Array.from(Array(16)).map((_, ind) => {
                  return (
                    <Grid key={ind} item lg={3} md={4} sm={4} xs={6}>
                      <ProductCard isLoading={isLoading} link="/" />
                    </Grid>
                  )
                })}
              </Grid>
            )}
            {!isLoading && isShowMoreButtonVisible && (
              <Box>
                <Box>
                  <Box sx={{ ...styles.productResults, color: 'grey.600', typography: 'body2' }}>
                    Showing {initialProductsToShow} out of {products.length} items
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ...styles.productResults }}>
                    <Button
                      sx={{ ...styles.showMoreButton }}
                      variant="contained"
                      onClick={() => showMoreProducts()}
                      color="inherit"
                    >
                      {t('show-more')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default ProductListingTemplate
