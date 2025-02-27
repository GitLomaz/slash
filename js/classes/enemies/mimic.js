class Mimic extends Enemy {
  constructor(x, y, spanAnim = true) {
    if (!x || !y) {
      let spawnTile =
        scene.map.validSpawnTiles[
          getRandomInt(0, scene.map.validSpawnTiles.length)
        ];
      x = spawnTile.x;
      y = spawnTile.y;
    }

    super(x, y, "mimic", 10, spanAnim);
    this.setSize(25, 0);
    this.body.setCircle(13);
    this.health = 4;
    this.healthMax = 4;
    this.points = getRandomInt(20, 120);
    this.attackType = "melee";
    this.moveSpeed = 150;
    this.bounce = scene.add.tween({
      targets: this.sprite,
      duration: 200,
      y: -20,
      scale: 1.1,
      ease: "Cubic.Out",
      yoyo: true,
      repeat: -1,
    });
    this.bounce2 = scene.add.tween({
      targets: this.shadow,
      duration: 200,
      scale: 0.9,
      alpha: 0.8,
      ease: "Cubic.Out",
      yoyo: true,
      repeat: -1,
    });
  }

  tick() {
    super.tick();
    let playerDist = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      scene.player.x,
      scene.player.y
    );
    if (playerDist > 50) {
    } else {
    }
    if (this.knockback === 0) {
      this.ticks++;
      let waypoint = needToMoveTo(this);
      if (waypoint) {
        waypoint = getWaypoint(waypoint);
        scene.physics.moveTo(this, waypoint.x, waypoint.y, this.moveSpeed);
      } else {
        scene.physics.moveToObject(this, scene.player, this.moveSpeed);
      }
      if (this.ticks % 10 === 0) {
        this.sprite.setFrame((this.ticks % 30) / 10);
      }
    } else {
      this.knockback--;
    }
  }
}
