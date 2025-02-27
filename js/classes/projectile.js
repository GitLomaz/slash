class Projectile extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.projectiles.add(this);
    this.type = "projectile";
  }
}
