export type OpnPaymentsError<T extends string = string> = {
  object: 'error'
  location: string
  code: T
  message: string
}

export const isOpnPaymentsError = <T extends string = string>(
  obj: unknown,
): obj is OpnPaymentsError<T> => {
  return typeof obj === 'object' && obj !== null && 'object' in obj && obj['object'] === 'error'
}
