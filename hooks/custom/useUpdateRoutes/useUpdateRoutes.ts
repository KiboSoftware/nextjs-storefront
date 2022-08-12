import { useRouter } from 'next/router'

const nonFilters = ['page', 'sort', 'search', 'itemsPerPage']
export const useUpdateRoutes = () => {
  const router = useRouter()

  const reduceFilters = (query: Record<string, string>) => (prev: {}, curr: string) => {
    const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr)
    return {
      ...prev,
      [curr]: makeArray ? query[curr] : [query[curr]],
    }
  }
  const getFiltersDataFromUrl = (onlyFilters: boolean) => {
    const { query } = router
    return Object.keys(query)
      .filter((f) => (onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f)))
      .reduce(reduceFilters(query as Record<string, string>), {})
  }
  const changeFilters = (filters: string) => {
    router.push(
      {
        pathname: router?.pathname,
        query: {
          ...router.query,
          ...getFiltersDataFromUrl(false),
          filters,
        },
      },
      undefined,
      { scroll: false }
    )
  }

  const updateRoute = (queryParam: string) => {
    if (!queryParam) {
      changeFilters('')
    } else {
      const qs = router?.query as { filters: string }
      const filters = qs?.filters ? qs?.filters?.split(',') : []
      const currentIndex = filters.indexOf(queryParam)
      if (currentIndex > -1) {
        filters.splice(currentIndex, 1)
      } else {
        filters.push(queryParam)
      }
      changeFilters(filters.join(','))
    }
  }
  return {
    updateRoute,
    changeFilters,
  }
}
