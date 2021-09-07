import { Keypair } from "stellar-base";
import { Server } from "stellar-sdk";

export type AccountDetails =
  | {
      isError: false;
      accountId: string;
      createdAt: string;
      createdBy: string;
      balances: Array<{
        balance: string;
        assetCode: string;
        assetIssuer?: string;
      }>;
    }
  | {
      isError: true;
      error: any;
    };

export const fetchAccount: (
  server: Server,
  keypair: Keypair
) => Promise<AccountDetails> = async (server, keypair) => {
  try {
    const account = await server.loadAccount(keypair.publicKey());
    const operations = await server
      .operations()
      .forAccount(account.accountId())
      .order("asc")
      .limit(5)
      .includeFailed(false)
      .call();

    const balances = account.balances.map((asset) => {
      if (asset.asset_type === "native") {
        return {
          balance: asset.balance,
          assetCode: "XLM",
        };
      } else {
        return {
          balance: asset.balance,
          assetCode: asset.asset_code,
          assetIssuer: asset.asset_issuer,
        };
      }
    });

    const createRecord = operations.records.find(
      (rec) => rec.type === "create_account"
    );
    const createdAt = createRecord ? createRecord.created_at : "-";
    const createdBy = createRecord ? createRecord.source_account : "-";

    return {
      isError: false,
      accountId: account.accountId(),
      createdAt: createdAt,
      createdBy: createdBy,
      balances: balances,
    };
  } catch (err: any) {
    return {
      isError: true,
      error: err,
    };
  }
};
