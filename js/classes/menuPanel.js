class MenuPanel extends Popup {
  // static counter = 0;

  constructor() {
    super(515, 350, 250, 300);
    this.add(
      scene.add.text(40, 20, "Main Menu", {
        fontFamily: "font1",
        fontSize: "32px",
        color: "#333333",
      })
    );
    let start = new Button(50, 75, 150, 40, "Start", function () {
      scene.scene.start("gameScene");
    });
    this.add(start);
    let high = new Button(50, 125, 150, 40, "High Scores", function () {
      new ScorePanel();
    });
    this.add(high);
    let how = new Button(50, 175, 150, 40, "Instructions", function () {
      new HelpPanel();
    });
    this.add(how);
    let credits = new Button(50, 225, 150, 40, "Credits", function () {
      new CreditsPanel();
    });
    this.add(credits);
  }
}
