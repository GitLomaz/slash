class HealthDrop extends Drop {
  // static counter = 0;

  constructor(x, y, value) {
    super(x, y, "healthDrop");
    this.setSize(10, 10);
    this.body.setCircle(5);
    this.value = value;
    this.sprite.anims.play("healthDrop");
    this.sprite.setScale(1.5);
  }

  tick() {
    super.tick();
  }

  collect() {
    sc.play("heart.mp3", 0.6, false, true);
    scene.player.gainHealth(this.value);
    this.destroy();
  }
}
