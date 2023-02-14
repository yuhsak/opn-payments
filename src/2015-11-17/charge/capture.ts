import type { OpnPaymentsCharge } from './schema'
import { post } from '../../fetch'

export const captureCharge = post((chargeId: string) => ({
  path: `/charges/${chargeId}/capture`,
}))<OpnPaymentsCharge>

export const reverseCharge = post((chargeId: string) => ({
  path: `/charges/${chargeId}/reverse`,
}))<OpnPaymentsCharge>
