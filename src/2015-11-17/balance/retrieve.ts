import { get } from '../../fetch'
import type { OpnPaymentsBalance } from './schema'

export const fetchBalance = get(() => ({
  path: `/balance`,
}))<OpnPaymentsBalance>
