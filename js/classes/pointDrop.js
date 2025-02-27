class PointDrop extends Drop {
  // static counter = 0;

  constructor(x, y, value) {
    super(x, y, "pointDrop");
    this.setSize(10, 10);
    this.body.setCircle(5);
    this.value = value;
    this.sprite.anims.play("pointDrop");
  }

  tick() {
    super.tick();
  }

  collect() {
    sc.play("pickup.mp3", 0.6, false, true);
    scene.player.addScore(this.value, true);
    this.destroy();
  }
}
