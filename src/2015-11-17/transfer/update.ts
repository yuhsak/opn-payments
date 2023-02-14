import { patch } from '../../fetch'
import type { OpnPaymentsTransfer } from './schema'

export type UpdateOpnPaymentsTransferPayload = {
  amount?: number
  metadata?: object
}

export const updateTransfer = patch(
  (transferId: string, payload: UpdateOpnPaymentsTransferPayload) => ({
    path: `/transfers/${transferId}`,
    body: payload,
  }),
)<OpnPaymentsTransfer>
