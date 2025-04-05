"use client";

import { useEffect, useRef, useState } from 'react';
import { useCharacters } from '@/context/CharacterContext';
import { MainScene } from '@/game/scenes/MainScene';
import { ProgressBar } from 'pixel-retroui';

const GameStage = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const { characters } = useCharacters();
  const [progress, setProgress] = useState(0);
  const [isSceneReady, setIsSceneReady] = useState(false);

  // 初始化 Phaser 游戏
  useEffect(() => {
    if (!gameRef.current) return;

    const initPhaser = async () => {
      const Phaser = (await import('phaser')).default;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 482,
        height: 480,
        parent: gameRef.current!,
        transparent: true,
        scene: class extends MainScene {
          preload() {
            // 监听加载进度
            this.load.on('progress', (value: number) => {
              setProgress(Math.floor(value * 100));
            });
            
            super.preload();
          }

          create() {
            super.create();
            setIsSceneReady(true);
          }
        }
      };

      window.game = new Phaser.Game(config);
    };

    initPhaser();

    return () => {
      if (window.game) {
        window.game.destroy(true);
        window.game = undefined;
      }
      setIsSceneReady(false);
    };
  }, []);

  // 监听角色变化
  useEffect(() => {
    if (!isSceneReady) return;

    const scene = window.game?.scene.getScene('MainScene') as MainScene;
    if (!scene) return;

    console.log('Adding characters:', characters);
    characters.forEach(char => {
      scene.addCharacter(char.id, char.spriteIndex);
    });
  }, [characters, isSceneReady]);

  return (
    <div 
      ref={gameRef}
      className="relative w-[482px] h-[480px] rounded-xl overflow-hidden border-4 border-[#3a4f7a] shadow-[0_0_20px_rgba(58,79,122,0.3)]"
    >
      {progress < 100 && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e]/80 backdrop-blur-sm z-10">
          <div className="w-64 space-y-2">
            <div className="text-center text-white mb-4">Loading Game Assets...</div>
            <div className="px-4">
              <ProgressBar progress={progress} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStage; 