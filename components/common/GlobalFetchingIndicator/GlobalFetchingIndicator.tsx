import NProgress from 'nprogress'
import { useIsFetching } from 'react-query'

function GlobalFetchingIndicator() {
  const isLoadingFetching = useIsFetching()
  if (isLoadingFetching) {
    NProgress.start()
  } else {
    NProgress.done()
  }

  return null
}

export default GlobalFetchingIndicator
