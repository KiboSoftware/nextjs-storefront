import { paypalApproveOrderHandler } from '@/lib/api/handlers'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(paypalApproveOrderHandler as any)
