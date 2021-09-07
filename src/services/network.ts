import { Networks } from "stellar-base";

export interface Network {
  name: "test" | "public";
  passphrase: string;
  serverUrl: string;
}

export const networks: Network[] = [
  {
    name: "test",
    passphrase: Networks.TESTNET,
    serverUrl: "https://horizon-testnet.stellar.org",
  },
  {
    name: "public",
    passphrase: Networks.PUBLIC,
    serverUrl: "https://horizon.stellar.org",
  },
];
