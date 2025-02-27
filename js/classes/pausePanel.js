class PausePanel extends Phaser.GameObjects.Container {
  // static counter = 0;

  constructor() {
    let x = 515;
    let y = 400;
    let h = 180;
    let w = 250;
    super(scenep, x, y);
    this.width = w;
    this.height = h;

    this.BG = scenep.add.rectangle(0, 0, w, h, 0xe4a672);
    this.BG.setOrigin(0);
    this.add(this.BG);

    this.N = scenep.add.tileSprite(0, 0, w, 12, "basicFrame");
    this.N.setOrigin(0);
    this.N.setFrame(1);
    this.add(this.N);

    this.E = scenep.add.tileSprite(w, 0, 12, h, "basicFrame");
    this.E.setOrigin(1, 0);
    this.E.setFrame(5);
    this.add(this.E);

    this.S = scenep.add.tileSprite(0, h, w, 12, "basicFrame");
    this.S.setOrigin(0, 1);
    this.S.setFrame(7);
    this.add(this.S);

    this.W = scenep.add.tileSprite(0, 0, 12, h, "basicFrame");
    this.W.setOrigin(0);
    this.W.setFrame(3);
    this.add(this.W);

    this.NW = scenep.add.sprite(0, 0, "basicFrame");
    this.NW.setOrigin(0);
    this.add(this.NW);

    this.NE = scenep.add.sprite(w, 0, "basicFrame");
    this.NE.setOrigin(1, 0);
    this.NE.setFrame(2);
    this.add(this.NE);

    this.SW = scenep.add.sprite(0, h, "basicFrame");
    this.SW.setOrigin(0, 1);
    this.SW.setFrame(6);
    this.add(this.SW);

    this.SE = scenep.add.sprite(w, h, "basicFrame");
    this.SE.setOrigin(1);
    this.SE.setFrame(8);
    this.add(this.SE);

    this.setScrollFactor(0);
    this.depth = 200;
    scenep.add.existing(this);
    this.add(
      scenep.add.text(70, 20, "Paused", {
        fontFamily: "font1",
        fontSize: "32px",
        color: "#333333",
      })
    );
    this.start = new PauseButton(50, 75, 150, 40, "Resume", function () {
      scene.scene.resume();
      scenep.scene.stop();
    });
    this.add(this.start);
    let high = new PauseButton(50, 125, 150, 40, "Main Menu", function () {
      mc.stop();
      GLOBALS.currentDay = 0;
      scene.scene.start("titleScene");
      scenep.scene.stop();
    });
    this.add(high);
  }
}
