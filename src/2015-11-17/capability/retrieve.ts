import { get } from '../../fetch'
import type { OpnPaymentsCapability } from './schema'

export const fetchCapability = get(() => ({
  path: `/capability`,
}))<OpnPaymentsCapability>
