"use client";

import { Button } from "pixel-retroui";
import { useAccount, useConfig } from "wagmi";
import { switchChain } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCallback, useState } from "react";
import Header from "./_component/header";
import Stage from "./_component/stage";

export default function Home() {
  const { isConnected } = useAccount();
  const config = useConfig();
  const { openConnectModal } = useConnectModal();
  // mock NFT mint status
  const [hasNFT, setHasNFT] = useState(false);

  const handleMint = async () => {
    try {
      // mock mint success
      setHasNFT(true);
      console.log('Minted NFT successfully (simulated)');
    } catch (error) {
      console.error("Mint failed:", error);
    }
  };

  const connectWallet = useCallback(
    async ({
      chainId,
    }: {
      chainId?: (typeof config)["chains"][number]["id"];
    } = {}) => {
      try {
        if (chainId) {
          await switchChain(config, { chainId });
        }
        openConnectModal?.();
      } catch (error) {
        console.error(error);
      }
    },
    [config, openConnectModal]
  );

  if (!isConnected) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col justify-center gap-[32px] row-start-2 items-center">
          <Button onClick={() => connectWallet()}>Connect Wallet</Button>
        </main>
      </div>
    );
  }

  if (!hasNFT) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col justify-center gap-[32px] row-start-2 items-center">
          <Header />
          <div className="mt-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-yellow-500">You don&apos;t have Shill Game NFT</p>
              <Button onClick={handleMint}>Get NFT (Test Mode)</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Stage />
    </div>
  );
}
