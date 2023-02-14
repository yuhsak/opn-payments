import type { OpnPaymentsListQueryParam } from './query'
import { type OpnPaymentsError } from '../error'
import { throwWhenError } from '../error/fn'
import type { OpnPaymentsConfig } from '../config'
import { splitToChunks, retry, interval } from '../util'
import type { FetchResult } from '../fetch/fetch'
import { createAsyncQueue } from 'pico-queue'
import type { __OpnPaymentsListType } from './schema'

const _retry = retry(10, 300)
const _interval = interval(1000)

export type FetchAllParam<T> = {
  from?: OpnPaymentsListQueryParam['from']
  to?: OpnPaymentsListQueryParam['to']
  callback?: (arg: __OpnPaymentsListType<T>) => void
}

export const fetchAll = <T, E extends string>(
  fetcher: (
    config: OpnPaymentsConfig,
  ) => (
    param?: OpnPaymentsListQueryParam,
  ) => Promise<FetchResult<__OpnPaymentsListType<T>, OpnPaymentsError<E>>>,
  nFetchPerSec = 10,
) => {
  return (config: OpnPaymentsConfig) =>
    async ({
      from,
      to,
      callback,
    }: {
      from?: OpnPaymentsListQueryParam['from']
      to?: OpnPaymentsListQueryParam['to']
      callback?: (arg: __OpnPaymentsListType<T>) => void
    } = {}) => {
      const fetch = _retry(throwWhenError(fetcher)(config))

      const nItemsPerFetch = 100
      const { total } = await fetch({ limit: 1, offset: 0, from, to })
      const nFetch = Math.ceil(total / nItemsPerFetch)

      const offsets = [...Array(nFetch)].reduce<number[]>(
        (acc) => {
          const last = acc.slice(-1)[0] ?? 0
          return [...acc, last + nItemsPerFetch]
        },
        [0],
      )

      const { sequence } = createAsyncQueue()

      const fetchMany = sequence(
        _interval(async (offsets: number[]) => {
          return Promise.all(
            offsets.map((offset) =>
              fetch({ from, to, limit: nItemsPerFetch, offset, order: 'chronological' }),
            ),
          ).then((res) => {
            return res.flatMap((res) => {
              if (callback) {
                callback(res)
              }
              return res.data
            })
          })
        }),
      )

      const chunks = splitToChunks(nFetchPerSec)(offsets)

      return Promise.all(chunks.map(fetchMany)).then((res) => res.flat())
    }
}
