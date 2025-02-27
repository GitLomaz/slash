class Exp extends Drop {
  // static counter = 0;

  constructor(x, y, value) {
    super(x, y, "exp");
    this.setSize(10, 10);
    this.body.setCircle(5);
    this.value = value;
    scene.tweens.add({
      targets: this,
      alpha: 0.8,
      scale: 0.8,
      yoyo: true,
      loop: -1,
    });
  }

  tick() {
    super.tick();
  }

  collect() {
    scene.player.gainExp(this.value);
    this.destroy();
  }
}
