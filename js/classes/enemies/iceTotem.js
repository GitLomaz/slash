class IceTotem extends Enemy {
  // static counter = 0;

  constructor(x, y, spanAnim = true) {
    if (!x || !y) {
      let spawnTile =
        scene.map.validSpawnTiles[
          getRandomInt(0, scene.map.validSpawnTiles.length)
        ];
      x = spawnTile.x;
      y = spawnTile.y;
    }

    super(x, y, "iceTotem", 20, spanAnim);
    this.shadow.setScale(0.75);
    this.setSize(25, 0);
    this.body.setCircle(13);
    this.health = 20;
    this.healthMax = 20;
    this.points = getRandomInt(20, 120);
    this.attackType = "melee";
  }

  tick() {
    super.tick();
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);
    if (this.knockback === 0) {
      this.ticks++;
      if (this.ticks % 10 === 0) {
        this.sprite.setFrame((this.ticks % 30) / 10);
      }
      let playerDist = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        scene.player.x,
        scene.player.y
      );
      if (this.ticks % 120 === 0 && playerDist < 1300) {
        this.nova();
      }
    } else {
      this.knockback--;
    }
  }

  die(force) {
    this.tween.stop();
    super.die(force);
  }

  nova() {
    this.attack = scene.add.circle(0, 0, 50);
    this.attack.setStrokeStyle(5, 0x1a65ac);
    this.attack.radius = 0;
    this.attack.damage = 2;
    scene.enemyProjectiles.add(this.attack);

    let that = this;
    this.tween = scene.tweens.add({
      targets: [that.attack],
      radius: 75,
      duration: 400,
      ease: "Linear",
      onComplete: function () {
        scene.tweens.add({
          targets: that.attack,
          alpha: 0,
          duration: 75,
          ease: "Linear",
          onComplete: function () {
            that.attack.destroy();
          },
        });
      },
      onUpdate: function () {
        if (that.attack.body) {
          that.attack.body.setCircle(that.attack.radius);
        }
      },
    });
    this.add(this.attack);
  }
}
