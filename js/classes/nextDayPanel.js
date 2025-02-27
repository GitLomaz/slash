class NextDayPanel extends Popup {
  // static counter = 0;

  constructor() {
    super(365, 25, 550, 670);
    this.add(
      scene.add.text(120, 30, "Preparing For Day " + (GLOBALS.currentDay + 1), {
        fontFamily: "font1",
        fontSize: "32px",
        color: "#333333",
      })
    );

    this.add(
      scene.add.text(170, 80, "Today's Forcast:", {
        fontFamily: "font1",
        fontSize: "28px",
        color: "#333333",
      })
    );

    let image = "sun";
    if (!days[GLOBALS.currentDay]) {
      days.push(generateDay(GLOBALS.currentDay));
    }

    switch (days[GLOBALS.currentDay].weather) {
      case 0:
        this.add(
          scene.add.text(95, 180, "Sunny", {
            fontFamily: "font1",
            fontSize: "18px",
            color: "#333333",
          })
        );
        break;
      case 1:
        this.add(
          scene.add.text(85, 180, "Cloudy", {
            fontFamily: "font1",
            fontSize: "24px",
            color: "#333333",
          })
        );
        image = "cloud";
        break;
      case 2:
        this.add(
          scene.add.text(90, 180, "Rainy", {
            fontFamily: "font1",
            fontSize: "24px",
            color: "#333333",
          })
        );
        image = "rain";
        break;
      case 3:
        this.add(
          scene.add.text(80, 180, "Stormy", {
            fontFamily: "font1",
            fontSize: "24px",
            color: "#333333",
          })
        );
        image = "thunder";
        break;
      default:
        break;
    }

    let weather = scene.add.sprite(120, 150, "weather-" + image);
    weather.setScale(2);
    this.add(weather);

    let enemies = getEnemies(GLOBALS.currentDay);
    console.log(enemies);

    let mods = [];

    _.each(enemies, function (e) {
      let mod = getVariant(days[GLOBALS.currentDay].weather, e);
      if (mod) {
        mods.push({ mod: mod, enemy: e });
      }
    });

    let y = 135;

    let that = this;

    _.each(mods, function (mod) {
      let sprite = scene.add.sprite(190, y, mod.enemy);
      let text = scene.add.text(220, y, mod.mod, {
        fontFamily: "font1",
        fontSize: "20px",
        color: "#333333",
      });
      that.add(sprite);
      that.add(text);
      y += 38;
    });

    this.add(
      scene.add.text(85, 410, "Choose Your Secondary Skill", {
        fontFamily: "font1",
        fontSize: "28px",
        color: "#333333",
      })
    );

    this.add(
      scene.add.text(85, 410, "Choose Your Secondary Skill", {
        fontFamily: "font1",
        fontSize: "28px",
        color: "#333333",
      })
    );

    this.skill1 = new SkillOption(
      120,
      500,
      "fireball",
      "   Fireball",
      0,
      GLOBALS.skillType === 0
    );
    this.skill2 = new SkillOption(
      270,
      500,
      "heal",
      "     Heal",
      1,
      GLOBALS.skillType === 1
    );
    this.skill3 = new SkillOption(
      420,
      500,
      "orb",
      "Energy Orbs",
      2,
      GLOBALS.skillType === 2
    );

    scene.skillOpts = [this.skill1, this.skill2, this.skill3];

    this.skill1.setScale(0.5);
    this.skill2.setScale(0.5);
    this.skill3.setScale(0.5);

    this.add(this.skill1);
    this.add(this.skill2);
    this.add(this.skill3);

    this.optLabel = scene.add.text(130, 240, "Choose Your Weapon", {
      fontFamily: "font1",
      fontSize: "28px",
      color: "#333333",
    });

    this.add(this.optLabel);

    this.opt1 = new CharOption(
      120,
      330,
      "slash",
      "Sword",
      0,
      GLOBALS.attackType === 0
    );
    this.opt2 = new CharOption(
      270,
      330,
      "roundSlash",
      " Axe",
      1,
      GLOBALS.attackType === 1
    );
    this.opt3 = new CharOption(
      420,
      330,
      "jab",
      "Spear",
      2,
      GLOBALS.attackType === 2
    );

    scene.weaponOpts = [this.opt1, this.opt2, this.opt3];

    this.opt1.setScale(0.5);
    this.opt2.setScale(0.5);
    this.opt3.setScale(0.5);

    this.add(this.opt1);
    this.add(this.opt2);
    this.add(this.opt3);

    this.done = new Button(210, 590, 120, 40, "Ready", endDay);
    this.add(this.done);

    this.alpha = 0;
  }
}
