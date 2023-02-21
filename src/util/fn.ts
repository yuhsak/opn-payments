export const nonNullable = <T>(arg: T): arg is NonNullable<T> => arg !== void 0 && arg !== null

export const applied =
  <V>(fallback: V) =>
  <T>(arg: T | undefined | null) =>
  <R>(fn: (arg: T) => R) => {
    return nonNullable(arg) ? fn(arg) : fallback
  }

export const apply = applied(void 0)

export const applyN = applied(null)
