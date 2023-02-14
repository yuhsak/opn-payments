export const splitToChunks =
  (n = 10) =>
  <T>(arr: T[]): T[][] => {
    const res: T[][] = []
    let count = 0
    while (count < arr.length) {
      res.push(arr.slice(count, count + n))
      count += n
    }
    return res
  }
