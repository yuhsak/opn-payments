import { reqWithBody, reqWithQuery } from './req'

export const get = reqWithQuery('GET')
export const del = reqWithQuery('DELETE')
export const post = reqWithBody('POST')
export const patch = reqWithBody('PATCH')
