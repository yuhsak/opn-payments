import { config } from './__config'
import {
  OpnPaymentsLinkSchema,
  OpnPaymentsDeletedLinkSchema,
  OpnPaymentsLinkListSchema,
  fetchLink,
  fetchLinks,
  createLink,
  deleteLink,
  isDeletedLink,
} from '../src/2015-11-17/link'
import { fetchChargesForLink, OpnPaymentsChargeListSchema } from '../src/2015-11-17/charge'
import { throwWhenError } from '../src/error/fn'

const get = throwWhenError(fetchLink)(config)
const gets = throwWhenError(fetchLinks)(config)
const create = throwWhenError(createLink)(config)
const del = throwWhenError(deleteLink)(config)
const getCharges = throwWhenError(fetchChargesForLink)(config)

describe('Link', () => {
  test('Create, fetch, delete', async () => {
    const link = await create({
      amount: 1000,
      currency: 'jpy',
      title: 'Test Link',
      description: 'this is a test link',
    })
    const parseA = () => OpnPaymentsLinkSchema.parse(link)
    expect(parseA).not.toThrowError()

    const fetchedLink = await get(link.id)
    const parseB = () => OpnPaymentsLinkSchema.parse(fetchedLink)
    expect(parseB).not.toThrowError()
    expect(isDeletedLink(fetchedLink)).not.toBe(true)

    const deletedLink = await del(link.id)
    const parseC = () => OpnPaymentsDeletedLinkSchema.parse(deletedLink)
    expect(parseC).not.toThrowError()
    expect(isDeletedLink(deletedLink)).toBe(true)

    // Linkは削除しても取得できる
    const fetchedDeletedLink = await get(link.id)
    const parseD = () => OpnPaymentsDeletedLinkSchema.parse(fetchedDeletedLink)
    expect(parseD).not.toThrowError()
    expect(isDeletedLink(fetchedDeletedLink)).toBe(true)
  })

  test('Fetch links', async () => {
    // 削除済みのものも含む
    const links = await gets()
    const parse = () => OpnPaymentsLinkListSchema.parse(links)
    expect(parse).not.toThrowError()
  })

  test('Fetch charges for link', async () => {
    const link = await create({
      amount: 1000,
      currency: 'jpy',
      title: 'Test Link',
      description: 'this is a test link',
    })
    const chargesA = await getCharges(link.id)
    expect(() => OpnPaymentsChargeListSchema.parse(chargesA)).not.toThrowError()

    // 削除済みのリンクでも取得できる
    await del(link.id)
    const chargesB = await getCharges(link.id)
    expect(() => OpnPaymentsChargeListSchema.parse(chargesB)).not.toThrowError()
  })
})
