class MiniMap extends Phaser.GameObjects.Container {
  // static counter = 0;

  constructor(x, y) {
    super(scene, x, y);
    this.border = new Popup(x - 8, y - 8, 168 * 1.5 - 11, 106 * 1.5 - 14);
    this.camera = scene.cameras
      .add(x, y, 160 * 1.5 - 15, 106 * 1.5 - 30)
      .setZoom(0.05 * 1.5)
      .setName("mini");
    this.camera.setBackgroundColor(0x002244);
    this.camera.scrollX = 1470;
    this.camera.scrollY = 960;
    this.camera.ignore(this.border);
    this.camera.ignore(scene.layer);
    this.camera.ignore(scene.doodads);
    // this.camera.ignore(scene.cloud);
    this.camera.ignore(scene.water);
    this.camera.ignore(scene.player.hud);
    this.camera.ignore(scene.dusk);

    scene.add.existing(this);
  }

  hide() {
    scene.tweens.add({
      targets: [this.camera, this.border],
      alpha: 0,
      duration: 250,
      ease: "Linear",
    });
  }
}
