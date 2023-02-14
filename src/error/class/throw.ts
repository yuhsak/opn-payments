import type { FetchResult } from '../../fetch/fetch'
import { isOpnPaymentsError, type OpnPaymentsError } from '../schema'

export const throwWhenNotOk = <Args extends any[], T>(
  fn: (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return async (...args: Args) => {
    const res = await fn(...args)
    if (!res.ok) {
      throw new Error('failed_request_by_node_fetch')
    }
    return res.content
  }
}

export const throwWhenError = <Args extends any[], T>(
  fn: (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return async (...args: Args) => {
    const res = await throwWhenNotOk(fn)(...args)
    if (isOpnPaymentsError(res)) {
      throw new Error(res.code)
    }
    return res
  }
}
