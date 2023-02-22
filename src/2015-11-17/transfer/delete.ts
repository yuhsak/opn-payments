import { del } from '../../fetch'
import type { OpnPaymentsDeletedTransfer } from './schema'

export const deleteTransfer = del((transferId: string) => ({
  path: `/transfers/${transferId}`,
}))<OpnPaymentsDeletedTransfer>
