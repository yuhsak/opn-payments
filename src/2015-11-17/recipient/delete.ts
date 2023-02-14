import { del } from '../../fetch'
import type { OpnPaymentsRecipient } from './schema'

export const deleteRecipient = del((recipientId: string) => ({
  path: `/recipients/${recipientId}`,
}))<OpnPaymentsRecipient>
