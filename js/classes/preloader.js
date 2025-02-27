function preloader(scene) {
  scene.load.image("castle", "images/tilesets/castle_ex.png");
  scene.load.image("grassBig", "images/tilesets/grassBig_ex.png");
  scene.load.image("bg", "images/bgClean.png");
  scene.load.image("titleBG", "images/castleClean.png");
  scene.load.image("rain", "images/rain.png");
  scene.load.image("highscore", "images/highscore.png");
  scene.load.image("logo", "images/logo.png");
  scene.load.image("shadow", "images/shadow.png");
  scene.load.image("discord", "images/discord.png");

  scene.load.image("weather-sun", "images/weather-sun.png");
  scene.load.image("weather-cloud", "images/weather-cloud.png");
  scene.load.image("weather-rain", "images/weather-rain.png");
  scene.load.image("weather-thunder", "images/weather-thunder.png");

  scene.load.audio("titleSong", ["sound/music/title.mp3"]);
  scene.load.audio("combatSong", ["sound/music/combat.mp3"]);
  scene.load.audio("footsteps", ["sound/sounds/footsteps.mp3"]);

  scene.load.tilemapTiledJSON("map", "data/castle.json");

  scene.load.image("pixel3", "images/pixel3.png");
  scene.load.image("plus", "images/plus.png");
  scene.load.image("cloud", "images/clouds/Clouds_03_1.png");
  // scene.load.image("cloud", "images/cloudClean.png");
  scene.load.image("hud", "images/hud.png");
  scene.load.image("attackBar", "images/attackBar.png");
  scene.load.image("healthBar", "images/healthBar.png");
  scene.load.image("skillBar", "images/skillBar.png");
  scene.load.image("skillBarTint", "images/skillBarTint.png");
  scene.load.image("remainingPanel", "images/remainingPanel.png");

  scene.load.spritesheet("charOption", "images/charOption.png", {
    frameWidth: 200,
    frameHeight: 200,
  });

  scene.load.spritesheet("healthDrop", "images/healthDrop.png", {
    frameWidth: 12,
    frameHeight: 12,
  });

  scene.load.spritesheet("basicFrame", "images/basicFrame.png", {
    frameWidth: 12,
    frameHeight: 12,
  });

  scene.load.spritesheet("buttonFrame", "images/buttonFrame.png", {
    frameWidth: 12,
    frameHeight: 12,
  });

  scene.load.spritesheet("pointDrop", "images/pointDrop.png", {
    frameWidth: 12,
    frameHeight: 12,
  });

  scene.load.spritesheet("slash", "images/slash.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  scene.load.spritesheet("roundSlash", "images/roundSlash.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  scene.load.spritesheet("sound", "images/sound.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  scene.load.spritesheet("jab", "images/jab.png", {
    frameWidth: 64,
    frameHeight: 32,
  });

  scene.load.spritesheet("waterSprite", "images/water.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  _.each(
    ["mimic", "blob", "bull", "spore", "mage", "bigBlob", "iceTotem"],
    function (enemy) {
      scene.load.spritesheet(enemy, "images/enemies/" + enemy + ".png", {
        frameWidth: 48,
        frameHeight: 48,
      });
    }
  );

  scene.load.spritesheet("orb", "images/orb.png", {
    frameWidth: 20,
    frameHeight: 20,
  });

  scene.load.spritesheet("sporeBullet", "images/enemies/sporeBullet.png", {
    frameWidth: 20,
    frameHeight: 20,
  });

  scene.load.spritesheet("fireball", "images/fireball.png", {
    frameWidth: 40,
    frameHeight: 40,
  });

  scene.load.spritesheet("mageFireball", "images/enemies/mageFireball.png", {
    frameWidth: 20,
    frameHeight: 20,
  });

  scene.load.spritesheet("player", "images/player.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
}
