import { post } from '../../fetch'
import type { OpnPaymentsTransfer } from './schema'

export const markTransferAsPaidOnlyForTesting = post((transferId: string) => ({
  path: `/transfers/${transferId}/mark_as_paid`,
}))<OpnPaymentsTransfer>

export const markTransferAsSentOnlyForTesting = post((transferId: string) => ({
  path: `/transfers/${transferId}/mark_as_sent`,
}))<OpnPaymentsTransfer>
