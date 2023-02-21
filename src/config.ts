import { apply } from './util'

export type OpnPaymentsConfig = {
  endpoint: string
  secretKey: string
  apiVersion: string | undefined
  onlyForTesting:
    | {
        vaultEndpoint: string
        publicKey: string
      }
    | undefined
}

export type CreateOpnPaymentsConfigPayload = {
  secretKey: string
  endpoint?: string
  apiVersion?: (string & {}) | '2014-07-27' | '2015-11-17' | '2017-11-02' | '2019-05-29'
  onlyForTesting?: {
    vaultEndpoint?: string
    publicKey: string
  }
}

const defaults = {
  endpoint: 'https://api.omise.co',
  vaultEndpoint: 'https://vault.omise.co',
}

export const createConfig = ({
  secretKey,
  endpoint = defaults.endpoint,
  apiVersion,
  onlyForTesting,
}: CreateOpnPaymentsConfigPayload): OpnPaymentsConfig => {
  const _testing = apply(onlyForTesting)(
    ({ publicKey, vaultEndpoint = defaults.vaultEndpoint }) => ({
      publicKey,
      vaultEndpoint: vaultEndpoint.replace(/\/+$/, ''),
    }),
  )

  return {
    secretKey,
    endpoint: endpoint.replace(/\/+$/, ''),
    onlyForTesting: _testing,
    apiVersion,
  }
}
