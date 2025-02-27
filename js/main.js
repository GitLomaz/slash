let config = {
  type: Phaser.AUTO,
  // type: Phaser.CANVAS,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#252945",
  parent: "wrapper",
  scene: [titleScene, gameScene, pauseScene],
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
    },
  },
  pixelArt: true,
  disableContextMenu: true, 
};

let game = new Phaser.Game(config);
