import { Networks } from "stellar-base";

export interface Network {
  name: "testnet" | "public";
  passphrase: string;
  serverUrl: string;
}

export const networks: Network[] = [
  {
    name: "testnet",
    passphrase: Networks.TESTNET,
    serverUrl: "https://horizon-testnet.stellar.org",
  },
  {
    name: "public",
    passphrase: Networks.PUBLIC,
    serverUrl: "https://horizon.stellar.org",
  },
];
