import { paypalBearerTokenHandler } from '@/lib/api/handlers'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(paypalBearerTokenHandler as any)
