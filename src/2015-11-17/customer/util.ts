import type { OpnPaymentsCustomer, OpnPaymentsDeletedCustomer } from './schema'

export const isDeletedCustomer = (
  customer: OpnPaymentsCustomer | OpnPaymentsDeletedCustomer,
): customer is OpnPaymentsDeletedCustomer => !('location' in customer) && customer.deleted
