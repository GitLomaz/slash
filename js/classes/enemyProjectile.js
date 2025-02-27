class EnemyProjectile extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.enemyProjectiles.add(this);
    this.type = "projectile";
  }
}
