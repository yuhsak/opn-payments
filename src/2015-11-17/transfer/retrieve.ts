import { get } from '../../fetch'
import type { OpnPaymentsTransfer, OpnPaymentsTransferList } from './schema'
import { createListQuery, fetchAll, type OpnPaymentsListQueryParam } from '../../list'

export const fetchTransfer = get((transferId: string) => ({
  path: `/transfers/${transferId}`,
}))<OpnPaymentsTransfer>

export const fetchTransfers = get((param?: OpnPaymentsListQueryParam) => ({
  path: `/transfers`,
  query: createListQuery(param),
}))<OpnPaymentsTransferList>

export const fetchAllTransfers = fetchAll(fetchTransfers)
