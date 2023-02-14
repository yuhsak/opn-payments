export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const interval =
  (ms: number) =>
  <A extends unknown[], R>(fn: (...args: A) => Promise<R>) => {
    return async (...args: A): Promise<R> => {
      const value = await fn(...args)
      await wait(ms)
      return value
    }
  }

export const retry =
  (n: number, timeoutMs: number) =>
  <A extends unknown[], R>(fn: (...args: A) => Promise<R>) => {
    return async (...args: A): Promise<R> => {
      const state: { n: number } = { n: 0 }

      const wrapped = async (...args: A): Promise<R> => {
        try {
          const res = await fn(...args)
          return res
        } catch (e) {
          if (state.n >= n) {
            throw e
          }
          state.n += 1
          return new Promise((resolve) => {
            setTimeout(() => {
              wrapped(...args).then(resolve)
            }, timeoutMs)
          })
        }
      }

      return wrapped(...args)
    }
  }
