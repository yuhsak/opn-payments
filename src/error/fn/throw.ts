import type { OpnPaymentsConfig } from '../../config'
import type { FetchResult } from '../../fetch/fetch'
import { isOpnPaymentsError, type OpnPaymentsError } from '../schema'
import * as C from '../class/throw'

export const throwWhenNotOk = <Args extends any[], T>(
  fn: (config: OpnPaymentsConfig) => (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return (config: OpnPaymentsConfig) => C.throwWhenNotOk(fn(config))
}

export const throwWhenError = <Args extends any[], T>(
  fn: (config: OpnPaymentsConfig) => (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return (config: OpnPaymentsConfig) => C.throwWhenError(fn(config))
}
