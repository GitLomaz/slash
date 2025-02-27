class FireballMock extends Projectile {
  // static counter = 0;

  constructor(x, y) {
    super(x, y);
    this.sprite = scene.add.sprite(0, 0, "fireball");
    this.sprite.anims.play("fireball", true);
    this.add(this.sprite);
    this.setScale(0.5);
    this.setScrollFactor(0);
    this.setDepth(400);

    let a = -0.785398;
    this.sprite.setRotation(a);
    let angleX = Math.cos(a);
    let angleY = Math.sin(a);

    this.body.setVelocityX(angleX * 250);
    this.body.setVelocityY(angleY * 250);

    let that = this;

    scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 120,
      ease: Phaser.Math.Easing.Quadratic.Out,
      onComplete: function () {
        scene.tweens.add({
          targets: this,
          alpha: 0,
          duration: 30,
          ease: Phaser.Math.Easing.Quadratic.Out,
          onComplete: function () {
            that.destroy();
          },
        });
      },
    });
  }
}
