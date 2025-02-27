class MageFireball extends EnemyProjectile {
  // static counter = 0;

  constructor(x, y, damage) {
    super(x, y);
    this.sprite = scene.add.sprite(0, 0, "mageFireball");
    this.sprite.anims.play("mageFireball", true);
    this.setSize(20, 20);
    this.body.setCircle(12);
    this.add(this.sprite);
    this.damage = damage;

    let a = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      scene.player.x,
      scene.player.y
    );
    this.sprite.setRotation(a);
    let angleX = Math.cos(a);
    let angleY = Math.sin(a);

    this.body.setVelocityX(angleX * 250);
    this.body.setVelocityY(angleY * 250);
  }
}
