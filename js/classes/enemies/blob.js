class Blob extends Enemy {
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

    super(x, y, "blob", 22, spanAnim);
    this.shadow.setScale(0.7);
    this.setSize(25, 0);
    this.body.setCircle(13);
    this.health = 10;
    this.healthMax = 10;
    this.points = getRandomInt(20, 120);
    this.attackType = "melee";

    this.moveSpeed = 90;
    if (GLOBALS.currentDay === 0) {
      return;
    }
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

  shrink() {
    this.body.setCircle(1);
    this.expandEvent = scene.time.addEvent({
      delay: 1000,
      callback: this.grow,
      callbackScope: this,
    });
  }

  grow() {
    try {
      this.body.setCircle(13);
    } catch (error) {}
  }
}
