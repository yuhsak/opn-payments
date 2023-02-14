import {
  createConfig,
  type OpnPaymentsConfig,
  type CreateOpnPaymentsConfigPayload,
} from '../config'
import { fetchAccount, updateAccount } from './account'
import { fetchBalance } from './balance'
import { fetchCapability } from './capability'
import { fetchCard, fetchCardsForCustomer, updateCard, deleteCard } from './card'
import {
  fetchCharge,
  fetchCharges,
  fetchAllCharges,
  fetchChargesForLink,
  createCharge,
  captureCharge,
  reverseCharge,
  updateDescriptionForCharge,
} from './charge'
import {
  fetchCustomer,
  fetchCustomers,
  fetchAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from './customer'
import {
  fetchDispute,
  fetchDisputes,
  fetchAllDisputes,
  fetchClosedDisputes,
  fetchAllClosedDisputes,
  fetchOpenDisputes,
  fetchAllOpenDisputes,
  fetchPendingDisputes,
  fetchAllPendingDisputes,
} from './dispute'
import { fetchForex } from './forex'
import { fetchLink, fetchLinks, fetchAllLinks, createLink, deleteLink } from './link'
import { fetchOccurrence, fetchOccurrencesForSchedule } from './occurrence'
import {
  fetchRecipient,
  fetchRecipients,
  fetchAllRecipients,
  createRecipient,
  updateRecipient,
  verifyRecipientOnlyForTesting,
  deleteRecipient,
} from './recipient'
import {
  fetchRefund,
  fetchRefunds,
  fetchRefundsForCharge,
  fetchAllRefunds,
  createRefund,
} from './refund'
import {
  fetchSchedule,
  fetchSchedules,
  fetchAllSchedules,
  fetchChargeSchedules,
  fetchAllChargeSchedules,
  fetchChargeSchedulesForCustomer,
  fetchTransferSchedules,
  fetchAllTransferSchedules,
  fetchTransferSchedulesForRecipient,
  createChargeSchedule,
  createTransferSchedule,
  deleteSchedule,
} from './schedule'
import { fetchTokenOnlyForTesting, createTokenOnlyForTesting } from './token'
import { fetchTransaction, fetchTransactions, fetchAllTransactions } from './transaction'
import {
  fetchTransfer,
  fetchTransfers,
  fetchAllTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer,
} from './transfer'

export class OpnPayments {
  public config: OpnPaymentsConfig
  public fetchAccount: ReturnType<typeof fetchAccount>
  public updateAccount: ReturnType<typeof updateAccount>
  public fetchBalance: ReturnType<typeof fetchBalance>
  public fetchCapability: ReturnType<typeof fetchCapability>
  public fetchCard: ReturnType<typeof fetchCard>
  public fetchCardsForCustomer: ReturnType<typeof fetchCardsForCustomer>
  public updateCard: ReturnType<typeof updateCard>
  public deleteCard: ReturnType<typeof deleteCard>
  public fetchCharge: ReturnType<typeof fetchCharge>
  public fetchCharges: ReturnType<typeof fetchCharges>
  public fetchAllCharges: ReturnType<typeof fetchAllCharges>
  public fetchChargesForLink: ReturnType<typeof fetchChargesForLink>
  public createCharge: ReturnType<typeof createCharge>
  public captureCharge: ReturnType<typeof captureCharge>
  public reverseCharge: ReturnType<typeof reverseCharge>
  public updateDescriptionForCharge: ReturnType<typeof updateDescriptionForCharge>
  public fetchCustomer: ReturnType<typeof fetchCustomer>
  public fetchCustomers: ReturnType<typeof fetchCustomers>
  public fetchAllCustomers: ReturnType<typeof fetchAllCustomers>
  public createCustomer: ReturnType<typeof createCustomer>
  public updateCustomer: ReturnType<typeof updateCustomer>
  public deleteCustomer: ReturnType<typeof deleteCustomer>
  public fetchDispute: ReturnType<typeof fetchDispute>
  public fetchDisputes: ReturnType<typeof fetchDisputes>
  public fetchAllDisputes: ReturnType<typeof fetchAllDisputes>
  public fetchClosedDisputes: ReturnType<typeof fetchClosedDisputes>
  public fetchAllClosedDisputes: ReturnType<typeof fetchAllClosedDisputes>
  public fetchOpenDisputes: ReturnType<typeof fetchOpenDisputes>
  public fetchAllOpenDisputes: ReturnType<typeof fetchAllOpenDisputes>
  public fetchPendingDisputes: ReturnType<typeof fetchPendingDisputes>
  public fetchAllPendingDisputes: ReturnType<typeof fetchAllPendingDisputes>
  public fetchForex: ReturnType<typeof fetchForex>
  public fetchLink: ReturnType<typeof fetchLink>
  public fetchLinks: ReturnType<typeof fetchLinks>
  public fetchAllLinks: ReturnType<typeof fetchAllLinks>
  public createLink: ReturnType<typeof createLink>
  public deleteLink: ReturnType<typeof deleteLink>
  public fetchOccurrence: ReturnType<typeof fetchOccurrence>
  public fetchOccurrencesForSchedule: ReturnType<typeof fetchOccurrencesForSchedule>
  public fetchRecipient: ReturnType<typeof fetchRecipient>
  public fetchRecipients: ReturnType<typeof fetchRecipients>
  public fetchAllRecipients: ReturnType<typeof fetchAllRecipients>
  public createRecipient: ReturnType<typeof createRecipient>
  public updateRecipient: ReturnType<typeof updateRecipient>
  public verifyRecipientOnlyForTesting: ReturnType<typeof verifyRecipientOnlyForTesting>
  public deleteRecipient: ReturnType<typeof deleteRecipient>
  public fetchRefund: ReturnType<typeof fetchRefund>
  public fetchRefunds: ReturnType<typeof fetchRefunds>
  public fetchRefundsForCharge: ReturnType<typeof fetchRefundsForCharge>
  public fetchAllRefunds: ReturnType<typeof fetchAllRefunds>
  public createRefund: ReturnType<typeof createRefund>
  public fetchSchedule: ReturnType<typeof fetchSchedule>
  public fetchSchedules: ReturnType<typeof fetchSchedules>
  public fetchAllSchedules: ReturnType<typeof fetchAllSchedules>
  public fetchChargeSchedules: ReturnType<typeof fetchChargeSchedules>
  public fetchAllChargeSchedules: ReturnType<typeof fetchAllChargeSchedules>
  public fetchChargeSchedulesForCustomer: ReturnType<typeof fetchChargeSchedulesForCustomer>
  public fetchTransferSchedules: ReturnType<typeof fetchTransferSchedules>
  public fetchAllTransferSchedules: ReturnType<typeof fetchAllTransferSchedules>
  public fetchTransferSchedulesForRecipient: ReturnType<typeof fetchTransferSchedulesForRecipient>
  public createChargeSchedule: ReturnType<typeof createChargeSchedule>
  public createTransferSchedule: ReturnType<typeof createTransferSchedule>
  public deleteSchedule: ReturnType<typeof deleteSchedule>
  public fetchTokenOnlyForTesting: ReturnType<typeof fetchTokenOnlyForTesting>
  public createTokenOnlyForTesting: ReturnType<typeof createTokenOnlyForTesting>
  public fetchTransaction: ReturnType<typeof fetchTransaction>
  public fetchTransactions: ReturnType<typeof fetchTransactions>
  public fetchAllTransactions: ReturnType<typeof fetchAllTransactions>
  public fetchTransfer: ReturnType<typeof fetchTransfer>
  public fetchTransfers: ReturnType<typeof fetchTransfers>
  public fetchAllTransfers: ReturnType<typeof fetchAllTransfers>
  public createTransfer: ReturnType<typeof createTransfer>
  public updateTransfer: ReturnType<typeof updateTransfer>
  public deleteTransfer: ReturnType<typeof deleteTransfer>

  constructor(arg: CreateOpnPaymentsConfigPayload) {
    this.config = createConfig(arg)
    this.fetchAccount = fetchAccount(this.config)
    this.updateAccount = updateAccount(this.config)
    this.fetchBalance = fetchBalance(this.config)
    this.fetchCapability = fetchCapability(this.config)
    this.fetchCard = fetchCard(this.config)
    this.fetchCardsForCustomer = fetchCardsForCustomer(this.config)
    this.updateCard = updateCard(this.config)
    this.deleteCard = deleteCard(this.config)
    this.fetchCharge = fetchCharge(this.config)
    this.fetchCharges = fetchCharges(this.config)
    this.fetchAllCharges = fetchAllCharges(this.config)
    this.fetchChargesForLink = fetchChargesForLink(this.config)
    this.createCharge = createCharge(this.config)
    this.captureCharge = captureCharge(this.config)
    this.reverseCharge = reverseCharge(this.config)
    this.updateDescriptionForCharge = updateDescriptionForCharge(this.config)
    this.fetchCustomer = fetchCustomer(this.config)
    this.fetchCustomers = fetchCustomers(this.config)
    this.fetchAllCustomers = fetchAllCustomers(this.config)
    this.createCustomer = createCustomer(this.config)
    this.updateCustomer = updateCustomer(this.config)
    this.deleteCustomer = deleteCustomer(this.config)
    this.fetchDispute = fetchDispute(this.config)
    this.fetchDisputes = fetchDisputes(this.config)
    this.fetchAllDisputes = fetchAllDisputes(this.config)
    this.fetchClosedDisputes = fetchClosedDisputes(this.config)
    this.fetchAllClosedDisputes = fetchAllClosedDisputes(this.config)
    this.fetchOpenDisputes = fetchOpenDisputes(this.config)
    this.fetchAllOpenDisputes = fetchAllOpenDisputes(this.config)
    this.fetchPendingDisputes = fetchPendingDisputes(this.config)
    this.fetchAllPendingDisputes = fetchAllPendingDisputes(this.config)
    this.fetchForex = fetchForex(this.config)
    this.fetchLink = fetchLink(this.config)
    this.fetchLinks = fetchLinks(this.config)
    this.fetchAllLinks = fetchAllLinks(this.config)
    this.createLink = createLink(this.config)
    this.deleteLink = deleteLink(this.config)
    this.fetchOccurrence = fetchOccurrence(this.config)
    this.fetchOccurrencesForSchedule = fetchOccurrencesForSchedule(this.config)
    this.fetchRecipient = fetchRecipient(this.config)
    this.fetchRecipients = fetchRecipients(this.config)
    this.fetchAllRecipients = fetchAllRecipients(this.config)
    this.createRecipient = createRecipient(this.config)
    this.updateRecipient = updateRecipient(this.config)
    this.verifyRecipientOnlyForTesting = verifyRecipientOnlyForTesting(this.config)
    this.deleteRecipient = deleteRecipient(this.config)
    this.fetchRefund = fetchRefund(this.config)
    this.fetchRefunds = fetchRefunds(this.config)
    this.fetchRefundsForCharge = fetchRefundsForCharge(this.config)
    this.fetchAllRefunds = fetchAllRefunds(this.config)
    this.createRefund = createRefund(this.config)
    this.fetchSchedule = fetchSchedule(this.config)
    this.fetchSchedules = fetchSchedules(this.config)
    this.fetchAllSchedules = fetchAllSchedules(this.config)
    this.fetchChargeSchedules = fetchChargeSchedules(this.config)
    this.fetchAllChargeSchedules = fetchAllChargeSchedules(this.config)
    this.fetchChargeSchedulesForCustomer = fetchChargeSchedulesForCustomer(this.config)
    this.fetchTransferSchedules = fetchTransferSchedules(this.config)
    this.fetchAllTransferSchedules = fetchAllTransferSchedules(this.config)
    this.fetchTransferSchedulesForRecipient = fetchTransferSchedulesForRecipient(this.config)
    this.createChargeSchedule = createChargeSchedule(this.config)
    this.createTransferSchedule = createTransferSchedule(this.config)
    this.deleteSchedule = deleteSchedule(this.config)
    this.fetchTokenOnlyForTesting = fetchTokenOnlyForTesting(this.config)
    this.createTokenOnlyForTesting = createTokenOnlyForTesting(this.config)
    this.fetchTransaction = fetchTransaction(this.config)
    this.fetchTransactions = fetchTransactions(this.config)
    this.fetchAllTransactions = fetchAllTransactions(this.config)
    this.fetchTransfer = fetchTransfer(this.config)
    this.fetchTransfers = fetchTransfers(this.config)
    this.fetchAllTransfers = fetchAllTransfers(this.config)
    this.createTransfer = createTransfer(this.config)
    this.updateTransfer = updateTransfer(this.config)
    this.deleteTransfer = deleteTransfer(this.config)
  }
}
