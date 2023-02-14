export type OpnPaymentsConfig = {
  endpoint: string
  vaultEndpoint: string
  secretKey: string
}

export type CreateOpnPaymentsConfigPayload = {
  secretKey: string
  endpoint?: string
  vaultEndpoint?: string
}

export const createConfig = ({
  secretKey,
  endpoint = 'https://api.omise.co',
  vaultEndpoint = 'https://vault.omise.co',
}: CreateOpnPaymentsConfigPayload): OpnPaymentsConfig => {
  return {
    secretKey,
    endpoint: endpoint.replace(/\/+$/, ''),
    vaultEndpoint: vaultEndpoint.replace(/\/+$/, ''),
  }
}
