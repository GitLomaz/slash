class OrbAnimation extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    // this.setScrollFactor(0)
    this.width = 200;
    this.height = 200;
  }

  play(location = { x: 200, y: 200 }, tints = [0xf597fc, 0xd803e8, 0xa600b2]) {
    let x = 0;
    let that = this;
    let intervalID = setInterval(function () {
      let height = Phaser.Math.Between(-20, 20);
      let fadeHeight = Phaser.Math.Between(-30, 10);
      let at = scene.add.sprite(location.x + height, location.y + 20, "pixel3");
      at.tint = tints[Phaser.Math.Between(0, 2)];
      at.upTween = scene.tweens.add({
        targets: at,
        y: location.y - 45 - fadeHeight,
        alpha: 0.2,
        duration: 200,
        ease: "Cubic.easeIn",
        onComplete: function () {
          this.targets[0].destroy();
        },
      });
      x++;
      if (x === 25) {
        let orb = new Orb(80, 0);
        that.add(orb);
      } else if (x === 50) {
        let orb = new Orb(-80, 0);
        that.add(orb);
      } else if (x === 75) {
        let orb = new Orb(0, 80);
        that.add(orb);
      } else if (x === 100) {
        clearInterval(intervalID);
        let orb = new Orb(0, -80);
        that.add(orb);
      }
    }, 5);
  }
}
