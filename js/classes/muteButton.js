class MuteButton extends Button {
  constructor(x = 12, y = 660) {
    super(x, y, 48, 48, "", function () {});
    this.icon = scene.add.sprite(24, 24, "sound");
    this.add(this.icon);
    if (muteAll) {
      this.icon.setFrame(1);
    } else {
      this.icon.setFrame(0);
    }
    let that = this;
    this.BG.on("pointerdown", function () {
      that.click();
    });
  }

  click() {
    muteAll = !muteAll;
    if (muteAll) {
      this.icon.setFrame(1);
      mc.setVolume(0);
      sc.mute();
    } else {
      this.icon.setFrame(0);
      mc.setVolume(1);
      sc.unmute();
    }
  }
}
