class Bull extends Enemy {
  constructor(x, y) {
    if (!x || !y) {
      let spawnTile =
        scene.map.validSpawnTiles[
          getRandomInt(0, scene.map.validSpawnTiles.length)
        ];
      x = spawnTile.x;
      y = spawnTile.y;
    }

    super(x, y, "bull", 20);
    this.shadow.setScale(0.8);
    this.setSize(25, 0);
    this.body.setCircle(13);
    this.health = 10;
    this.healthMax = 10;
    this.points = getRandomInt(20, 120);
    this.attackType = "charge";
    this.charging = 0;
    this.chargeSpeed = 450;
    this.moveSpeed = 90;
    if (GLOBALS.currentDay === 0) {
      return;
    }
    switch (days[GLOBALS.currentDay - 1].weather) {
      case 0:
        this.chargeSpeed = this.chargeSpeed * 1.25;
        this.moveSpeed = this.moveSpeed * 1.25;
        break;
      case 2:
        this.chargeSpeed = this.chargeSpeed * 0.75;
        this.moveSpeed = this.moveSpeed * 0.75;
        break;
      case 3:
        this.chargeSpeed = this.chargeSpeed * 0.5;
        this.moveSpeed = this.moveSpeed * 0.5;
        break;
      default:
        break;
    }
  }

  takeDamage(damage, force) {
    this.charging = 0;
    super.takeDamage(damage, force);
  }

  tick() {
    super.tick();
    if (this.knockback === 0) {
      let playerDist = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        scene.player.x,
        scene.player.y
      );
      if (playerDist < 400 && this.charging > 150) {
        let a = Phaser.Math.Angle.Between(
          this.x,
          this.y,
          scene.player.x,
          scene.player.y
        );
        let angleX = Math.cos(a);
        let angleY = Math.sin(a);
        this.body.setVelocityX(angleX * this.chargeSpeed);
        this.body.setVelocityY(angleY * this.chargeSpeed);
        this.charging = -100;
      } else if (playerDist < 400 && this.charging >= 0) {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.charging++;
      } else if (this.charging > 0) {
        let waypoint = needToMoveTo(this);
        if (waypoint) {
          waypoint = getWaypoint(waypoint);
          scene.physics.moveTo(this, waypoint.x, waypoint.y, this.moveSpeed);
        } else {
          scene.physics.moveToObject(this, scene.player, this.moveSpeed);
        }
      }

      if (playerDist < 500 || this.charging <= 0) {
        this.charging++;
      }
      this.ticks++;
      if (this.ticks % 10 === 0) {
        this.sprite.setFrame((this.ticks % 30) / 10);
      }
    } else {
      this.knockback--;
    }
  }
}
