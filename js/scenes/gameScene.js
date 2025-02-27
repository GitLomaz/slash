let gameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function gameScene() {
    Phaser.Scene.call(this, {
      key: "gameScene",
    });
  },

  preload: function () {
    scene = this;
    this.name = "game";
  },

  create: function () {
    sc.addSounds();
    mc.play("combat.mp3");
    modifiedDays = JSON.parse(JSON.stringify(days));
    this.day = GLOBALS.currentDay;
    this.map = this.make.tilemap({ key: "map" });
    this.map.validSpawnTiles = [];
    _.each(this.map.layers[0].data, function (row) {
      _.each(row, function (tile) {
        if (tile.index === 383) {
          scene.map.validSpawnTiles.push({ x: tile.pixelX, y: tile.pixelY });
        }
      });
    });

    this.water = this.add
      .tileSprite(
        0,
        0,
        this.map.widthInPixels,
        this.map.heightInPixels,
        "waterSprite"
      )
      .setScale(2);
    this.grass = this.map.addTilesetImage("grassBig", "grassBig", 32, 32, 1, 2);
    this.castle = this.map.addTilesetImage("castle", "castle", 32, 32, 1, 2);
    this.layer = this.map.createLayer("layer", [this.castle, this.grass], 0, 0);
    this.map.setCollisionByExclusion([
      281, 282, 283, 284, 285, 286, 287, 313, 314, 319, 345, 346, 347, 348, 349,
      350, 351, 352, 383, 408, 409, 416,
    ]);
    this.doodads = this.map.createLayer(
      "doodads",
      [this.castle, this.grass],
      0,
      0
    );

    this.enemies = this.physics.add.group();
    this.enemyProjectiles = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.drops = this.physics.add.group({
      dragX: 500,
      dragY: 500,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      esc: Phaser.Input.Keyboard.KeyCodes.ESC,
    });
    this.mouse = this.input.activePointer;

    this.player = new Player();

    scene.physics.add.collider(
      this.player,
      this.enemyProjectiles,
      function (s1, s2) {
        if (s1.type === "player" || s2.type === "player") {
          let player = s1.type === "player" ? s1 : s2;
          let projectile = s1.type === "projectile" ? s1 : s2;
          player.takeDamage(projectile.damage, projectile);
        }
      }
    );

    scene.physics.add.collider(
      this.enemies,
      this.projectiles,
      function (s1, s2) {
        let enemy = s1.type === "enemy" ? s1 : s2;
        let projectile = s1.type === "projectile" ? s1 : s2;
        if (projectile.spell === "fireball") {
          let a = Phaser.Math.Angle.Between(
            projectile.x,
            projectile.y,
            enemy.x,
            enemy.y
          );
          let x = Math.cos(a);
          let y = Math.sin(a);
          enemy.takeDamage(projectile.damage, { x: x, y: y });
          let interaction = false;
          let counter = 0;
          do {
            counter++;
            interaction = false;
            _.each(scene.enemies.children.entries, function (e) {
              if (e) {
                let dist = Phaser.Math.Distance.Between(
                  projectile.x,
                  projectile.y,
                  e.x,
                  e.y
                );
                if (dist < 100) {
                  let a = Phaser.Math.Angle.Between(
                    projectile.x,
                    projectile.y,
                    e.x,
                    e.y
                  );
                  let x = Math.cos(a);
                  let y = Math.sin(a);
                  e.takeDamage(projectile.damage / 2, { x: x, y: y });
                  interaction = true;
                }
              }
            });
          } while (interaction && counter < 5);
          projectile.destroy();
        } else {
          let a = Phaser.Math.Angle.Between(
            scene.player.x,
            scene.player.y,
            enemy.x,
            enemy.y
          );
          let x = Math.cos(a);
          let y = Math.sin(a);
          enemy.takeDamage(projectile.damage, { x: x, y: y });
        }
      }
    );

    this.physics.add.collider(this.player, this.enemies, function (s1, s2) {
      if (s1.type === "player" || s2.type === "player") {
        let player = s1.type === "player" ? s1 : s2;
        let enemy = s1.type === "enemy" ? s1 : s2;
        player.takeDamage(2, enemy);
      }
    });

    scene.physics.add.collider(this.drops, this.layer);
    scene.physics.add.collider(this.player, this.layer);
    scene.physics.add.collider(this.enemies, this.layer, function (s1, s2) {
      if (s1.attackType === "charge") {
        s1.body.setVelocityX(0);
        s1.body.setVelocityY(0);
        s1.charging = 0;
      }
    });

    this.dusk = scene.add.rectangle(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x440000
    );
    this.dusk.setOrigin(0);
    this.dusk.setScrollFactor(0);
    this.dusk.setAlpha(0);
    this.dusk.depth = 180;

    this.counter = 0;
    this.bonus = 10000;

    this.bg = this.add.sprite(0, 0, "bg").setOrigin(0).setDepth(-10);
    this.cameras.main.ignore(this.bg);
    this.cameras.mini = new MiniMap(8, 583);

    try {
      this.weather = new Weather(days[this.day - 1].weather);
    } catch (error) {
      this.weather = new Weather(0);
    }
    if (this.day === 0) {
      console.log("day!");
      scene.player.hud.showNextDayPanel();
      scene.player.hud.hideRemainingPanel();
      scene.player.hud.hideDayInfo();
      scene.player.hud.hideBars();
      scene.cameras.mini.hide();
    }
  },

  update: function () {
    if (this.day === 0) {
      return;
    }
    this.weather.tick();

    if (this.counter % 20 === 0) {
      this.water.setFrame((this.counter % 80) / 20);
    }
    if (this.counter % 200 === 0) {
      _.each(scene.projectiles.children.entries, function (e) {
        if (
          e.x < -300 ||
          e.y < -300 ||
          e.x > scene.map.widthInPixels ||
          e.y > scene.map.heightInPixels
        ) {
          scene.tweens.add({
            targets: e,
            alpha: 0,
            duration: 2,
            ease: "Linear",
            onComplete: function () {
              e.destroy();
            },
          });
        }
      });
      _.each(scene.enemyProjectiles.children.entries, function (e) {
        if (
          e.x < -300 ||
          e.y < -300 ||
          e.x > scene.map.widthInPixels ||
          e.y > scene.map.heightInPixels
        ) {
          scene.tweens.add({
            targets: e,
            alpha: 0,
            duration: 2,
            ease: "Linear",
            onComplete: function () {
              e.destroy();
            },
          });
        }
      });
    }
    this.counter++;
    let enemies = scene.enemies.countActive();
    let drops = scene.drops.countActive();
    this.player.tick();
    if (enemies === 0) {
      this.counter = this.counter + 10;
    }

    _.each(modifiedDays[this.day - 1].spawns, function (spawn) {
      if (spawn.time < scene.counter && !spawn.spawned) {
        if (spawn.sundown) {
          if (scene.player.hud.remainingPanel.alpha === 0 && enemies > 0) {
            scene.player.hud.showRemainingPanel();
          }
          let string =
            enemies === 1 ? "1 Enemy Remains" : enemies + " Enemies Remain";
          scene.player.hud.remainingEnemies.setText(string);
          let alpha = Math.abs(spawn.time - scene.counter) * 2;
          if (alpha > 4000) {
            alpha = 4000;
          }
          scene.dusk.alpha = alpha / 10000;
          if (enemies === 0 && drops === 0) {
            scene.player.hud.showDayEndPanel();
          } else {
            scene.bonus -= 3;
            if (scene.bonus < 0) {
              scene.bonus = 0;
            }
          }
        } else {
          spawn.spawned = true;
          for (const [key, value] of Object.entries(spawn.enemies)) {
            for (let i = 0; i < value; i++) {
              if (key === "blob") {
                new Blob();
              } else if (key === "bigBlob") {
                new BigBlob();
              } else if (key === "mage") {
                new Mage();
              } else if (key === "bull") {
                new Bull();
              } else if (key === "spore") {
                new Spore();
              } else if (key === "mimic") {
                new Mimic();
              } else if (key === "iceTotem") {
                new IceTotem();
              }
            }
          }
        }
      }
    });

    scene.player.tick();
    _.each(scene.enemies.children.entries, function (e) {
      e.tick();
    });

    _.each(scene.drops.children.entries, function (e) {
      try {
        e.tick();
      } catch (error) {}
    });
  },
});
