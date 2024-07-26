import { isPayPalEnabled } from '@/lib/api/handlers'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(isPayPalEnabled as any)
