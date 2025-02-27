class SkillOption extends Phaser.GameObjects.Container {
  constructor(x, y, animationType, title, index, selected = false) {
    super(scene, x, y);
    this.width = 200;
    this.height = 200;
    let that = this;

    this.BG = scene.add.sprite(0, 0, "charOption");
    if (!selected) {
      this.BG.setFrame(1);
    }
    this.setInteractive({ useHandCursor: true });
    this.add(this.BG);

    this.player = scene.add.sprite(0, 0, "player");
    this.player.setFrame(4);
    this.add(this.player);

    this.title = scene.add.text(-100, 100, title, {
      fontFamily: "font1",
      fontSize: "18px",
      color: "#333333",
    });
    this.title.setScale(2);
    this.add(this.title);

    switch (animationType) {
      case "fireball":
        this.animation = new FireballAnimationMock();
        break;
      case "heal":
        this.animation = new HealAnimationMock();
        break;
      case "orb":
        this.animation = new OrbAnimationMock();
        break;
    }

    this.on("pointerdown", function () {
      this.animation.play();

      GLOBALS.skillType = index;
      _.each(scene.skillOpts, function (w) {
        w.BG.setFrame(1);
      });
      that.BG.setFrame(0);
    });

    this.setScrollFactor(0);
  }
}
