import Phaser from "phaser";

const preload: Phaser.Types.Scenes.ScenePreloadCallback = function () {
  this.load.setBaseURL("https://labs.phaser.io");

  this.load.image("sky", "assets/skies/space3.png");
  this.load.image("logo", "assets/sprites/phaser3-logo.png");
  this.load.image("red", "assets/particles/red.png");
};

const create: Phaser.Types.Scenes.SceneCreateCallback = function () {
  this.add.image(400, 300, "sky");

  const emitter = this.add.particles(undefined, undefined, "red", {
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: "ADD",
  });

  const logo = this.physics.add.image(400, 100, "logo");

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: { preload, create },
};

const game = new Phaser.Game(config);
