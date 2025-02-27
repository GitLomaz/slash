class CharOption extends Phaser.GameObjects.Container {
  constructor(x, y, animationType, title, index, selected = false) {
    super(scene, x, y);
    this.width = 200;
    this.height = 200;
    let that = this;

    // scene.add.existing(this)

    this.BG = scene.add.sprite(0, 0, "charOption");
    // this.BG.setOrigin(0mo)
    if (!selected) {
      this.BG.setFrame(1);
    }
    this.rng = getRandomInt(1, 1000);
    this.setInteractive({ useHandCursor: true });

    this.add(this.BG);

    this.player = scene.add.sprite(0, 0, "player");
    this.player.setFrame(4);
    this.add(this.player);

    this.title = scene.add.text(-50, 100, title, {
      fontFamily: "font1",
      fontSize: "18px",
      color: "#333333",
    });
    this.title.setScale(2);
    this.add(this.title);

    this.on("pointerdown", function () {
      // console.log(that.rng)
      GLOBALS.attackType = index;
      let anim = scene.add.sprite(0, 0, animationType);
      anim.setScale(3);
      this.add(anim);
      anim.setAngle(-45);
      anim.play(animationType);
      anim.on(
        "animationcomplete",
        function () {
          anim.destroy();
        },
        anim
      );
      _.each(scene.weaponOpts, function (w) {
        w.BG.setFrame(1);
      });
      that.BG.setFrame(0);
    });

    this.setScrollFactor(0);
  }
}
