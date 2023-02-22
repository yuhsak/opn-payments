import { config } from './__config'
import * as Recipient from '../src/2015-11-17/recipient'
import { throwWhenError } from '../src/error/fn'
import { initRecipient } from './__util'

const deleteRecipient = throwWhenError(Recipient.deleteRecipient)(config)
const fetchRecipient = throwWhenError(Recipient.fetchRecipient)(config)
const fetchRecipients = throwWhenError(Recipient.fetchRecipients)(config)
const updateRecipient = throwWhenError(Recipient.updateRecipient)(config)
const verifyRecipientOnlyForTesting = throwWhenError(Recipient.verifyRecipientOnlyForTesting)(
  config,
)

describe('Recipient', () => {
  test('Create recipient', async () => {
    const recipient = await initRecipient(false)
    expect(() => Recipient.OpnPaymentsRecipientSchema.parse(recipient)).not.toThrowError()
    expect(recipient.verified).toBe(false)
    const verified = await verifyRecipientOnlyForTesting(recipient.id)
    expect(() => Recipient.OpnPaymentsRecipientSchema.parse(verified)).not.toThrowError()
    expect(verified.verified).toBe(true)
  })

  test('Delete recipient', async () => {
    const recipient = await initRecipient()
    const deleted = await deleteRecipient(recipient.id)
    expect(() => Recipient.OpnPaymentsDeletedRecipientSchema.parse(deleted)).not.toThrowError()
  })

  test('Fetch recipient', async () => {
    const recipient = await initRecipient()
    const fetched = await fetchRecipient(recipient.id)
    expect(() => Recipient.OpnPaymentsRecipientSchema.parse(fetched)).not.toThrowError()
    await deleteRecipient(fetched.id)
    expect(fetchRecipient(fetched.id)).rejects.toEqual(
      expect.objectContaining({
        code: 'not_found',
      }),
    )
  })

  test('Fetch recipients', async () => {
    const recipient = await initRecipient()
    const recipients = await fetchRecipients()
    expect(() => Recipient.OpnPaymentsRecipientListSchema.parse(recipients)).not.toThrowError()
  })

  test('Update recipient', async () => {
    const recipient = await initRecipient()
    const updated = await updateRecipient(recipient.id, {
      name: 'John Doe B',
      type: 'corporation',
      bank_account: {
        name: 'John Doe B',
        account_type: 'current',
        branch_code: '003',
        number: '9876543',
      },
    })
    expect(() => Recipient.OpnPaymentsRecipientSchema.parse(updated)).not.toThrowError()
    expect(updated.verified).toBe(false)
  })
})
