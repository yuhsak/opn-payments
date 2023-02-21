import { del } from '../../fetch'
import type { OpnPaymentsDeletedRecipient } from './schema'

export const deleteRecipient = del((recipientId: string) => ({
  path: `/recipients/${recipientId}`,
}))<OpnPaymentsDeletedRecipient>
