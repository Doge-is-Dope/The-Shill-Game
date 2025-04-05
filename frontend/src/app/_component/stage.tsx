"use client";

import Image from "next/image";
import bgImage from "@/assets/bg.png";
import { useWebSocket } from "@/context/WebSocketContext";
import { useEffect } from "react";
import { Button } from "pixel-retroui";
import MessageBoard from "./MessageBoard";
import CharacterGroup from "./CharacterGroup";
// import Header from "./header";

const Stage = () => {
  const { messages, startGame, nextRound, getGameState } = useWebSocket();

  useEffect(() => {
    if (messages.length > 0) {
      console.log("Latest message:", messages[messages.length - 1]);
    }
  }, [messages]);

  return (
    <>
      <div className="min-h-screen bg-[#1a1a2e] pt-16 p-8">
        {/* Main Game Area */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-[2fr_1fr] gap-8">
          {/* Left Side - Game Stage */}
          <div className="space-y-6">
            <div className="relative w-full h-[480px] rounded-xl overflow-hidden border-4 border-[#3a4f7a] shadow-[0_0_20px_rgba(58,79,122,0.3)]">
              <Image
                src={bgImage}
                alt="Game Stage Background"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ objectFit: 'contain' }}
                priority
                className="bg-[#16213e]"
              />
              
              {/* Characters */}
              <CharacterGroup />
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={startGame}
                className="!min-w-[120px] !h-[45px]"
              >
                Start Game
              </Button>
              <Button 
                onClick={nextRound}
                className="!min-w-[120px] !h-[45px]"
              >
                Next Round
              </Button>
              <Button 
                onClick={getGameState}
                className="!min-w-[120px] !h-[45px]"
              >
                Get State
              </Button>
            </div>
          </div>

          {/* Right Side - Message Board */}
          <div>
            <MessageBoard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stage;
