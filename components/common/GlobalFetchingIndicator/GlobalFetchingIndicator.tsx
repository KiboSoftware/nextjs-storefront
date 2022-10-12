import NProgress from 'nprogress'
import { useIsFetching } from 'react-query'

function GlobalFetchingIndicator() {
  try {
    const isLoadingFetching = useIsFetching()
    if (isLoadingFetching) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  } catch (err) {
    NProgress.done()
  }

  return null
}

export default GlobalFetchingIndicator
