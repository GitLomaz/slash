class HelpPanel extends Popup {
  // static counter = 0;

  constructor() {
    super(430, 250, 420, 400);
    this.add(
      scene.add.text(150, 30, "Controls", {
        fontFamily: "font1",
        fontSize: "32px",
        color: "#333333",
      })
    );

    this.add(
      scene.add.text(50, 160, "Left Click:\r\n  Attack", {
        fontFamily: "font1",
        fontSize: "22px",
        color: "#333333",
      })
    );

    this.add(
      scene.add.text(260, 160, "Right Click:\r\n  Use Skill", {
        fontFamily: "font1",
        fontSize: "22px",
        color: "#333333",
      })
    );

    this.add(
      scene.add.text(260, 80, "Arrows/WASD:\r\n  Move", {
        fontFamily: "font1",
        fontSize: "22px",
        color: "#333333",
      })
    );

    this.add(
      scene.add.text(50, 80, "Mouse:\r\n  Aim", {
        fontFamily: "font1",
        fontSize: "22px",
        color: "#333333",
      })
    );

    let test = new AttackDemo(100, 260);
    let test2 = new SkillDemo(310, 260);
    test.setScale(0.5);
    test2.setScale(0.5);
    this.add(test);
    this.add(test2);

    let that = this;
    this.add(
      new Button(132, 340, 150, 40, "Back", function () {
        clearInterval(scene.demoAttackInterval);
        clearInterval(scene.demoSkillInterval);
        that.destroy();
      })
    );
    this.depth = 240;
  }
}
