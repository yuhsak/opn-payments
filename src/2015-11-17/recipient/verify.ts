import { patch } from '../../fetch'
import type { OpnPaymentsRecipient } from './schema'

export const verifyRecipientOnlyForTesting = patch((recipientId: string) => ({
  path: `/recipients/${recipientId}/verify`,
}))<OpnPaymentsRecipient>
