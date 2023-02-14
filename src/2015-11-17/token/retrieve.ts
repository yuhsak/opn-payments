import { get } from '../../fetch'
import type { OpnPaymentsToken } from './schema'

export const fetchTokenOnlyForTesting = get((tokenId: string) => ({
  path: `/tokens/${tokenId}`,
  vault: true,
}))<OpnPaymentsToken>
