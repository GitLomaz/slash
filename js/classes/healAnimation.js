class HealAnimation extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    this.setScrollFactor(0);
  }

  play(location = { x: 200, y: 200 }, tints = [0x7cfc00, 0x7fff00, 0x00ff00]) {
    let x = 0;
    let intervalID = setInterval(function () {
      scene.player.gainHealth(5 / 200);
      let height = Phaser.Math.Between(-20, 20);
      let fadeHeight = Phaser.Math.Between(-30, 10);
      let image = "pixel3";
      if (Phaser.Math.Between(0, 8) == 8) {
        image = "plus";
      }
      let at = scene.add.sprite(location.x + height, location.y + 20, image);
      at.tint = tints[Phaser.Math.Between(0, 2)];
      at.upTween = scene.tweens.add({
        targets: at,
        y: location.y - 45 - fadeHeight,
        alpha: 0.2,
        duration: 500,
        ease: "Cubic.easeIn",
        onComplete: function () {
          this.targets[0].destroy();
        },
      });
      if (++x === 200) {
        clearInterval(intervalID);
      }
    }, 5);
  }
}
