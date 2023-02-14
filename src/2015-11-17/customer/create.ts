import { post } from '../../fetch'
import type { OpnPaymentsCustomer } from './schema'

export type CreateOpnPaymentsCustomerPayload = {
  email?: string
  card?: string
  description?: string
  metadata?: object
}

export const createCustomer = post((payload: CreateOpnPaymentsCustomerPayload) => ({
  path: `/customers`,
  body: payload,
}))<OpnPaymentsCustomer>
