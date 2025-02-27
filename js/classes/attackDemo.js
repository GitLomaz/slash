class AttackDemo extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    this.width = 200;
    this.height = 200;
    let that = this;
    this.anims = ["slash", "roundSlash", "jab"];
    this.animIndex = 0;

    // scene.add.existing(this)

    this.BG = scene.add.sprite(0, 0, "charOption");
    this.rng = getRandomInt(1, 1000);
    this.add(this.BG);

    this.player = scene.add.sprite(0, 0, "player");
    this.player.setFrame(4);
    this.add(this.player);

    scene.demoAttackInterval = setInterval(function () {
      that.animation = scene.add.sprite(0, 0, that.anims[that.animIndex % 3]);
      that.animation.setScale(3);
      that.add(that.animation);
      that.animation.setAngle(-45);
      that.animation.play(that.anims[that.animIndex % 3]);
      that.animation.on(
        "animationcomplete",
        function () {
          that.animation.destroy();
        },
        that.animation
      );
      that.animIndex++;
    }, 500);

    this.setScrollFactor(0);
  }
}
