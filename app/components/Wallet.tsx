"use client";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import SignInButton from './SignInButton';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

const Wallet = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

    const network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet;
    const endpoint: string = clusterApiUrl(network);
    const wallets = useMemo(() => [], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}

export default Wallet