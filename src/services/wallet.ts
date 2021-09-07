import crypto from "crypto";
import albedo from "@albedo-link/intent";
import { Keypair } from "stellar-base";
import { verifyMessageSignature } from "@albedo-link/signature-verification";
import * as freighter from "@stellar/freighter-api";

export type ConnectResult =
  | {
      isError: true;
      error: any;
    }
  | {
      isError: false;
      keypair: Keypair;
    };

export interface Wallet {
  name(): string;
  logoUrl(): string | undefined;
  isAvailable(): boolean;
  connect(): Promise<ConnectResult>;
}

export class AlbedoWallet implements Wallet {
  name(): string {
    return "Albedo";
  }

  logoUrl(): string {
    return "/images/albedo.png";
  }

  isAvailable(): boolean {
    return true;
  }

  async connect(): Promise<ConnectResult> {
    try {
      const token = crypto.randomBytes(16).toString("base64");
      const result = await albedo.publicKey({ token: token });
      const isValid = verifyMessageSignature(
        result.pubkey,
        token,
        result.signature
      );
      if (!isValid) {
        throw new Error("Albedo message signature is not valid");
      }
      return { isError: false, keypair: Keypair.fromPublicKey(result.pubkey) };
    } catch (err) {
      return { isError: true, error: err };
    }
  }
}

export class RabetWallet implements Wallet {
  name(): string {
    return "Rabet";
  }

  logoUrl(): string {
    return "/images/rabet.png";
  }

  isAvailable(): boolean {
    const rabet = (window as any).rabet;
    return !!rabet && !!rabet.connect;
  }

  async connect(): Promise<ConnectResult> {
    try {
      if (!this.isAvailable()) {
        throw new Error("Rabet not available");
      }
      const rabet = (window as any).rabet;
      const result = await rabet.connect();
      console.log(result);
      const keypair = Keypair.fromPublicKey(result.publicKey);
      return {
        isError: false,
        keypair: keypair,
      };
    } catch (err) {
      return { isError: true, error: err };
    }
  }
}

export class FreighterWallet implements Wallet {
  name(): string {
    return "Freighter";
  }

  logoUrl(): string {
    return "/images/freighter.png";
  }

  isAvailable(): boolean {
    return freighter.isConnected();
  }

  async connect(): Promise<ConnectResult> {
    try {
      if (!this.isAvailable()) {
        throw new Error("Freighter not available");
      }
      const publicKey = await freighter.getPublicKey();
      const keypair = Keypair.fromPublicKey(publicKey);
      return {
        isError: false,
        keypair: keypair,
      };
    } catch (err) {
      return { isError: true, error: err };
    }
  }
}
