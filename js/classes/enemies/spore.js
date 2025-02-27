class Spore extends Enemy {
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

    super(x, y, "spore", 20);
    this.setSize(25, 0);
    this.body.setCircle(13);
    this.health = 10;
    this.healthMax = 10;
    this.points = getRandomInt(20, 120);
    this.attackType = "range";
    this.direction = false;
    if (GLOBALS.currentDay === 0) {
      return;
    }
    this.fireRate = days[GLOBALS.currentDay - 1].weather === 0 ? 200 : 100;
  }

  tick() {
    super.tick();
    if (this.knockback === 0) {
      this.ticks++;
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      let playerDist = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        scene.player.x,
        scene.player.y
      );
      if (playerDist > 500) {
        let waypoint = needToMoveTo(this);
        if (waypoint) {
          waypoint = getWaypoint(waypoint);
          scene.physics.moveTo(this, waypoint.x, waypoint.y, 30);
        } else {
          scene.physics.moveToObject(this, scene.player, 30);
        }
      }
      if (this.ticks % 20 === 0) {
        this.sprite.setFrame((this.ticks % 60) / 20);
      }
      if (this.ticks % this.fireRate === 0 && playerDist < 1100) {
        this.fire();
      }
    } else {
      this.knockback--;
    }
  }

  fire() {
    if (this.direction) {
      let angle = Math.PI / 2;
      new SporeBullet(this.x, this.y, 0, 4);
      new SporeBullet(this.x, this.y, angle, 4);
      new SporeBullet(this.x, this.y, angle * 2, 4);
      new SporeBullet(this.x, this.y, angle * 3, 4);
    } else {
      let angle = Math.PI / 2;
      new SporeBullet(this.x, this.y, 0 + Math.PI / 4, 4);
      new SporeBullet(this.x, this.y, angle + Math.PI / 4, 4);
      new SporeBullet(this.x, this.y, angle * 2 + Math.PI / 4, 4);
      new SporeBullet(this.x, this.y, angle * 3 + Math.PI / 4, 4);
    }
    this.direction = !this.direction;
  }
}
