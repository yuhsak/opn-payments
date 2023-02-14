import { get } from '../../fetch'
import type { OpnPaymentsForex } from './schema'

export const fetchForex = get((currency: string) => ({
  path: `/forex/${currency}`,
}))<OpnPaymentsForex>
