import { config } from './__config'
import { fetchAccount } from '../src/2015-11-17/account'
import { throwWhenError } from '../src/error/fn'

const getAccount = throwWhenError(fetchAccount)(config)

const globalSetup = async () => {
  const account = await getAccount()
  if (account.livemode) {
    throw new Error('This secret key is for PRODUCTION!')
  }
}

export default globalSetup
