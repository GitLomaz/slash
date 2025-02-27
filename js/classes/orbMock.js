class OrbMock extends Projectile {
  // static counter = 0;

  constructor(x, y) {
    super(x, y);
    this.sprite = scene.add.sprite(0, 0, "orb");
    this.sprite.anims.play("orb", true);
    this.add(this.sprite);
    this.damage = 7;
    this.spell = "orb";
    this.setScale(0.2);
    let that = this;
    this.setScrollFactor(0);
    this.setDepth(500);
    scene.tweens.add({
      targets: this,
      scale: 0.8,
      duration: 500,
      ease: "Linear",
      onComplete: function () {
        scene.tweens.add({
          targets: this,
          scale: 0.8,
          duration: 900,
          ease: "Linear",
          onComplete: function () {
            scene.tweens.add({
              targets: this,
              alpha: 0,
              duration: 200,
              ease: "Linear",
              onComplete: function () {
                that.destroy();
              },
            });
          },
        });
      },
    });
  }
}
