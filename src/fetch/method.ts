import { reqWithBody, reqWithQuery } from './req'

export const get = reqWithQuery('GET')
export const del = reqWithBody('DELETE')
export const post = reqWithBody('POST')
export const patch = reqWithBody('PATCH')
