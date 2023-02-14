import { del } from '../../fetch'
import type { OpnPaymentsDeletedCard } from './schema'

export const deleteCard = del((customerId: string, cardId: string) => ({
  path: `/customers/${customerId}/cards/${cardId}`,
}))<OpnPaymentsDeletedCard>
