"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useWebSocket } from '@/context/WebSocketContext';

const GameStage = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [thinkingPlayer, setThinkingPlayer] = useState<number | null>(null);
  const { messages } = useWebSocket();
  
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      console.log('Last message:', lastMessage);
      
      // Handle player messages
      if (lastMessage.type === 'agent' && lastMessage.sender && !lastMessage.sender.includes('Host')) {
        // Add new player if not exists
        if (!players.includes(lastMessage.sender)) {
          setPlayers(prev => [...prev, lastMessage.sender]);
        }
        
        // Show thinking animation for this player
        const playerIndex = players.indexOf(lastMessage.sender);
        console.log('Player index for', lastMessage.sender, ':', playerIndex);
        
        if (playerIndex !== -1) {
          setThinkingPlayer(playerIndex);
          console.log('Setting thinking player to:', playerIndex);
          
          // Hide after 2 seconds
          setTimeout(() => {
            setThinkingPlayer(null);
            console.log('Resetting thinking player to null');
          }, 4000);
        }
      }
    }
  }, [messages, players]);  // Remove players from dependency array to avoid potential issues

  console.log('Current players:', players);
  console.log('thinkingPlayer:', thinkingPlayer);
  

  return (
    <div className="relative w-[528px] h-[480px] overflow-hidden border-4 border-black">
      {/* 背景 */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      />
      
      {/* 角色群组容器 */}
      <div className="absolute bottom-20 right-20 flex gap-2 top-[40%] left-[28%]">
        {[1, 2, 3, 4, 5, 6].map((num, index) => {
          const isThinking = thinkingPlayer === index;
          console.log(`Character ${num} (index ${index}): isThinking=${isThinking}`);
          
          return (
            <div key={num} className="relative">
              {isThinking && (
                <Image 
                  src="/thinking.gif" 
                  width={20}
                  height={20}
                  className="absolute bottom-full left-1/2 -translate-x-1/2"
                  alt="thinking"
                />
              )}
              <div 
                className="w-8 h-12 bg-no-repeat bg-center"
                style={{ 
                  backgroundImage: `url('/Characters/${num}.png')`,
                  backgroundSize: "128px 192px",
                  backgroundPosition: "0 0"
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameStage; 