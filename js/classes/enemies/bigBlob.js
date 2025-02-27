class BigBlob extends Enemy {
  // static counter = 0;

  constructor(x, y) {
    if (!x || !y) {
      let spawnTile =
        scene.map.validSpawnTiles[
          getRandomInt(0, scene.map.validSpawnTiles.length)
        ];
      x = spawnTile.x;
      y = spawnTile.y;
    }

    super(x, y, "bigBlob", 30);
    this.setSize(25, 5);
    this.body.setCircle(13);
    this.health = 15;
    this.healthMax = 15;
    this.points = getRandomInt(220, 810);
    this.attackType = "melee";
    if (GLOBALS.currentDay === 0) {
      return;
    }
    this.moveSpeed = 90;
    switch (days[GLOBALS.currentDay - 1].weather) {
      case 2:
        this.moveSpeed = this.moveSpeed * 1.15;
        break;
      case 3:
        this.moveSpeed = this.moveSpeed * 1.25;
        break;
      default:
        break;
    }
  }

  tick() {
    super.tick();
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

  die(force) {
    super.die(force);
    force.x = force.x;
    force.y = force.y;
    for (let i = 0; i < 2; i++) {
      let b = new Blob(
        this.x + Phaser.Math.Between(-10, 10),
        this.y + Phaser.Math.Between(-10, 10),
        false
      );
      b.shrink();
      b.applyKnockback(force);
      b.knockback = 30;
    }
  }
}
