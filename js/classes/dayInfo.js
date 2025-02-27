class DayInfo extends Popup {
  // static counter = 0;

  constructor() {
    super(1066, 0, 214, 80);

    this.t1 = scene.add.text(107, 10, "Day " + GLOBALS.currentDay, {
      fontFamily: "font1",
      fontSize: "32px",
      color: "#333333",
    });
    this.t2 = scene.add.text(
      107,
      45,
      "Score: " + displayNumber(GLOBALS.currentScore),
      {
        fontFamily: "font1",
        fontSize: "24px",
        color: "#333333",
      }
    );

    this.t1.setOrigin(0.5, 0);
    this.t2.setOrigin(0.5, 0);

    this.add(this.t1);
    this.add(this.t2);
  }
}
