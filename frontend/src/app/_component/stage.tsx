"use client";

import { useWebSocket } from "@/context/WebSocketContext";
import { useEffect } from "react";
import { Button } from "pixel-retroui";
import MessageBoard from "./MessageBoard";
import GameStage from "./GameStage";
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
            <GameStage />
            
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
