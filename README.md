# opn-payments

Server side client for OpnPayments.

## Install

```sh
npm install opn-payments
```

## Usage

```ts
import { OpnPayments } from 'opn-payments/2015-11-17'

const client = new OpnPayments({
  secretKey: 'skey_xxx'
})

client.fetchCharges().then(res => {
  console.log(res)
})
```
