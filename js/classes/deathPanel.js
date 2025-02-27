class DeathPanel extends Popup {
  // static counter = 0;

  constructor() {
    super(465, 225, 350, 400);
    scene.player.score = adjustScore(0, scene.player.score);
    scene.input.keyboard.clearCaptures();
    this.title = scene.add.text(175, 40, "You Have Died!", {
      fontFamily: "font1",
      fontSize: "32px",
      color: "#333333",
    });
    this.title.setOrigin(0.5);
    this.add(this.title);

    this.score = scene.add.text(
      175,
      80,
      "Score: " + displayNumber(scene.player.score),
      {
        fontFamily: "font1",
        fontSize: "28px",
        color: "#333333",
      }
    );
    this.score.setOrigin(0.5);
    this.add(this.score);

    this.text = scene.add.text(175, 150, "Submit Your Score:", {
      fontFamily: "font1",
      fontSize: "28px",
      color: "#333333",
    });
    this.text.setOrigin(0.5);
    this.add(this.text);

    let that = this;

    let start = new Button(100, 220, 150, 40, "Submit", function () {
      $("#user").hide();
      let data = btoa(
        '{ "name": "' +
          $("#user").val().toUpperCase() +
          '", "score": ' +
          scene.player.score +
          "}"
      );
      animal = $("#user").val().toUpperCase();
      submitScore("Highest Day", scene.day);
      submitScore("Highest Score", scene.player.score);
      new ScorePanel(data);
      that.hidePanel();
    });

    this.add(start);
    let high = new Button(100, 270, 150, 40, "Main Menu", function () {
      $("#user").hide();
      mc.stop();
      scene.scene.start("titleScene");
    });
    this.add(high);
    let credits = new Button(100, 320, 150, 40, "PLAY AGAIN", function () {
      $("#user").hide();
      scene.scene.start("gameScene");
    });
    this.add(credits);

    if (scene.cameras.mini) {
      scene.cameras.mini.camera.ignore(this);
    }

    this.setAlpha(0);
    this.depth = 220;
  }

  showPanel() {
    scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 200,
      ease: "Linear",
    });
    $("#user").val(animal);
    $("#user").fadeIn(200);
  }

  hidePanel() {
    $("#user").hide();
    this.alpha = 0;
  }
}
