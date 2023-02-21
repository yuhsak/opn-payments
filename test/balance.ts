import { config } from './__config'
import { OpnPaymentsBalanceSchema, fetchBalance } from '../src/2015-11-17/balance'
import { throwWhenError } from '../src/error/fn'

const getBalance = throwWhenError(fetchBalance)(config)

describe('balance', () => {
  test('fetchBalance', async () => {
    const balance = await getBalance()
    const fn = () => OpnPaymentsBalanceSchema.parse(balance)
    expect(fn).not.toThrowError()
  })
})
