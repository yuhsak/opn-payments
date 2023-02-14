import { del } from '../../fetch'
import type { OpnPaymentsDeletedCustomer } from './schema'

export const deleteCustomer = del((customerId: string) => ({
  path: `/customers/${customerId}`,
}))<OpnPaymentsDeletedCustomer>
