import { get } from '../../fetch'
import type { OpnPaymentsAccount } from './schema'

export const fetchAccount = get(() => ({
  path: `/account`,
}))<OpnPaymentsAccount>
