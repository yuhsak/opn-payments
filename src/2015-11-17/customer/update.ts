import { patch } from '../../fetch'
import type { OpnPaymentsCustomer } from './schema'

export type UpdateOpnPaymentsCustomerPayload = {
  email?: string
  card?: string
  default_card?: string
  description?: string
  metadata?: object
}

export const updateCustomer = patch(
  (customerId: string, payload: UpdateOpnPaymentsCustomerPayload) => ({
    path: `/customers/${customerId}`,
    body: payload,
  }),
)<OpnPaymentsCustomer>
