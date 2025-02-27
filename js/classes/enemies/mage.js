class Mage extends Enemy {
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

    super(x, y, "mage", 22);
    this.setSize(25, 0);
    this.body.setCircle(13);
    this.health = 10;
    this.healthMax = 10;
    this.points = getRandomInt(120, 410);
    this.attackType = "range";
    this.damage = 3;
    if (GLOBALS.currentDay === 0) {
      return;
    }
    switch (days[GLOBALS.currentDay - 1].weather) {
      case 3:
        this.damage = this.damage * 1.5;
        break;
      default:
        break;
    }
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
      if (playerDist > 275) {
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
      if (this.ticks % 120 === 0 && playerDist < 1100) {
        new MageFireball(this.x, this.y, this.damage);
      }
    } else {
      this.knockback--;
    }
  }
}
