import { testingEcho } from '@/lib/api/handlers'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(testingEcho as any)
