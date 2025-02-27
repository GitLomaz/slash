class Weather {
  // static counter = 0;

  constructor(forcast) {
    this.forcast = forcast;
    // 0 - Sunny
    // 1 - Cloudy
    // 2 - Rain
    // 3 - Thunder

    this.lightning = -1;
    if (forcast !== 0) {
      this.cloud = scene.add.tileSprite(
        0,
        0,
        scene.cameras.main.width / 3,
        scene.cameras.main.height / 3,
        "cloud"
      );
      this.cloud.setOrigin(0);
      this.cloud.setScrollFactor(0);
      this.cloud.setScale(3);
      this.cloud.depth = 170;
      this.cloudOffsetX = 0;
      this.cloudOffsetY = 0;
      scene.cameras.mini.camera.ignore(this.cloud);
    }
    if (forcast === 1) {
      this.cloud.setAlpha(0.4);
    } else if (forcast === 2) {
      this.cloud.setAlpha(0.5);
    } else if (forcast === 3) {
      this.cloud.setAlpha(0.6);
      this.lightning = getRandomInt(180, 300);
    }
  }

  tick() {
    if (this.forcast !== 0) {
      this.cloudOffsetX += 0.1;
      this.cloudOffsetY += 0.05;
      this.cloud.tilePositionX =
        this.cloudOffsetX + scene.cameras.main.scrollX / 3;
      this.cloud.tilePositionY =
        this.cloudOffsetY + scene.cameras.main.scrollY / 3;
    }
    if (this.forcast === 2 || this.forcast === 3) {
      let x = getRandomInt(
        scene.cameras.main.scrollX - 50,
        scene.cameras.main.scrollX + scene.cameras.main.width + 50
      ); // Math.floor(0 * shape.width) + shape.x;
      let y = getRandomInt(
        scene.cameras.main.scrollY - 50,
        scene.cameras.main.scrollY + scene.cameras.main.height + 50
      ); // Math.floor(0 * shape.width) + shape.x;
      // let y = Math.floor(0 * shape.height) + shape.y;
      let fadeHeight = Math.floor(Math.random() * 40) - 30;
      let at = scene.add.sprite(x, y, "rain");
      at.depth = 180;
      scene.cameras.mini.camera.ignore(at);
      at.tint = [0x3944bc, 0x281e5d][Phaser.Math.Between(0, 1)];
      // at.tint = [0x8d93d6, 0x979abd][Phaser.Math.Between(0, 1)];
      at.alpha = 0.05;
      scene.tweens.add({
        targets: at,
        ease: "Linear",
        y: y + 120 - fadeHeight,
        x: x + 60,
        duration: 200,
        onComplete: function () {
          this.targets[0].destroy();
        },
      });
      scene.tweens.add({
        targets: at,
        ease: "Sine.easeOut",
        alpha: 1,
        duration: 100,
        yoyo: true,
      });
    }
    if (this.forcast === 3) {
      this.lightning--;
      if (this.lightning === 0) {
        this.lightningFire();
      }
      for (let i = 0; i < 4; i++) {
        let x = getRandomInt(
          scene.cameras.main.scrollX - 50,
          scene.cameras.main.scrollX + scene.cameras.main.width + 50
        ); // Math.floor(0 * shape.width) + shape.x;
        let y = getRandomInt(
          scene.cameras.main.scrollY - 50,
          scene.cameras.main.scrollY + scene.cameras.main.height + 50
        ); // Math.floor(0 * shape.width) + shape.x;
        // let y = Math.floor(0 * shape.height) + shape.y;
        let fadeHeight = Math.floor(Math.random() * 40) - 30;
        let at = scene.add.sprite(x, y, "rain");
        at.depth = 180;
        scene.cameras.mini.camera.ignore(at);
        at.tint = [0x3944bc, 0x281e5d][Phaser.Math.Between(0, 1)];
        // at.tint = [0x8d93d6, 0x979abd][Phaser.Math.Between(0, 1)];
        at.alpha = 0.05;
        scene.tweens.add({
          targets: at,
          ease: "Linear",
          y: y + 120 - fadeHeight,
          x: x + 60,
          duration: 200,
          onComplete: function () {
            this.targets[0].destroy();
          },
        });
        scene.tweens.add({
          targets: at,
          ease: "Sine.easeOut",
          alpha: 1,
          duration: 100,
          yoyo: true,
        });
      }
    }
  }

  lightningFire() {
    this.cloud.setAlpha(0);
    if (!oneIn(3)) {
      this.lightning = getRandomInt(10, 20);
    } else {
      this.lightning = getRandomInt(400, 700);
    }

    scene.tweens.add({
      targets: this.cloud,
      ease: "Sine.easeOut",
      alpha: 0.6,
      duration: getRandomInt(100, 200),
    });
  }
}
