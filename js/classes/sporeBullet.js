class SporeBullet extends EnemyProjectile {
  // static counter = 0;

  constructor(x, y, a, damage) {
    super(x, y);
    this.sprite = scene.add.sprite(0, 0, "sporeBullet");
    this.sprite.anims.play("sporeBullet", true);
    this.setSize(20, 20);
    this.body.setCircle(12);
    this.add(this.sprite);
    this.damage = damage;

    this.sprite.setRotation(a);
    let angleX = Math.cos(a);
    let angleY = Math.sin(a);

    this.body.setVelocityX(angleX * 250);
    this.body.setVelocityY(angleY * 250);
  }
}
