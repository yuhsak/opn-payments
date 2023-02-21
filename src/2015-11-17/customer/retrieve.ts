import { get } from '../../fetch'
import type {
  OpnPaymentsCustomer,
  OpnPaymentsDeletedCustomer,
  OpnPaymentsCustomerList,
} from './schema'
import { createListQuery, fetchAll, type OpnPaymentsListQueryParam } from '../../list'

export const fetchCustomer = get((customerId: string) => ({
  path: `/customers/${customerId}`,
}))<OpnPaymentsCustomer | OpnPaymentsDeletedCustomer>

export const fetchCustomers = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/customers`,
  query: createListQuery(param),
}))<OpnPaymentsCustomerList>

export const fetchAllCustomers = fetchAll(fetchCustomers)
