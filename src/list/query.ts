export type OpnPaymentsListQueryParam = {
  limit?: number | undefined
  offset?: number | undefined
  from?: Date | undefined
  to?: Date | undefined
  order?: 'chronological' | 'reverse_chronological' | undefined
}

export const createListQuery = ({
  order,
  limit,
  offset,
  from,
  to,
}: OpnPaymentsListQueryParam = {}) => {
  const param: Record<string, string> = {
    ...(limit !== void 0 ? { limit: limit.toString() } : {}),
    ...(offset !== void 0 ? { offset: offset.toString() } : {}),
    ...(from !== void 0 ? { from: from.toISOString() } : {}),
    ...(to !== void 0 ? { to: to.toISOString() } : {}),
    ...(order !== void 0 ? { order } : {}),
  }
  const search = new URLSearchParams(param)
  const query = search.toString()
  return !!query ? `?${query}` : ''
}
