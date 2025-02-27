class HUD extends Phaser.GameObjects.Container {
  // static counter = 0;

  constructor() {
    super(scene, 0, 0);

    this.healthBack = scene.add.rectangle(0, 0, 280, 30, 0x440000);
    this.healthBack.setOrigin(0);
    this.add(this.healthBack);

    this.attackBack = scene.add.rectangle(0, 30, 230, 16, 0x004400);
    this.attackBack.setOrigin(0);
    this.add(this.attackBack);

    this.skillBack = scene.add.rectangle(0, 46, 230, 16, 0x000044);
    this.skillBack.setOrigin(0);
    this.add(this.skillBack);

    this.health = scene.add.sprite(12, 12, "healthBar");
    this.health.setOrigin(0);
    this.add(this.health);

    this.attack = scene.add.sprite(3, 32, "attackBar");
    this.attack.setOrigin(0);
    this.add(this.attack);

    this.skill = scene.add.sprite(3, 48, "skillBar");
    this.skill.setOrigin(0);
    this.add(this.skill);

    this.skillTint = scene.add.sprite(3, 48, "skillBarTint");
    this.skillTint.setOrigin(0);
    this.skillTint.alpha = 0;
    this.add(this.skillTint);

    this.sprite = scene.add.sprite(0, 0, "hud");
    this.sprite.setOrigin(0);
    this.add(this.sprite);

    this.remainingPanel = new Popup(1030, 670, 250, 50);
    this.remainingPanel.alpha = 0;
    this.add(this.remainingPanel);

    this.remainingEnemies = scene.add.text(1155, 696, "", {
      fontFamily: "font1",
      fontSize: "24px",
      color: "#333333",
    });
    this.remainingEnemies.setOrigin(0.5);
    this.add(this.remainingEnemies);
    this.remainingEnemies.alpha = 0;

    this.info = new DayInfo();
    this.add(this.info);

    this.setScrollFactor(0);
    this.depth = 200;
    scene.add.existing(this);
  }

  updateHealth(value) {
    scene.tweens.add({
      targets: this.health,
      scaleX: value,
      duration: 250,
      ease: "Linear",
    });
  }

  updateAttack(value) {
    this.attack.scaleX = value;
  }

  updateSkill(value) {
    scene.tweens.add({
      targets: [this.skill, this.skillTint],
      scaleX: value,
      duration: 250,
      ease: "Linear",
    });
  }

  showDayEndPanel() {
    if (!this.eodPanel) {
      let that = this;
      console.log("hiding junk?!");
      scene.player.setAccuracyBonus();
      this.eodPanel = new EODPanel();
      this.hideRemainingPanel();
      this.hideDayInfo();
      this.hideBars();
      scene.cameras.mini.hide();
      scene.tweens.add(
        {
          targets: this.eodPanel,
          alpha: 1,
          duration: 250,
          ease: "Linear",
          onComplete: function () {
            that.eodPanel.displayStuff();
          },
        },
        this
      );
    }
  }

  showNextDayPanel() {
    let that = scene.player.hud;
    scene.tweens.add(
      {
        targets: that.eodPanel,
        alpha: 0,
        duration: 250,
        ease: "Linear",
        onComplete: function () {
          that.nextDayPanel = new NextDayPanel();
          scene.panel = that.nextDayPanel;
          scene.tweens.add(
            {
              targets: that.nextDayPanel,
              alpha: 1,
              duration: 250,
              ease: "Linear",
            },
            that
          );
        },
      },
      that
    );
  }

  showRemainingPanel() {
    scene.tweens.add({
      targets: [this.remainingPanel, this.remainingEnemies],
      alpha: 1,
      duration: 250,
      ease: "Linear",
    });
  }

  hideRemainingPanel() {
    scene.tweens.add({
      targets: [this.remainingPanel, this.remainingEnemies],
      alpha: 0,
      duration: 250,
      ease: "Linear",
    });
  }

  hideBars() {
    scene.tweens.add({
      targets: [
        this.sprite,
        this.skill,
        this.attack,
        this.health,
        this.skillBack,
        this.attackBack,
        this.healthBack,
      ],
      alpha: 0,
      duration: 250,
      ease: "Linear",
    });
  }

  hideDayInfo() {
    scene.tweens.add({
      targets: this.info,
      alpha: 0,
      duration: 250,
      ease: "Linear",
    });
  }
}
