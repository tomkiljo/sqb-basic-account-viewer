# Stellar Quest Bounties - Simple Account Viewer

Simple Account Viewer created for [Stellar Quest Bounties](https://github.com/tyvdh/stellar-quest-bounties/). Enables connecting a web-wallet to the website and viewing basic account information.

Currently supported web wallets:

- [Albedo](https://albedo.link/)
- [Freighter](https://www.freighter.app/)
- [Albedo](https://rabet.io/)

## Getting started

Install dependencies

```
$ yarn install
```

Run local development server (http://localhost:3000)

```
$ yarn start
```

Build a distribution package

```
$ yarn build
```

## Usage

The app contains a few simple functionalities.

**Network selection**

Select between Stellar testnet or public.

**Wallet connecting**

Connect and disconnect a web-wallet from the app. Technically the web-wallet merely provides an account public key on the consent of the user.

**Account viewing**

Display simple account information:

- Connected account id
- Account id that created the account
- Creation time of the account
- Assets and balances

## License

The MIT License (MIT)

Copyright (c) 2021 Tom Kiljo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
