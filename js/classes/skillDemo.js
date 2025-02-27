class SkillDemo extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    this.width = 200;
    this.height = 200;
    this.animIndex = 0;
    this.anims = ["fireball", "heal", "orb"];
    scene.projectiles = scene.physics.add.group();
    this.BG = scene.add.sprite(0, 0, "charOption");
    this.add(this.BG);
    this.player = scene.add.sprite(0, 0, "player");
    this.player.setFrame(4);
    this.add(this.player);
    let that = this;
    scene.demoSkillInterval = setInterval(function () {
      switch (that.anims[that.animIndex % 3]) {
        case "fireball":
          that.animation = new FireballAnimationMock();
          break;
        case "heal":
          that.animation = new HealAnimationMock();
          break;
        case "orb":
          that.animation = new OrbAnimationMock();
          break;
      }
      that.animation.play({ x: 740, y: 510 });
      that.animIndex++;
    }, 1500);

    this.setScrollFactor(0);
  }
}
