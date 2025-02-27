let pauseScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function pauseScene() {
    Phaser.Scene.call(this, {
      key: "pauseScene",
    });
  },

  preload: function () {},

  create: function () {
    scenep = this;
    let panel = new PausePanel();
    this.add.existing(panel);
    this.dusk = this.add.rectangle(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x444444
    );
    this.dusk.setOrigin(0);
    this.dusk.setScrollFactor(0);
    this.dusk.setAlpha(0.4);
    this.dusk.depth = 180;
    if (scene.cameras.mini) {
      scene.cameras.mini.camera.ignore(this.dusk);
    }

    this.wasd = this.input.keyboard.addKeys({
      esc: Phaser.Input.Keyboard.KeyCodes.ESC,
    });

    this.wasd.esc.on("down", function (key, event) {
      scene.scene.resume();
      scenep.scene.stop();
    });

    let mute = new PauseMuteButton(12, 518, this);
  },

  update: function () {},
});
