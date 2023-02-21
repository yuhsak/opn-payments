import _fetch, { Headers, type RequestInit } from 'node-fetch'
import type { OpnPaymentsConfig } from '../config'

const createBasicAuthPayload = (username: string) => Buffer.from(username + ':').toString('base64')

export const createFetch = (config: OpnPaymentsConfig) => {
  const auth = createBasicAuthPayload(config.secretKey)
  const basicAuth = `Basic ${auth}`

  return async (path: string, init?: RequestInit) => {
    const _path = path.replace(/^\/*/, '/')
    const url = `${config.endpoint}${_path}`
    const headers = new Headers(init?.headers)
    headers.append('Authorization', basicAuth)
    if (config.apiVersion) {
      headers.append('Omise-Version', config.apiVersion)
    }

    return _fetch(url, {
      ...init,
      headers,
    })
  }
}

export type FetchResult<T, E> =
  | {
      ok: true
      status: number
      content: T
    }
  | {
      ok: false
      status: number
      content: string | E
    }
