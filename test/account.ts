import { config } from './__config'
import { OpnPaymentsAccountSchema, fetchAccount, updateAccount } from '../src/2015-11-17/account'
import { throwWhenError } from '../src/error/fn'

const getAccount = throwWhenError(fetchAccount)(config)

describe('account', () => {
  test('fetchAccount', async () => {
    const account = await getAccount()
    const fn = () => OpnPaymentsAccountSchema.parse(account)
    expect(fn).not.toThrowError()
  })

  test('updateAccount', async () => {
    const account = await getAccount()
    const update = updateAccount(config)
    const res = await update({
      chain_enabled: account.chain_enabled,
    })
    expect(res.ok).toBe(true)
    if (res.ok) {
      expect(res.content.object).toBe('account')
      if (res.content.object === 'account') {
        const fn = () => OpnPaymentsAccountSchema.parse(res.content)
        expect(fn).not.toThrowError()
      }
    }
  })
})
