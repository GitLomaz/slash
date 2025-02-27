class CreditsPanel extends Popup {
  // static counter = 0;

  constructor() {
    super(430, 250, 420, 400);
    this.add(
      scene.add.text(160, 40, "Credits", {
        fontFamily: "font1",
        fontSize: "32px",
        color: "#333333",
      })
    );

    this.loadingText = scene.add.text(
      30,
      130,
      "Development ................................ Ian Lomas\r\nSFX ................................................. Miguel Abuel\r\nMusic ....................... Finn Talisker Music",
      {
        fontFamily: "font1",
        fontSize: "22px",
        color: "#333333",
      }
    );
    this.add(this.loadingText);
    let that = this;
    this.add(
      new Button(130, 340, 150, 40, "Back", function () {
        that.destroy();
      })
    );
    this.add(
      scene.add.text(368, 370, "V 1.2", {
        fontFamily: "font1",
        fontSize: "20px",
        color: "#333333",
      })
    );
    this.depth = 240;
  }
}
