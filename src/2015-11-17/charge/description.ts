import type { OpnPaymentsCharge } from './schema'
import { patch } from '../../fetch'

export type UpdateDescriptionForOpnPaymentsChargePayload = {
  description?: string
  metadata?: object
}

export const updateDescriptionForCharge = patch(
  (chargeId: string, payload: UpdateDescriptionForOpnPaymentsChargePayload) => ({
    path: `/charges/${chargeId}`,
    body: payload,
  }),
)<OpnPaymentsCharge>
