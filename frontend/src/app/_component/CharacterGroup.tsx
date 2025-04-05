"use client";

import { useCharacters } from "@/context/CharacterContext";
import Character from "./Character";
import { useEffect, useState } from "react";

const CharacterGroup = () => {
  const { characters } = useCharacters();
  const [enteredCharacters, setEnteredCharacters] = useState<Set<string>>(new Set());

  // 当有新角色加入时，延迟将其标记为已入场
  useEffect(() => {
    characters.forEach((char) => {
      if (!enteredCharacters.has(char.id)) {
        // 为每个角色设置一个随机延迟，让他们不会同时入场
        const delay = Math.random() * 500;
        setTimeout(() => {
          setEnteredCharacters(prev => new Set([...prev, char.id]));
        }, delay);
      }
    });
  }, [characters, enteredCharacters]);

  return (
    <div 
      className="absolute flex gap-[80px]"
      style={{
        imageRendering: 'pixelated',
        top: '31%',
        left: '22%'
      }}
    >
      {characters.map((char) => (
        <Character
          key={char.id}
          spriteIndex={char.spriteIndex}
          isEntering={!enteredCharacters.has(char.id)}
        />
      ))}
    </div>
  );
};

export default CharacterGroup; 