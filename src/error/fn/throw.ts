import type { OpnPaymentsConfig } from '../../config'
import type { FetchResult } from '../../fetch/fetch'
import { type OpnPaymentsError } from '../schema'
import * as C from '../class/throw'

export const throwWhenNotJson = <Args extends any[], T>(
  fn: (config: OpnPaymentsConfig) => (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return (config: OpnPaymentsConfig) => C.throwWhenNotJson(fn(config))
}

export const throwWhenError = <Args extends any[], T>(
  fn: (config: OpnPaymentsConfig) => (...args: Args) => Promise<FetchResult<T, OpnPaymentsError>>,
) => {
  return (config: OpnPaymentsConfig) => C.throwWhenError(fn(config))
}
