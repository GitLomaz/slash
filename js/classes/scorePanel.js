class ScorePanel extends Popup {
  // static counter = 0;

  constructor(submission = false) {
    super(330, 125, 620, 520);
    this.add(
      scene.add.text(220, 40, "High Scores", {
        fontFamily: "font1",
        fontSize: "32px",
        color: "#333333",
      })
    );

    this.loadingText = scene.add.text(250, 230, "Loading...", {
      fontFamily: "font1",
      fontSize: "32px",
      color: "#333333",
    });
    this.add(this.loadingText);
    let that = this;
    if (submission) {
      $.ajax({
        type: "POST",
        url: "https://us-dev.nightscapes.io/arena/score.php",
        data: { data: submission },
        dataType: "json",
        success: function (res) {
          that.loadingText.destroy();
          _.each(res.scores, function (score, i) {
            that.add(
              new ScoreItem(25, 90 + i * 30, i + 1, score.name, score.score)
            );
          });
          if (res.position) {
            that.add(
              new ScoreItem(25, 90 + 10 * 30, res.position, res.name, res.score)
            );
          }
        },
      });
    } else {
      $.ajax({
        url: "https://us-dev.nightscapes.io/arena/score.php",
        type: "GET",
        dataType: "json",
        success: function (res) {
          that.loadingText.destroy();
          _.each(res.scores, function (score, i) {
            let item = new ScoreItem(
              25,
              90 + i * 30,
              i + 1,
              score.name,
              score.score
            );
            that.add(item);
          });
        },
      });
    }

    if (scene.name === "title") {
      this.add(
        new Button(240, 440, 150, 40, "Back", function () {
          that.destroy();
        })
      );
    } else {
      this.add(
        new Button(240, 440, 150, 40, "Main Menu", function () {
          $("#user").hide();
          mc.stop();
          scene.scene.start("titleScene");
        })
      );
    }

    this.depth = 240;
  }
}
