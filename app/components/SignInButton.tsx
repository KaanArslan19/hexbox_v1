"use client";
import React, { useEffect } from "react";
import {
  useSession,
  signIn,
  signOut,
  SignInResponse,
  getCsrfToken,
} from "next-auth/react";
import dynamic from "next/dynamic";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { serializeData } from "../utils/serializeData";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const SignInButton = () => {
  const { status } = useSession();
  const wallet: WalletContextState = useWallet();

  const signInWallet = async (jsonInput: string, jsonOutput: string) => {
    try {
      let result: SignInResponse | undefined = await signIn("credentials", {
        output: jsonOutput,
        input: jsonInput,
        redirect: false,
      });

      if (result?.ok != true) {
        throw new Error("Failed to sign in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    if (!wallet.signIn) {
      console.warn("Wallet not supported!");
      return;
    }

    // Creation of SignInInput to be passed to wallet.signIn
    const input: SolanaSignInInput = {
      domain: window.location.host,
      address: wallet.publicKey?.toBase58() || "",
      statement: "Sign in to the App",
      nonce: await getCsrfToken(),
    };

    // Actual signature by the user through the wallet
    const output: SolanaSignInOutput = await wallet.signIn(input);

    // Serialisation of the input and output data
    const { jsonInput, jsonOutput }: { jsonInput: string; jsonOutput: string } =
      serializeData(input, output);

    // Signing in the user with NextAuth.js signIn()
    await signInWallet(jsonInput, jsonOutput);
  };

  // Simple handler for NextAuth.js signOut()
  const handleSignOut = async () => {
    const result = await signOut({
      redirect: false,
    });
  };

  useEffect(() => {
    if (wallet.connected === false && status === "authenticated") {
      handleSignOut();
    } else if (wallet.connected === true && status === "unauthenticated") {
      handleSignIn();
    }
  }, [wallet.connected]);

  return (
    <>
      <WalletMultiButtonDynamic />
    </>
  );
};

export default SignInButton;
