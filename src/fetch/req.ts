import type { Response } from 'node-fetch'
import type { OpnPaymentsConfig } from '../config'
import type { OpnPaymentsError } from '../error'
import { createFetch, type FetchResult } from './fetch'

const finalize = async <T, E extends string>(
  res: Response,
): Promise<FetchResult<T, OpnPaymentsError<E>>> => {
  if (res.ok) {
    const content: T | OpnPaymentsError<E> = await res.json()
    return {
      ok: true,
      status: res.status,
      content,
    }
  }
  const content = await res.text()
  return {
    ok: false,
    status: res.status,
    content,
  }
}

const getConfig = <T extends { vault?: boolean }>(
  config: OpnPaymentsConfig,
  arg: T,
): OpnPaymentsConfig => {
  const endpoint = !!arg.vault ? config.vaultEndpoint : config.endpoint
  return { ...config, endpoint }
}

export const reqWithQuery =
  (method: string) =>
  <Args extends any[]>(
    fn: (...args: Args) => { path: string; query?: string; vault?: boolean },
  ) => {
    return <R, E extends string = string>(config: OpnPaymentsConfig) => {
      return async (...args: Args): Promise<FetchResult<R, OpnPaymentsError<E>>> => {
        const arg = fn(...args)
        const fetch = createFetch(getConfig(config, arg))
        const query = arg.query?.replace(/^\?*/, '?') ?? ''
        const path = `${arg.path}${query}`
        return fetch(path, {
          method,
        }).then(finalize<R, E>)
      }
    }
  }

export const reqWithBody =
  (method: string) =>
  <Args extends any[]>(fn: (...args: Args) => { path: string; body?: object; vault?: boolean }) => {
    return <R, E extends string = string>(config: OpnPaymentsConfig) => {
      return async (...args: Args): Promise<FetchResult<R, OpnPaymentsError<E>>> => {
        const arg = fn(...args)
        const fetch = createFetch(getConfig(config, arg))
        const { path, body } = arg
        return fetch(path, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          ...(body ? { body: JSON.stringify(body) } : {}),
        }).then(finalize<R, E>)
      }
    }
  }
