import { del } from '../../fetch'
import type { OpnPaymentsTransfer } from './schema'

export const deleteTransfer = del((transferId: string) => ({
  path: `/transfers/${transferId}`,
}))<OpnPaymentsTransfer>
