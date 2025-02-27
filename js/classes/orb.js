class Orb extends Projectile {
  // static counter = 0;

  constructor(x, y) {
    super(x, y);
    this.sprite = scene.add.sprite(0, 0, "orb");
    this.sprite.anims.play("orb", true);
    this.setSize(24, 24);
    this.body.setCircle(12);
    this.body.setImmovable(true);
    this.add(this.sprite);
    this.damage = 7;
    this.spell = "orb";
    this.setScale(0.2);
    let that = this;
    scene.tweens.add({
      targets: this,
      scale: 1.5,
      duration: 500,
      ease: "Linear",
      onComplete: function () {
        scene.tweens.add({
          targets: that,
          scale: 1.5,
          duration: 6000,
          ease: "Linear",
          onComplete: function () {
            scene.tweens.add({
              targets: that,
              alpha: 0.1,
              duration: 1000,
              yoyo: true,
              repeat: 1,
              ease: "Linear",
              onComplete: function () {
                scene.tweens.add({
                  targets: that,
                  scale: 0,
                  duration: 500,
                  ease: "Linear",
                  onComplete: function () {
                    that.destroy();
                  },
                });
              },
            });
          },
        });
      },
    });
  }
}
