import { get } from '../../fetch'
import type { OpnPaymentsCustomer, OpnPaymentsCustomerSchema } from './schema'
import {
  createListQuery,
  fetchAll,
  type OpnPaymentsList,
  type OpnPaymentsListQueryParam,
} from '../../list'

export const fetchCustomer = get((customerId: string) => ({
  path: `/customers/${customerId}`,
}))<OpnPaymentsCustomer>

export const fetchCustomers = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/customers`,
  query: createListQuery(param),
}))<OpnPaymentsList<typeof OpnPaymentsCustomerSchema>>

export const fetchAllCustomers = fetchAll(fetchCustomers)
