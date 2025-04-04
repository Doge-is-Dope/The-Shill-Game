"use client";

import { Button } from "pixel-retroui";
import { useAccount, useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import shortAccount from "@/lib/shortAccount";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "pixel-retroui";

const Header = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ address });

  const displayAddress = ensName || shortAccount(address);
  const avatarSrc = ensAvatar;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#2C2C2C] border-b-4 border-[#1a1a1a] px-4 py-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-pixel text-white">🎮 🎮 🎮</h1>
        </div>
        <DropdownMenu bg="#fefcd0" textColor="black" borderColor="black">
          <DropdownMenuTrigger className="w-full">
            <div className="flex items-center gap-2">
              {avatarSrc && (
                <Image
                  src={avatarSrc}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              {displayAddress}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="w-full">
              <p onClick={() => disconnect()}>Disconnect</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
