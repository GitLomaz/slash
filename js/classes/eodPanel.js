class EODPanel extends Popup {
  // static counter = 0;

  constructor() {
    super(365, 175, 550, 370);
    this.add(
      scene.add.text(165, 40, "Day " + GLOBALS.currentDay + " Survived!", {
        fontFamily: "font1",
        fontSize: "32px",
        color: "#333333",
      })
    );

    this.label1 = scene.add.text(136, 105, "Time Bonus: ", {
      fontFamily: "font1",
      fontSize: "24px",
      color: "#333333",
    });
    this.label1.alpha = 0;
    this.add(this.label1);

    this.label2 = scene.add.text(90, 145, "Accuracy Bonus: ", {
      fontFamily: "font1",
      fontSize: "24px",
      color: "#333333",
    });
    this.label2.alpha = 0;
    this.add(this.label2);

    let labelYPosition = 185;
    this.extraBonus = 0;
    if (!scene.player.takenDamage) {
      labelYPosition += 40;
      if (scene.player.accuracyBonus === 10000) {
        this.extraBonus = 30000;
        this.bonusLabel = scene.add.text(109, 185, "Perfect Bonus: ", {
          fontFamily: "font1",
          fontSize: "24px",
          color: "#333333",
        });
      } else {
        this.extraBonus = 15000;
        this.bonusLabel = scene.add.text(93, 185, "Flawless Bonus: ", {
          fontFamily: "font1",
          fontSize: "24px",
          color: "#333333",
        });
      }
      this.bonusLabel.alpha = 0;
      this.add(this.bonusLabel);
      this.bonusScore = scene.add.text(
        290,
        185,
        displayNumber(this.extraBonus),
        {
          fontFamily: "font1",
          fontSize: "24px",
          color: "#333333",
        }
      );
      this.bonusScore.alpha = 0;
      this.add(this.bonusScore);
    }

    this.label3 = scene.add.text(190, labelYPosition, "Score: ", {
      fontFamily: "font1",
      fontSize: "28px",
      color: "#333333",
    });
    this.label3.alpha = 0;
    this.add(this.label3);

    scene.player.score = adjustScore(
      scene.bonus + scene.player.accuracyBonus + this.extraBonus,
      scene.player.score
    );
    this.score1 = scene.add.text(290, 105, displayNumber(scene.bonus), {
      fontFamily: "font1",
      fontSize: "24px",
      color: "#333333",
    });
    this.score1.alpha = 0;
    this.add(this.score1);

    this.score2 = scene.add.text(
      290,
      145,
      displayNumber(scene.player.accuracyBonus),
      {
        fontFamily: "font1",
        fontSize: "24px",
        color: "#333333",
      }
    );
    this.score2.alpha = 0;
    this.add(this.score2);

    this.score3 = scene.add.text(
      290,
      labelYPosition,
      displayNumber(scene.player.score),
      {
        fontFamily: "font1",
        fontSize: "28px",
        color: "#333333",
      }
    );
    this.score3.alpha = 0;
    this.add(this.score3);

    this.done = new Button(
      210,
      300,
      120,
      40,
      "Continue",
      scene.player.hud.showNextDayPanel
    );
    this.add(this.done);

    this.done.alpha = 0;
    this.alpha = 0;
  }

  displayStuff() {
    let that = this;
    scene.tweens.add(
      {
        targets: that.label1,
        alpha: 0,
        duration: 500,
        ease: "Linear",
        onComplete: function () {
          scene.tweens.add(
            {
              targets: [that.label1, that.score1],
              alpha: 1,
              duration: 200,
              ease: "Linear",
              onComplete: function () {
                scene.tweens.add(
                  {
                    targets: [],
                    alpha: 0,
                    duration: 300,
                    ease: "Linear",
                    onComplete: function () {
                      scene.tweens.add(
                        {
                          targets: [that.label2, that.score2],
                          alpha: 1,
                          duration: 200,
                          ease: "Linear",
                          onComplete: function () {
                            scene.tweens.add(
                              {
                                targets: [],
                                alpha: 0,
                                duration: 300,
                                ease: "Linear",
                                onComplete: function () {
                                  if (that.extraBonus !== 0) {
                                    scene.tweens.add(
                                      {
                                        targets: [
                                          that.bonusLabel,
                                          that.bonusScore,
                                        ],
                                        alpha: 1,
                                        duration: 200,
                                        ease: "Linear",
                                        onComplete: function () {
                                          scene.tweens.add(
                                            {
                                              targets: [],
                                              alpha: 1,
                                              duration: 300,
                                              ease: "Linear",
                                              onComplete: function () {
                                                scene.tweens.add(
                                                  {
                                                    targets: [
                                                      that.label3,
                                                      that.score3,
                                                    ],
                                                    alpha: 1,
                                                    duration: 200,
                                                    ease: "Linear",
                                                    onComplete: function () {
                                                      scene.tweens.add(
                                                        {
                                                          targets: [],
                                                          alpha: 1,
                                                          duration: 300,
                                                          ease: "Linear",
                                                          onComplete:
                                                            function () {
                                                              that.addScores();
                                                            },
                                                        },
                                                        this
                                                      );
                                                    },
                                                  },
                                                  this
                                                );
                                              },
                                            },
                                            this
                                          );
                                        },
                                      },
                                      this
                                    );
                                  } else {
                                    scene.tweens.add(
                                      {
                                        targets: [that.label3, that.score3],
                                        alpha: 1,
                                        duration: 200,
                                        ease: "Linear",
                                        onComplete: function () {
                                          scene.tweens.add(
                                            {
                                              targets: [],
                                              alpha: 1,
                                              duration: 300,
                                              ease: "Linear",
                                              onComplete: function () {
                                                that.addScores();
                                              },
                                            },
                                            this
                                          );
                                        },
                                      },
                                      this
                                    );
                                  }
                                },
                              },
                              this
                            );
                          },
                        },
                        this
                      );
                    },
                  },
                  this
                );
              },
            },
            this
          );
        },
      },
      this
    );
  }

  addScores() {
    let that = this;
    let interval = setInterval(() => {
      if (
        scene.bonus === 0 &&
        scene.player.accuracyBonus === 0 &&
        that.extraBonus === 0
      ) {
        clearInterval(interval);
        scene.tweens.add({
          targets: [that.done],
          alpha: 1,
          duration: 200,
          ease: "Linear",
        });
        return;
      }
      if (scene.bonus >= 179) {
        scene.bonus -= 179;
        scene.player.score += 179;
      } else if (scene.bonus > 0) {
        scene.player.score += scene.bonus;
        scene.bonus = 0;
      } else if (scene.player.accuracyBonus >= 179) {
        scene.player.accuracyBonus -= 179;
        scene.player.score += 179;
      } else if (scene.player.accuracyBonus > 0) {
        scene.player.score += scene.player.accuracyBonus;
        scene.player.accuracyBonus = 0;
      } else if (that.extraBonus >= 419) {
        that.extraBonus -= 419;
        scene.player.score += 419;
      } else if (that.extraBonus > 0) {
        scene.player.score += that.extraBonus;
        that.extraBonus = 0;
      }
      that.score1.setText(displayNumber(scene.bonus));
      that.score2.setText(displayNumber(scene.player.accuracyBonus));
      that.score3.setText(displayNumber(scene.player.score));
      that.bonusScore.setText(displayNumber(that.extraBonus));
    }, 50);
  }
}
