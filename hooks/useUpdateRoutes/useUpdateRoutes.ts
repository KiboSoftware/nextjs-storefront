import { useRouter } from 'next/router'

export const useUpdateRoutes = () => {
  const router = useRouter()

  const updateRoute = (queryParam: string, action: 'add' | 'remove') => {
    let params = (router?.query?.filters as string) || ''
    params = action === 'add' ? params + `${queryParam},` : params.replace(`${queryParam},`, '')

    const newRoute = params.length
      ? {
          pathname: router?.pathname,
          query: { filters: params },
        }
      : {
          pathname: router?.pathname,
        }

    router?.push(newRoute)
  }

  return [updateRoute]
}
