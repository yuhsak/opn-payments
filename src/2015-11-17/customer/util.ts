import type { OpnPaymentsCustomer, OpnPaymentsDeletedCustomer } from './schema'

export const isDeletedCustomer = (
  customer: OpnPaymentsCustomer | OpnPaymentsDeletedCustomer,
): customer is OpnPaymentsDeletedCustomer => 'deleted' in customer && customer.deleted

export const isCustomer = (
  customer: OpnPaymentsCustomer | OpnPaymentsDeletedCustomer,
): customer is OpnPaymentsCustomer => !isDeletedCustomer(customer)
