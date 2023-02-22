import { config } from './__config'
import * as Transfer from '../src/2015-11-17/transfer'
import { throwWhenError } from '../src/error/fn'
import { initCustomerAndCharge, initRecipient } from './__util'

const createTransfer = throwWhenError(Transfer.createTransfer)(config)
const deleteTransfer = throwWhenError(Transfer.deleteTransfer)(config)
const fetchTransfer = throwWhenError(Transfer.fetchTransfer)(config)
const fetchTransfers = throwWhenError(Transfer.fetchTransfers)(config)
const updateTransfer = throwWhenError(Transfer.updateTransfer)(config)
const markTransferAsPaid = throwWhenError(Transfer.markTransferAsPaidOnlyForTesting)(config)
const markTransferAsSent = throwWhenError(Transfer.markTransferAsSentOnlyForTesting)(config)

describe('Transfer', () => {
  test('Create transfer', async () => {
    await initCustomerAndCharge(true, 1000)

    const transfer = await createTransfer()
    expect(() => Transfer.OpnPaymentsTransferSchema.parse(transfer)).not.toThrowError()
    const fetchedA = await fetchTransfer(transfer.id)
    expect(() => Transfer.OpnPaymentsTransferSchema.parse(fetchedA)).not.toThrowError()
    expect(fetchedA.sent).toBe(false)
    expect(fetchedA.paid).toBe(false)

    const sent = await markTransferAsSent(transfer.id)
    expect(() => Transfer.OpnPaymentsTransferSchema.parse(sent)).not.toThrowError()
    const fetchedB = await fetchTransfer(sent.id)
    expect(fetchedB.sent).toBe(true)
    expect(fetchedB.paid).toBe(false)

    const paid = await markTransferAsPaid(transfer.id)
    expect(() => Transfer.OpnPaymentsTransferSchema.parse(paid)).not.toThrowError()
    const fetchedC = await fetchTransfer(paid.id)
    expect(fetchedC.sent).toBe(true)
    expect(fetchedC.paid).toBe(true)
  })

  test('Create transfer for a recipient', async () => {
    const recipient = await initRecipient()
    await initCustomerAndCharge(true, 1000)

    const transfer = await createTransfer({ recipient: recipient.id, amount: 300 })
    expect(() => Transfer.OpnPaymentsTransferSchema.parse(transfer)).not.toThrowError()
  })

  test('Delete transfer', async () => {
    await initCustomerAndCharge(true, 1000)

    const transfer = await createTransfer()
    const deleted = await deleteTransfer(transfer.id)
    expect(() => Transfer.OpnPaymentsDeletedTransferSchema.parse(deleted)).not.toThrowError()
    expect(fetchTransfer(deleted.id)).rejects.toEqual(
      expect.objectContaining({
        code: 'not_found',
      }),
    )
  })

  test('Fetch transfers', async () => {
    await initCustomerAndCharge(true, 1000)

    const transferA = await createTransfer()
    const transferB = await createTransfer()
    await deleteTransfer(transferB.id)
    const transfers = await fetchTransfers({ order: 'reverse_chronological' })
    expect(() => Transfer.OpnPaymentsTransferListSchema.parse(transfers)).not.toThrowError()
  })

  test('Update transfer', async () => {
    await initCustomerAndCharge(true, 1000)
    const transfer = await createTransfer()
    const updated = await updateTransfer(transfer.id, { amount: 300 })
    expect(() => Transfer.OpnPaymentsTransferSchema.parse(updated)).not.toThrowError()
    const fetched = await fetchTransfer(updated.id)
    expect(updated.amount).toBe(300)
  })
})
