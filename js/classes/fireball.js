class Fireball extends Projectile {
  // static counter = 0;

  constructor(x, y, a = 200) {
    super(x, y);
    this.sprite = scene.add.sprite(0, 0, "fireball");
    this.sprite.anims.play("fireball", true);
    this.setSize(48, 48);
    this.body.setCircle(24);
    this.add(this.sprite);
    this.damage = 10;
    this.spell = "fireball";

    this.sprite.setRotation(a);
    let angleX = Math.cos(a);
    let angleY = Math.sin(a);

    this.body.setVelocityX(angleX * 450);
    this.body.setVelocityY(angleY * 450);
  }
}
