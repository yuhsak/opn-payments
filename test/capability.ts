import { config } from './__config'
import { OpnPaymentsCapabilitySchema, fetchCapability } from '../src/2015-11-17/capability'
import { throwWhenError } from '../src/error/fn'

const getCapability = throwWhenError(fetchCapability)(config)

describe('capability', () => {
  test('fetchCapability', async () => {
    const capability = await getCapability()
    const fn = () => OpnPaymentsCapabilitySchema.parse(capability)
    expect(fn).not.toThrowError()
  })
})
