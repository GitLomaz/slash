class DiscordButton extends Button {
  constructor(x = 1220, y = 660) {
    super(x, y, 48, 48, "", function () {});
    this.icon = scene.add.image(24, 24, "discord");
    this.icon.setScale(0.01);

    let that = this;
    this.add(this.icon);
    this.BG.on("pointerdown", function () {
      that.click();
    });
  }

  click() {
    let url = "https://discord.gg/k3kn93J7w4";
    var s = window.open(url, "_blank");

    if (s && s.focus) {
      s.focus();
    } else if (!s) {
      window.location.href = url;
    }
  }
}
