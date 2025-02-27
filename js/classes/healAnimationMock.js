class HealAnimationMock extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    this.setScrollFactor(0);
    this.setScale(0.5);
  }

  play(
    location = { x: 486 + 150, y: 525 },
    tints = [0x7cfc00, 0x7fff00, 0x00ff00]
  ) {
    let x = 0;
    let intervalID = setInterval(function () {
      let height = Phaser.Math.Between(-10, 10);
      let fadeHeight = Phaser.Math.Between(-15, 5);
      let image = "pixel3";
      if (Phaser.Math.Between(0, 4) == 3) {
        image = "plus";
      }
      let at = scene.add.sprite(location.x + height, location.y + 10, image);
      at.setDepth(400);
      at.setScrollFactor(0);
      at.tint = tints[Phaser.Math.Between(0, 2)];
      at.upTween = scene.tweens.add({
        targets: at,
        y: location.y - 20 - fadeHeight,
        alpha: 0.2,
        duration: 200,
        ease: "Cubic.easeIn",
        onComplete: function () {
          this.targets[0].destroy();
        },
      });
      if (++x === 50) {
        clearInterval(intervalID);
      }
    }, 20);
  }
}
