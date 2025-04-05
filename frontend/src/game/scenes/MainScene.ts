"use client";

// 定义一个基础类，稍后继承 Phaser.Scene
class BaseScene {
  add: any;
  load: any;
  anims: any;
  tweens: any;
  textures: any;
  constructor(config: any) {}
}

// 动态导入 Phaser 后再设置真正的父类
let Scene = BaseScene;
if (typeof window !== 'undefined') {
  Scene = require('phaser').Scene;
}

export class MainScene extends Scene {
  private background: any = null;
  private character: any = null;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // 加载背景
    this.load.image('background', '/bg.png');
    
    // 只加载第一个角色
    this.load.spritesheet('character1', '/Characters/1.png', {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet('character2', '/Characters/2.png', {
        frameWidth: 32,
        frameHeight: 48
      });
    this.load.spritesheet('character3', '/Characters/3.png', {
        frameWidth: 32,
        frameHeight: 48
      });
    this.load.spritesheet('character4', '/Characters/4.png', {
        frameWidth: 32,
        frameHeight: 48
      });
    this.load.spritesheet('character5', '/Characters/5.png', {
        frameWidth: 32,
        frameHeight: 48
      });
    this.load.spritesheet('character6', '/Characters/6.png', {
        frameWidth: 32,
        frameHeight: 48
      });
  }

  create() {
    // 设置背景
    this.background = this.add.image(482/2, 480/2, 'background');
    if (this.background) {
      this.background.setDisplaySize(482, 480);
    }

    // 创建走路动画
    this.anims.create({
      key: 'walk_left',
      frames: this.anims.generateFrameNumbers('character1', { start: 8, end: 11 }),
      frameRate: 8,
      repeat: -1
    });

    // 创建向上走的动画
    this.anims.create({
      key: 'walk_up',
      frames: this.anims.generateFrameNumbers('character1', { start: 12, end: 15 }),
      frameRate: 8,
      repeat: -1
    });

    // 创建站立动画
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('character1', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });

    // 从右下角入口创建角色
    this.character = this.add.sprite(350, 450, 'character1');
    this.character.setOrigin(0.5, 1);
    
    // 先向上移动
    this.character.play('walk_up');
    this.tweens.add({
      targets: this.character,
      y: 200,  // 先往上走到y=200的位置
      duration: 1500,
      ease: 'Linear',
      onComplete: () => {
        if (this.character) {
          // 向上走完后，转向并向左走
          this.character.setFlipX(true);
          this.character.play('walk_left');
          this.tweens.add({
            targets: this.character,
            x: 120,
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
              if (this.character) {
                this.character.play('idle');
              }
            }
          });
        }
      }
    });
  }
} 