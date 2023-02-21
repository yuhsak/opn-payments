import type { FetchResult } from '../../fetch/fetch'
import { isOpnPaymentsError, type OpnPaymentsError } from '../schema'

export const throwWhenNotJson = <Args extends any[], T>(
  fn: (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return async (...args: Args) => {
    const res = await fn(...args)
    if (typeof res.content === 'string') {
      throw new Error(`Failed to parse response. Got: ${res.content}`)
    }
    return res.content
  }
}

export const throwWhenError = <Args extends any[], T>(
  fn: (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return async (...args: Args) => {
    const res = await throwWhenNotJson(fn)(...args)
    if (isOpnPaymentsError(res)) {
      // throw new Error(`OpnPayments error. Code: ${res.code}, Message: ${res.message}`)
      // console.dir(res, { depth: null })
      throw res
    }
    return res
  }
}
