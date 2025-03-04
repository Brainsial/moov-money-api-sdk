<h1 align="center">
  <br>
  <a href="https://github.com/Brainsial/moov-money-api-sdk"><img src="https://brainsial.github.io/moov-money-api-sdk/assets/images/moov_money_sdk.png" alt="Moov Money SDK" width="200"></a>
  <br>
  Moov Money SDK
  <br>
</h1>

<h4 align="center">A library designed to facilitate Moov Money API integration.</h4>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#features">Features</a> •
  <a href="#response-handling">Response Handling</a> •
  <a href="#error-handling">Error Handling</a> •
  <a href="#exceptions">Exceptions</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a> •
  <a href="#developer">Developer</a>
</p>

## Installation

Install the SDK via npm:

```bash
npm install moov-money-api-sdk
```

## Configuration

Before using the SDK, configure your connection credentials, request timeout, encryption keys, environment (sandbox or production), etc.
The SDK includes a `MoovMoneyConfig` class to simplify this configuration.

```javascript
const { MoovMoneyAPI, MoovMoneyConfig } = require('moov-money-api-sdk');

const config = new MoovMoneyConfig()
    .setUsername('your_username')
    .setPassword('your_password')
    .setRequestTimeout(30) // in seconds
    .useSandbox(true); // Enable sandbox mode (disable for production)

const moovApi = new MoovMoneyAPI(config);
```

## Features

### 1. Send Push Transaction
The `pushTransaction` method sends a payment request to the client via a push transaction.

```javascript
const response = await moovApi.pushTransaction({
    telephone: '22995901234',
    amount: 5000,
    message: 'Payment of 5000 FCFA',
    data1: 'Order_1234', // optional
    data2: 'Additional info', // optional
    fee: 0 // optional fee
});
```

#### Parameters:
- `telephone`: Client's phone number (string)
- `amount`: Transaction amount (number)
- `message`: Transaction message to the client (string)
- `data1` and `data2`: Optional additional data (string)
- `fee`: Transaction fee amount (number, defaults to 0)

### 2. Send Push Transaction with Pending Status
The `pushWithPendingTransaction` method sends a push transaction request that remains pending until client confirmation. The client can confirm the transaction later using a USSD code.

```javascript
const response = await moovApi.pushWithPendingTransaction({
    telephone: '22995181010',
    amount: 5000,
    message: 'Payment of 5000 FCFA',
    data1: 'Order_1234',
    data2: 'Additional info',
    fee: 0
});
```

### 3. Check Transaction Status
The `getTransactionStatus` method allows you to check the status of an existing transaction by providing its reference ID.

```javascript
const statusResponse = await moovApi.getTransactionStatus('72024103000000009');
```

### 4. Transfer Flooz to Authorized Account
The `transferFlooz` method allows transferring funds from the merchant account to an authorized destination account.

```javascript
const response = await moovApi.transferFlooz({
    destination: '22995181010',
    amount: 10000,
    referenceId: 'Ref_12345',
    walletId: '0', // Wallet ID, defaults to "0"
    data: 'Transfer to partner' // optional
});
```

### 5. Check Subscriber Balance
The `getBalance` method checks the current balance of a subscriber account, querying the main wallet by default (Wallet ID: 0).

```javascript
const response = await moovApi.getBalance('22995181010');
```

### 6. Get Mobile Status and KYC Information
The `getMobileStatus` method retrieves a subscriber's status and KYC information (e.g., account type, name, birth date, etc.).

```javascript
const response = await moovApi.getMobileStatus('22995181010');
```

### 7. Perform Cash-in Transactions
The `cashIn` method performs cash deposit (cash-in) transactions to a subscriber.

```javascript
const response = await moovApi.cashIn({
    destination: '98239988',
    amount: 2000,
    referenceId: '10000000',
    data: 'other_data'
});
```

### 8. Perform Airtime Recharge
The `airtimeRecharge` method performs airtime recharge transactions for a subscriber.

```javascript
const response = await moovApi.airtimeRecharge({
    destination: '98239988',
    amount: 1000,
    referenceId: '10000000'
});
```

## Response Handling

All API methods return a Promise that resolves to a response object containing the following properties:

```javascript
{
    success: boolean,    // Indicates if the request was successful
    data: object,       // The response data from Moov Money API
    message: string,    // A message describing the result
    statusCode: number  // HTTP status code
}
```

## Error Handling

The SDK handles errors by throwing specific exceptions. Here's how to handle them:

```javascript
try {
    const response = await moovApi.pushTransaction({
        telephone: '22995901234',
        amount: 5000,
        message: 'Payment'
    });
} catch (error) {
    if (error instanceof ServerError) {
        console.error('Server error:', error.message);
    } else if (error instanceof ConfigurationError) {
        console.error('Configuration error:', error.message);
    }
}
```

## Exceptions

The SDK throws the following specific exceptions for better error handling:

- `ServerError`: Thrown when the Moov Money API returns a server error
- `ConfigurationError`: Thrown when SDK configuration is incorrect or incomplete
- `ValidationError`: Thrown when request parameters are invalid
- `NetworkError`: Thrown when network-related issues occur

## Contributing

Contributions are welcome! To report bugs or propose features, please submit an issue or pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

- [Brainsial](https://github.com/Brainsial)