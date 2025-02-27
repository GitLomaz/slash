let titleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function titleScene() {
    Phaser.Scene.call(this, {
      key: "titleScene",
    });
  },

  preload: function () {
    preloader(this);
    scene = this;
    this.name = "title";
    if (!mc) {
      mc = new musicController();
      mc.loadSounds();
    }
    if (!sc) {
      sc = new soundController();
      sc.loadSounds();
    }
  },

  create: function () {
    this.bg = this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      "titleBG"
    );
    this.bg.setScale(2);
    this.bgScrollX = getRandomInt(-15, 15) / 10;
    this.bgScrollY = getRandomInt(-15, 15) / 10;
    new MenuPanel();
    let logo = this.add.image(GAME_WIDTH / 2, 200, "logo");
    logo.setOrigin(0.5);

    this.anims.create({
      key: "slash",
      frames: this.anims.generateFrameNumbers("slash"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "roundSlash",
      frames: this.anims.generateFrameNumbers("roundSlash"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "jab",
      frames: this.anims.generateFrameNumbers("jab"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "mageFireball",
      frames: this.anims.generateFrameNumbers("mageFireball"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "orb",
      frames: this.anims.generateFrameNumbers("orb"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "fireball",
      frames: this.anims.generateFrameNumbers("fireball"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "sporeBullet",
      frames: this.anims.generateFrameNumbers("sporeBullet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "pointDrop",
      frames: this.anims.generateFrameNumbers("pointDrop"),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "healthDrop",
      frames: this.anims.generateFrameNumbers("healthDrop"),
      frameRate: 10,
      repeat: -1,
    });
    new MuteButton();
    new DiscordButton();
    mc.addSounds();
    sc.addSounds();
    mc.play("title.mp3");
  },

  update: function () {
    this.bg.tilePositionY += this.bgScrollY;
    this.bg.tilePositionX += this.bgScrollX;
  },
});
