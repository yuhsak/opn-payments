import { post } from '../../fetch'
import type { OpnPaymentsTransfer } from './schema'

export type CreateOpnPaymentsTransferPayload = {
  amount?: number
  fail_fast?: boolean
  metadata?: object
  recipient?: string
}

export const createTransfer = post((payload: CreateOpnPaymentsTransferPayload) => ({
  path: `/transfers`,
  body: payload,
}))<OpnPaymentsTransfer>
