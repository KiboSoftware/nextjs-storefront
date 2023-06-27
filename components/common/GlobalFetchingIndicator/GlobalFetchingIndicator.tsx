import { useIsFetching } from '@tanstack/react-query'
import NProgress from 'nprogress'

function GlobalFetchingIndicator() {
  const isLoadingFetching = useIsFetching()
  if (isLoadingFetching > 1) {
    NProgress.start()
  } else {
    NProgress.done()
  }

  return null
}

export default GlobalFetchingIndicator
