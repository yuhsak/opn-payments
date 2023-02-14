import { patch } from '../../fetch'
import type { OpnPaymentsCard } from './schema'

export type UpdateOpnPaymentsCardPayload = {
  expiration_month?: number
  expiration_year?: number
  name?: string
  city?: string
  country?: string
  postal_code?: string
  state?: string
  street1?: string
  street2?: string
  phone_number?: string
}

export const updateCard = patch(
  (customerId: string, cardId: string, payload: UpdateOpnPaymentsCardPayload) => ({
    path: `/customers/${customerId}/cards/${cardId}`,
    body: payload,
  }),
)<OpnPaymentsCard>
