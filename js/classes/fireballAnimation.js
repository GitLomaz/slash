class FireballAnimation extends Phaser.GameObjects.Container {
  constructor(x, y) {
    super(scene, x, y);
    this.setScrollFactor(0);
  }

  play(location = { x: 200, y: 200 }, tints = [0xcd7f32, 0xffbf00, 0xcc5500]) {
    let angle = Phaser.Math.DegToRad(scene.player.playerAngle);
    let x = 0;
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
      if (++x === 50) {
        clearInterval(intervalID);
        new Fireball(scene.player.x, scene.player.y, angle);
      }
    }, 5);
  }
}
