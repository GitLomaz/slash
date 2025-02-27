class OrbAnimationMock extends Phaser.GameObjects.Container {
  constructor() {
    super(scene, 786, 525);
    this.setScrollFactor(0);
    this.setScale(0.5);
    this.width = 100;
    this.height = 100;
  }

  play(location = { x: 786, y: 525 }, tints = [0xf597fc, 0xd803e8, 0xa600b2]) {
    let x = 0;
    let intervalID = setInterval(function () {
      let height = Phaser.Math.Between(-10, 10);
      let fadeHeight = Phaser.Math.Between(-15, 5);
      let at = scene.add.sprite(location.x + height, location.y + 10, "pixel3");
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
      x++;
      if (x === 25) {
        new OrbMock(30 + location.x, 0 + location.y);
        // that.add(orb)
      } else if (x === 50) {
        new OrbMock(-30 + location.x, 0 + location.y);
        // that.add(orb)
      } else if (x === 75) {
        new OrbMock(0 + location.x, 30 + location.y);
        // that.add(orb)
      } else if (x === 100) {
        clearInterval(intervalID);
        new OrbMock(0 + location.x, -30 + location.y);
        // that.add(orb)
      }
    }, 10);
  }
}
